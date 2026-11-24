import { SEED, DEFAULT_CASE } from './seed.js';

const KEY = 'site';
export const CATEGORIES_DEFAULT = ['Mer & ville', 'Santé & sport', 'Outils'];

export async function loadSite(env) {
  const data = await env.DATA.get(KEY, { type: 'json' });
  if (data) return data;
  const seeded = { ...SEED, updatedAt: new Date().toISOString() };
  await env.DATA.put(KEY, JSON.stringify(seeded));
  return seeded;
}

export async function saveSite(env, site) {
  site.updatedAt = new Date().toISOString();
  await env.DATA.put(KEY, JSON.stringify(site));
  return site;
}

const str = (v, max) => String(v ?? '').trim().slice(0, max);

// Nettoie et valide une liste de projets envoyée par l'admin.
export function sanitizeProjects(input) {
  if (!Array.isArray(input)) throw new Error('Liste invalide.');
  const seen = new Set();
  const out = input.map((p) => {
    const n = str(p.n, 63).toLowerCase();
    if (!/^[a-z0-9][a-z0-9-]*$/.test(n)) throw new Error(`Identifiant invalide : ${n || '(vide)'}`);
    if (seen.has(n)) throw new Error(`Doublon : ${n}`);
    seen.add(n);
    let url = str(p.url, 300) || `https://${n}.abpq.cc`;
    try { const u = new URL(url); if (!/^https?:$/.test(u.protocol)) throw 0; } catch { throw new Error(`URL invalide pour ${n}`); }
    const caseShots = (Array.isArray(p.caseShots) && p.caseShots.length === 3 ? p.caseShots : DEFAULT_CASE).map((s) => ({
      path: '/' + str(s.path, 200).replace(/^\/+/, ''),
      mobile: !!s.mobile,
      y: Math.max(0, Math.min(10000, Number(s.y) || 0)),
    }));
    return {
      n, url,
      t: str(p.t, 80) || n,
      d: str(p.d, 240),
      long: str(p.long, 3000),
      c: str(p.c, 40) || 'Outils',
      tags: (Array.isArray(p.tags) ? p.tags : String(p.tags || '').split(',')).map((x) => str(x, 30)).filter(Boolean).slice(0, 12),
      tint: /^#[0-9a-fA-F]{6}$/.test(p.tint) ? p.tint : '#2B2B2E',
      hidden: !!p.hidden,
      role: p.role === 'highlight' || p.role === 'showcase' ? p.role : null,
      caseShots,
      auto: !!p.auto,
      reviewed: !!p.reviewed,
      addedAt: p.addedAt || null,
      shotsAt: p.shotsAt || null,
    };
  });
  if (out.filter((p) => p.role === 'highlight').length > 1) throw new Error('Un seul highlight possible.');
  if (out.filter((p) => p.role === 'showcase').length > 2) throw new Error('Deux showcases maximum.');
  if (out.some((p) => p.role && p.hidden)) throw new Error('Un projet masqué ne peut pas être highlight ou showcase.');
  return out;
}

export function sanitizeIgnore(input) {
  return (Array.isArray(input) ? input : String(input || '').split(','))
    .map((x) => String(x).trim().toLowerCase())
    .filter((x) => /^[a-z0-9-]+$/.test(x))
    .slice(0, 100);
}
