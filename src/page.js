import { PROJECTS, CATEGORIES } from './projects.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function card(p, i) {
  const num = String(i + 1).padStart(2, '0');
  const url = `https://${p.n}.abpq.cc`;
  return `<a class="card" href="${url}" target="_blank" rel="noopener" data-cat="${esc(p.c)}">
  <div class="cap" style="background:${p.tint}">
    <span class="cap-t" aria-hidden="true">${esc(p.t)}</span>
    <img src="/shots/${p.n}.jpg" alt="Capture de ${esc(p.t)}" loading="${i < 6 ? 'eager' : 'lazy'}" decoding="async" width="1280" height="800" onerror="this.remove()">
  </div>
  <div class="meta">
    <span class="num">${num}</span>
    <div class="txt">
      <span class="name">${esc(p.t)} <span class="arr">↗</span></span>
      <span class="desc">${esc(p.d)}</span>
      <span class="host">${p.n}.abpq.cc</span>
    </div>
  </div>
</a>`;
}

export function renderPage() {
  const cats = ['Tout', ...CATEGORIES];
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ABPQ — apps, outils et petites expériences</title>
<meta name="description" content="Index des projets hébergés sur abpq.cc : apps pour la mer, la ville, le sport et les petits problèmes du quotidien.">
<meta name="theme-color" content="#0B0B0C">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='12' fill='%230B0B0C'/><circle cx='46' cy='46' r='8' fill='%23C6FF3D'/></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
:root{--bg:#0B0B0C;--fg:#F2F2EE;--muted:#A3A39E;--dim:#6E6E6A;--line:#262628;--accent:#C6FF3D}
*{box-sizing:border-box}
html,body{margin:0;background:var(--bg);color:var(--fg);font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
.wrap{max-width:1360px;margin:0 auto;padding:32px clamp(20px,4vw,40px) 80px}
.mono{font-family:'JetBrains Mono',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.08em}
header{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:13px;color:#8A8A86}
header b{color:var(--fg);font-weight:400}
.hero{padding:clamp(48px,8vw,88px) 0 56px;border-bottom:1px solid var(--line)}
h1{margin:0;font-family:Unbounded,sans-serif;font-weight:900;font-size:clamp(88px,17vw,248px);line-height:.86;letter-spacing:-.04em}
h1 span{color:var(--accent)}
.hero-row{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:24px;margin-top:40px}
.lede{margin:0;max-width:560px;font-size:clamp(18px,2vw,22px);line-height:1.4;color:#C9C9C4}
nav{display:flex;gap:8px;flex-wrap:wrap}
nav button{min-height:44px;padding:0 18px;border-radius:999px;font:13px 'JetBrains Mono',monospace;cursor:pointer;border:1px solid #3A3A3C;background:transparent;color:var(--fg);transition:border-color .15s,background .15s,color .15s}
nav button:hover{border-color:var(--accent)}
nav button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--bg)}
nav button:focus-visible,.card:focus-visible{outline:2px solid var(--accent);outline-offset:4px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:48px 28px;padding-top:56px}
.card{display:flex;flex-direction:column;gap:16px}
.card[hidden]{display:none}
.cap{position:relative;aspect-ratio:16/10;border-radius:6px;overflow:hidden;display:flex;align-items:center;justify-content:center;outline:2px solid transparent;outline-offset:0;transition:outline-color .15s}
.cap-t{font-family:Unbounded,sans-serif;font-weight:700;font-size:30px;color:rgba(255,255,255,.9);letter-spacing:-.03em;padding:0 20px;text-align:center;line-height:1}
.cap img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top center;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
.card:hover .cap{outline-color:var(--accent)}
.card:hover .cap img{transform:scale(1.04)}
.meta{display:flex;gap:14px;align-items:baseline}
.num{font:13px 'JetBrains Mono',monospace;color:var(--accent)}
.txt{display:flex;flex-direction:column;gap:8px;min-width:0}
.name{font-family:Unbounded,sans-serif;font-weight:700;font-size:20px;letter-spacing:-.02em}
.arr{display:inline-block;transition:transform .15s}
.card:hover .name{color:var(--accent)}
.card:hover .arr{transform:translate(3px,-3px)}
.desc{font-size:15px;line-height:1.45;color:var(--muted)}
.host{font:12px 'JetBrains Mono',monospace;color:var(--dim)}
footer{margin-top:96px;padding-top:24px;border-top:1px solid var(--line);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:12px;color:var(--dim)}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
</head>
<body>
<div class="wrap">
<header class="mono"><b>abpq.cc</b><span>${PROJECTS.length} projets — La Rochelle — ${new Date().getFullYear()}</span></header>
<section class="hero">
<h1>ABPQ<span>.</span></h1>
<div class="hero-row">
<p class="lede">Apps, outils et petites expériences. Un sous-domaine chacun, tous servis depuis Cloudflare.</p>
<nav aria-label="Filtrer par catégorie">
${cats.map((c, i) => `<button type="button" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join('\n')}
</nav>
</div>
</section>
<main class="grid">
${PROJECTS.map(card).join('\n')}
</main>
<footer class="mono"><span>abpq.cc</span><span>Hébergé sur Cloudflare Workers</span></footer>
</div>
<script>
const btns=document.querySelectorAll('nav button'),cards=document.querySelectorAll('.card');
btns.forEach(b=>b.addEventListener('click',()=>{const f=b.dataset.filter;btns.forEach(x=>x.setAttribute('aria-pressed',x===b));cards.forEach(c=>c.hidden=!(f==='Tout'||c.dataset.cat===f));}));
</script>
</body>
</html>`;
}
