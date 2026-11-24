// Page publique : étude de cas (highlight), 2 showcases, liste filtrable.
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const host = (u) => { try { return new URL(u).hostname; } catch { return u; } };
const v = (p) => (p.shotsAt ? `?v=${Date.parse(p.shotsAt)}` : '');
const img = (p, key, alt, eager) =>
  `<img src="/shots/${key}.jpg${v(p)}" alt="${esc(alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async" onerror="this.remove()">`;
const tags = (p) => (p.tags?.length ? `<ul class="tags" aria-label="Stack technique">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : '');
const paras = (s) => esc(s).split(/\n{2,}/).map((x) => `<p>${x.replace(/\n/g, '<br>')}</p>`).join('');

function caseStudy(p) {
  const smalls = [1, 2, 3].map((i) => {
    const s = p.caseShots?.[i - 1] || {};
    return `<figure class="small${s.mobile ? ' is-mobile' : ''}" style="background:${p.tint}">${img(p, `case/${p.n}/${i}`, `${p.t}, capture ${i + 1}`)}</figure>`;
  }).join('');
  return `<section class="case" aria-labelledby="case-title">
  <div class="sec-h mono"><span class="acc">●</span> Étude de cas</div>
  <div class="case-grid">
    <a class="case-main" href="${esc(p.url)}" target="_blank" rel="noopener" style="background:${p.tint}">
      <span class="ph">${esc(p.t)}</span>${img(p, p.n, `Page d’accueil de ${p.t}`, true)}
    </a>
    <div class="case-txt">
      <h2 id="case-title">${esc(p.t)}</h2>
      <p class="lead">${esc(p.d)}</p>
      <div class="body">${paras(p.long || '')}</div>
      ${tags(p)}
      <a class="cta" href="${esc(p.url)}" target="_blank" rel="noopener">Ouvrir ${esc(host(p.url))} <span aria-hidden="true">↗</span></a>
    </div>
  </div>
  <div class="case-smalls">${smalls}</div>
</section>`;
}

function showcase(p, i) {
  return `<a class="show" href="${esc(p.url)}" target="_blank" rel="noopener">
  <div class="cap" style="background:${p.tint}"><span class="ph">${esc(p.t)}</span>${img(p, p.n, `Capture de ${p.t}`, true)}</div>
  <div class="show-txt">
    <span class="num mono">${String(i + 1).padStart(2, '0')}</span>
    <div><h3>${esc(p.t)} <span class="arr" aria-hidden="true">↗</span></h3><p>${esc(p.d)}</p>${tags(p)}</div>
  </div>
</a>`;
}

function card(p, i) {
  return `<a class="card" href="${esc(p.url)}" target="_blank" rel="noopener" data-cat="${esc(p.c)}">
  <div class="cap" style="background:${p.tint}"><span class="ph">${esc(p.t)}</span>${img(p, p.n, `Capture de ${p.t}`, i < 3)}</div>
  <div class="meta">
    <span class="num mono">${String(i + 1).padStart(2, '0')}</span>
    <div class="txt">
      <span class="name">${esc(p.t)} <span class="arr" aria-hidden="true">↗</span></span>
      <span class="desc">${esc(p.d)}</span>
      ${tags(p)}
    </div>
  </div>
</a>`;
}

export function renderPublic(site) {
  const visible = site.projects.filter((p) => !p.hidden);
  const hl = visible.find((p) => p.role === 'highlight');
  const shows = visible.filter((p) => p.role === 'showcase').slice(0, 2);
  const rest = visible.filter((p) => !p.role);
  const cats = ['Tout', ...[...new Set(rest.map((p) => p.c))].sort((a, b) => a.localeCompare(b))];

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ABPQ — apps et petits outils faits à La Rochelle</title>
<meta name="description" content="Des apps utiles, nées d’un besoin concret : la mer, la ville, le sport, la maison. ${visible.length} projets en ligne.">
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
h1 span,.acc{color:var(--accent)}
.lede{margin:40px 0 0;max-width:620px;font-size:clamp(18px,2vw,22px);line-height:1.4;color:#C9C9C4}
.sec-h{font-size:13px;color:#8A8A86;display:flex;gap:10px;align-items:center;margin:0 0 28px}
section{padding-top:72px}
.cap,.case-main,.small{position:relative;overflow:hidden;border-radius:6px;display:flex;align-items:center;justify-content:center;outline:2px solid transparent;transition:outline-color .15s}
.cap img,.case-main img,.small img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top center;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
.ph{font-family:Unbounded,sans-serif;font-weight:700;font-size:30px;color:rgba(255,255,255,.9);letter-spacing:-.03em;padding:0 20px;text-align:center;line-height:1}
.tags{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
.tags li{font:500 11px 'JetBrains Mono',monospace;color:#CFCFCA;border:1px solid #333336;border-radius:999px;padding:3px 9px}
.arr{display:inline-block;transition:transform .15s}
/* étude de cas */
.case-grid{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);gap:40px;align-items:start}
.case-main{aspect-ratio:16/10}
.case-main:hover{outline-color:var(--accent)}
.case-main:hover img{transform:scale(1.03)}
.case-txt h2{margin:0;font-family:Unbounded,sans-serif;font-weight:900;font-size:clamp(40px,5vw,72px);line-height:.95;letter-spacing:-.035em}
.case-txt .lead{font-size:20px;line-height:1.4;color:var(--fg);margin:20px 0 16px}
.case-txt .body p{font-size:15.5px;line-height:1.6;color:var(--muted);margin:0 0 12px}
.case-txt .tags{margin:20px 0 28px}
.cta{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 20px;border-radius:999px;background:var(--accent);color:var(--bg);font:600 14px 'JetBrains Mono',monospace}
.cta:hover{filter:brightness(1.1)}
.case-smalls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:20px}
.small{aspect-ratio:16/10;margin:0}
.small.is-mobile img{object-fit:contain;padding:14px 0}
/* showcases */
.shows{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px}
.show{display:flex;flex-direction:column;gap:18px}
.show .cap{aspect-ratio:16/10}
.show-txt{display:flex;gap:16px;align-items:baseline}
.show h3{margin:0 0 8px;font-family:Unbounded,sans-serif;font-weight:700;font-size:clamp(24px,2.6vw,34px);letter-spacing:-.03em}
.show p{margin:0 0 14px;font-size:16px;line-height:1.45;color:var(--muted)}
.num{font-size:13px;color:var(--accent)}
.show:hover .cap,.card:hover .cap{outline-color:var(--accent)}
.show:hover .cap img,.card:hover .cap img{transform:scale(1.04)}
.show:hover h3,.card:hover .name{color:var(--accent)}
.show:hover .arr,.card:hover .arr{transform:translate(3px,-3px)}
/* liste */
.list-h{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:8px}
.list-h .sec-h{margin:0}
nav{display:flex;gap:8px;flex-wrap:wrap}
nav button{min-height:44px;padding:0 18px;border-radius:999px;font:13px 'JetBrains Mono',monospace;cursor:pointer;border:1px solid #3A3A3C;background:transparent;color:var(--fg);transition:border-color .15s,background .15s,color .15s}
nav button:hover{border-color:var(--accent)}
nav button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--bg)}
nav button:focus-visible,a:focus-visible{outline:2px solid var(--accent);outline-offset:4px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:48px 28px;padding-top:40px}
.card{display:flex;flex-direction:column;gap:16px}
.card[hidden]{display:none}
.card .cap{aspect-ratio:16/10}
.meta{display:flex;gap:14px;align-items:baseline}
.txt{display:flex;flex-direction:column;gap:8px;min-width:0}
.name{font-family:Unbounded,sans-serif;font-weight:700;font-size:20px;letter-spacing:-.02em}
.desc{font-size:15px;line-height:1.45;color:var(--muted)}
footer{margin-top:96px;padding-top:24px;border-top:1px solid var(--line);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:12px;color:var(--dim)}
@media (max-width:900px){.case-grid,.shows{grid-template-columns:1fr}.case-smalls{grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
</head>
<body>
<div class="wrap">
<header class="mono"><b>abpq.cc</b><span>${visible.length} projets — La Rochelle</span></header>
<div class="hero">
<h1>ABPQ<span>.</span></h1>
<p class="lede">Des apps utiles, nées d’un besoin concret : la mer, la ville, le sport, la maison. Chacune a son adresse, toutes sont en ligne.</p>
</div>
${hl ? caseStudy(hl) : ''}
${shows.length ? `<section aria-label="Showcases"><div class="sec-h mono"><span class="acc">●</span> À voir</div><div class="shows">${shows.map(showcase).join('')}</div></section>` : ''}
<section aria-labelledby="all-h">
<div class="list-h"><h2 id="all-h" class="sec-h mono"><span class="acc">●</span> Tous les projets</h2>
<nav aria-label="Filtrer par catégorie">${cats.map((c, i) => `<button type="button" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join('')}</nav></div>
<div class="grid">${rest.map(card).join('\n')}</div>
</section>
<footer class="mono"><span>abpq.cc</span><span>La Rochelle — ${new Date().getFullYear()}</span></footer>
</div>
<script>
const btns=document.querySelectorAll('nav button'),cards=document.querySelectorAll('.card');
btns.forEach(b=>b.addEventListener('click',()=>{const f=b.dataset.filter;btns.forEach(x=>x.setAttribute('aria-pressed',x===b));cards.forEach(c=>c.hidden=!(f==='Tout'||c.dataset.cat===f));}));
</script>
</body>
</html>`;
}
