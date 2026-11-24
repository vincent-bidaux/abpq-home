// Découverte automatique des nouveaux sous-domaines + captures d'écran.
// Nécessite le secret CF_API_TOKEN (lecture DNS de la zone + Browser Rendering).
import { loadSite, saveSite } from './store.js';
import { DEFAULT_CASE } from './seed.js';

const API = 'https://api.cloudflare.com/client/v4';
const TINTS = ['#1E3A8A', '#0E3B5C', '#114B4B', '#5A2A1A', '#3B2A5C', '#1D4D2B', '#4A1E4F', '#5C4A12', '#0D4A3A', '#6B2A3A'];

export const canAutomate = (env) => !!(env.CF_API_TOKEN && env.CF_ACCOUNT_ID && env.ZONE_ID);

async function cf(env, path, init = {}) {
  const res = await fetch(API + path, { ...init, headers: { authorization: `Bearer ${env.CF_API_TOKEN}`, 'content-type': 'application/json', ...(init.headers || {}) } });
  if (!res.ok) throw new Error(`API ${path} : HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
  return res;
}

// ---------- captures ----------
export async function screenshot(env, url, { mobile = false, y = 0 } = {}) {
  const viewport = mobile ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { width: 1280, height: 800 };
  const screenshotOptions = { type: 'jpeg', quality: 72 };
  if (y > 0 && !mobile) Object.assign(screenshotOptions, { clip: { x: 0, y, width: 1280, height: 800 }, captureBeyondViewport: true });
  const res = await cf(env, `/accounts/${env.CF_ACCOUNT_ID}/browser-rendering/screenshot`, {
    method: 'POST',
    body: JSON.stringify({ url, viewport, screenshotOptions, gotoOptions: { waitUntil: 'networkidle0', timeout: 30000 }, waitForTimeout: 1500, bestAttempt: true }),
  });
  return res.arrayBuffer();
}

export async function takeShots(env, p, { withCase = false } = {}) {
  const base = new URL(p.url);
  const main = await screenshot(env, base.toString());
  await env.SHOTS.put(p.n, main);
  if (withCase) {
    const shots = p.caseShots?.length === 3 ? p.caseShots : DEFAULT_CASE;
    for (let i = 0; i < 3; i++) {
      const s = shots[i];
      const img = await screenshot(env, new URL(s.path || '/', base).toString(), s);
      await env.SHOTS.put(`case:${p.n}:${i + 1}`, img);
    }
  }
  p.shotsAt = new Date().toISOString();
  return p;
}

// ---------- détection titre / description / stack ----------
const pick = (html, re) => { const m = html.match(re); return m ? m[1].replace(/\s+/g, ' ').trim() : ''; };
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, '’').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

export function detectStack(html) {
  const rules = [
    [/\/_next\//, 'Next.js'], [/data-astro|astro-island/, 'Astro'], [/__nuxt/, 'Nuxt'], [/__sveltekit/, 'SvelteKit'],
    [/<script type="module" crossorigin src="\/assets\//, 'Vite'], [/rel="manifest"|manifest\.webmanifest/, 'PWA'],
    [/three(\.module)?(\.min)?\.js|THREE\./, 'Three.js'], [/leaflet/i, 'Leaflet'], [/maplibre/i, 'MapLibre'],
    [/supabase/i, 'Supabase'], [/alpinejs|x-data=/, 'Alpine.js'], [/htmx/, 'htmx'], [/data-wf-site/, 'Webflow'],
  ];
  const tags = rules.filter(([re]) => re.test(html)).map(([, t]) => t);
  return tags.length ? tags : ['JavaScript'];
}

export async function inspect(url) {
  const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'abpq-home-discovery' }, cf: { cacheTtl: 0 } });
  if (!res.ok) return null;
  const html = (await res.text()).slice(0, 300000);
  const t = decode(pick(html, /<title[^>]*>([^<]{1,120})<\/title>/i)).split(/\s[|–—-]\s/)[0];
  const d = decode(pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']{1,300})["']/i) || pick(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']{1,300})["']/i));
  return { t, d, tags: detectStack(html) };
}

// ---------- scan ----------
export async function scan(env) {
  if (!canAutomate(env)) return { ok: false, error: 'Jeton API manquant : découverte automatique désactivée.' };
  const site = await loadSite(env);
  const res = await cf(env, `/zones/${env.ZONE_ID}/dns_records?per_page=500`);
  const records = (await res.json()).result || [];
  const known = new Set(site.projects.map((p) => p.n));
  site.projects.forEach((p) => { try { const h = new URL(p.url).hostname; if (h.endsWith('.abpq.cc')) known.add(h.replace('.abpq.cc', '')); } catch {} });
  const ignore = new Set(site.ignore || []);
  const candidates = [...new Set(records
    .filter((r) => ['A', 'AAAA', 'CNAME'].includes(r.type))
    .map((r) => (r.name.match(/^([a-z0-9-]+)\.abpq\.cc$/) || [])[1])
    .filter(Boolean))]
    .filter((n) => !known.has(n) && !ignore.has(n));

  const added = [], skipped = [];
  for (const n of candidates) {
    const url = `https://${n}.abpq.cc`;
    try {
      const info = await inspect(url);
      if (!info) { skipped.push(n); continue; }
      const p = {
        n, url, t: info.t || n, d: info.d, long: '', c: 'Outils', tags: info.tags,
        tint: TINTS[site.projects.length % TINTS.length], hidden: false, role: null,
        caseShots: DEFAULT_CASE, auto: true, addedAt: new Date().toISOString(), shotsAt: null,
      };
      try { await takeShots(env, p); } catch (e) { console.log('capture', n, e.message); }
      site.projects.push(p);
      added.push(n);
    } catch (e) {
      console.log('scan', n, e.message);
      skipped.push(n);
    }
  }
  site.lastScan = { at: new Date().toISOString(), added, skipped };
  await saveSite(env, site);
  return { ok: true, added, skipped };
}
