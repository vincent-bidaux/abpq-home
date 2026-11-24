import { renderPublic } from './public.js';
import { renderAdmin } from './admin.js';
import { loadSite, saveSite, sanitizeProjects, sanitizeIgnore } from './store.js';
import { isAuthed, requestCode, verifyCode, clearCookie } from './auth.js';
import { scan, takeShots, canAutomate } from './discover.js';

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers } });

const SEC = { 'x-frame-options': 'DENY', 'referrer-policy': 'no-referrer', 'x-robots-tag': 'noindex, nofollow', 'cache-control': 'no-store' };

async function adminApi(request, env, path) {
  const method = request.method;
  const origin = request.headers.get('origin');
  if (method !== 'GET' && origin && origin !== new URL(request.url).origin) return json({ error: 'Origine refusée.' }, 403);

  if (path === 'code' && method === 'POST') { const r = await requestCode(request, env); return json(r.body, r.status); }
  if (path === 'verify' && method === 'POST') { const r = await verifyCode(request, env); return json(r.body, r.status, r.cookie ? { 'set-cookie': r.cookie } : {}); }
  if (path === 'logout' && method === 'POST') return json({ ok: true }, 200, { 'set-cookie': clearCookie });

  if (!(await isAuthed(request, env))) return json({ error: 'Non connecté.' }, 401);

  if (path === 'site' && method === 'GET') {
    const site = await loadSite(env);
    return json({ ...site, automation: canAutomate(env) });
  }
  if (path === 'site' && method === 'PUT') {
    const body = await request.json();
    const site = await loadSite(env);
    try {
      site.projects = sanitizeProjects(body.projects);
      site.ignore = sanitizeIgnore(body.ignore);
    } catch (e) { return json({ error: e.message }, 400); }
    await saveSite(env, site);
    return json({ ...site, automation: canAutomate(env) });
  }
  if (path === 'scan' && method === 'POST') {
    const r = await scan(env);
    return r.ok ? json(r) : json({ error: r.error }, 400);
  }
  const m = path.match(/^shots\/([a-z0-9-]+)$/);
  if (m && method === 'POST') {
    if (!canAutomate(env)) return json({ error: 'Jeton API manquant : captures automatiques indisponibles.' }, 400);
    const site = await loadSite(env);
    const p = site.projects.find((x) => x.n === m[1]);
    if (!p) return json({ error: 'Projet introuvable.' }, 404);
    try { await takeShots(env, p, { withCase: new URL(request.url).searchParams.has('case') }); }
    catch (e) { return json({ error: 'Capture impossible : ' + e.message }, 502); }
    await saveSite(env, site);
    return json({ ok: true, shotsAt: p.shotsAt });
  }
  return json({ error: 'Not found' }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/' || path === '/index.html') {
      const site = await loadSite(env);
      return new Response(renderPublic(site), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=60' } });
    }

    // Captures : /shots/<n>.jpg et /shots/case/<n>/<1-3>.jpg
    let m = path.match(/^\/shots\/([a-z0-9-]+)\.jpg$/);
    let key = m && m[1];
    if (!key) { m = path.match(/^\/shots\/case\/([a-z0-9-]+)\/([1-3])\.jpg$/); if (m) key = `case:${m[1]}:${m[2]}`; }
    if (key) {
      const img = await env.SHOTS.get(key, 'arrayBuffer');
      if (!img) return new Response('Not found', { status: 404 });
      return new Response(img, { headers: { 'content-type': 'image/jpeg', 'cache-control': 'public, max-age=86400' } });
    }

    if (path === '/admin' || path === '/admin/') {
      const mode = (await isAuthed(request, env)) ? 'app' : 'login';
      return new Response(renderAdmin(mode), { headers: { 'content-type': 'text/html; charset=utf-8', ...SEC } });
    }
    if (path.startsWith('/admin/api/')) return adminApi(request, env, path.slice('/admin/api/'.length));

    return new Response('Not found', { status: 404 });
  },

  // Découverte automatique des nouveaux sous-domaines (toutes les heures).
  async scheduled(event, env, ctx) {
    if (canAutomate(env)) ctx.waitUntil(scan(env).then((r) => console.log('scan', JSON.stringify(r))));
  },
};
