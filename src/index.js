import { renderPage } from './page.js';
import { PROJECTS } from './projects.js';

const NAMES = new Set(PROJECTS.map((p) => p.n));

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(renderPage(), {
        headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300' },
      });
    }

    // Captures stockées dans KV (clé = sous-domaine)
    const m = url.pathname.match(/^\/shots\/([a-z0-9-]+)\.jpg$/);
    if (m && NAMES.has(m[1])) {
      const img = await env.SHOTS.get(m[1], 'arrayBuffer');
      if (!img) return new Response('Not found', { status: 404 });
      return new Response(img, {
        headers: { 'content-type': 'image/jpeg', 'cache-control': 'public, max-age=86400' },
      });
    }

    return new Response('Not found', { status: 404 });
  },
};
