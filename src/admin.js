// Interface /admin (connexion par code email, gestion des projets).
export function renderAdmin(mode) {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#000000">
<title>Admin — abpq.cc</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%231c1c1e'/><circle cx='44' cy='44' r='8' fill='%23C6FF3D'/></svg>">
<style>
:root{--bg:#000;--panel:#1c1c1e;--panel2:#2c2c2e;--line:rgba(84,84,88,.55);--line2:rgba(84,84,88,.3);--fg:#f5f5f7;--fg2:#98989d;--fg3:#636366;--blue:#0A84FF;--green:#30D158;--orange:#FF9F0A;--red:#FF453A;--lime:#C6FF3D;
--sans:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Inter,system-ui,sans-serif;--mono:ui-monospace,"SF Mono",SFMono-Regular,Menlo,monospace}
*{box-sizing:border-box}[hidden]{display:none!important}
html,body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.45 var(--sans);-webkit-font-smoothing:antialiased;letter-spacing:-.01em}
button,input,select,textarea{font:inherit;color:inherit;letter-spacing:inherit}
a{color:var(--blue);text-decoration:none}
.mono{font-family:var(--mono);letter-spacing:0}
main{max-width:1180px;margin:0 auto;padding:28px clamp(16px,3vw,40px) 80px}
.top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:22px}
.top h1{margin:0;font-size:28px;font-weight:700;letter-spacing:-.025em;flex:1 1 auto;display:flex;align-items:center;gap:12px}
.top h1 small{font-size:13px;font-weight:400;color:var(--fg2)}
.btn{height:34px;padding:0 14px;border-radius:9px;border:0;background:var(--panel2);cursor:pointer;font-weight:500;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.btn:hover{filter:brightness(1.2)}.btn:disabled{opacity:.5;cursor:default}
.btn.primary{background:var(--blue);color:#fff}.btn.danger{background:rgba(255,69,58,.15);color:var(--red)}.btn.ghost{background:transparent;color:var(--fg2)}
.btn:focus-visible,.icon:focus-visible,.sw:focus-visible,.seg button:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
.note{background:rgba(255,159,10,.12);color:var(--orange);border-radius:12px;padding:10px 14px;font-size:13px;margin-bottom:20px}
.feat{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:12px;margin-bottom:30px}
.slot{background:var(--panel);border-radius:14px;padding:12px;display:flex;gap:12px;align-items:center;min-height:84px}
.slot .lab{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--fg3)}
.slot b{display:block;font-weight:600;margin-top:2px}
.slot.empty b{color:var(--fg3);font-weight:400}
.slot .th{width:96px;flex:none}
.h2{font-size:13px;font-weight:600;color:var(--fg2);margin:0 0 8px 16px;text-transform:uppercase;letter-spacing:.05em;display:flex;justify-content:space-between}
.list{background:var(--panel);border-radius:14px;overflow:hidden}
.row{display:grid;grid-template-columns:96px minmax(0,1fr) auto auto auto;gap:16px;align-items:center;padding:12px 14px;border-top:1px solid var(--line2)}
.row:first-child{border-top:0}
.row.off{opacity:.45}
.th{width:96px;aspect-ratio:16/10;border-radius:6px;overflow:hidden;background:var(--panel2);position:relative}
.th img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top}
.info{min-width:0}
.info b{font-weight:600}
.info .host{font-family:var(--mono);font-size:12px;color:var(--fg2);margin-left:6px}
.info .d{font-size:13px;color:var(--fg2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.chips{display:flex;gap:4px;flex-wrap:wrap;margin-top:5px}
.chips span{font:500 10.5px var(--mono);color:var(--fg2);background:var(--panel2);border-radius:5px;padding:2px 6px}
.chips .new{background:rgba(198,255,61,.15);color:var(--lime)}
.seg{display:inline-flex;background:rgba(0,0,0,.35);border-radius:9px;padding:2px;border:1px solid var(--line)}
.seg button{border:0;background:transparent;padding:4px 10px;border-radius:7px;cursor:pointer;font-size:12.5px;color:var(--fg2)}
.seg button.on{background:var(--panel2);color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.4)}
.seg button.on.hl{background:var(--lime);color:#000}.seg button.on.sc{background:var(--blue);color:#fff}
.sw{width:42px;height:26px;border-radius:13px;border:0;background:#39393d;position:relative;cursor:pointer;transition:background .2s;flex:none}
.sw::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.4)}
.sw[aria-checked="true"]{background:var(--green)}.sw[aria-checked="true"]::after{transform:translateX(16px)}
.acts{display:flex;gap:2px}
.icon{width:30px;height:30px;border-radius:8px;border:0;background:transparent;color:var(--fg2);cursor:pointer;display:grid;place-items:center}
.icon:hover{background:var(--panel2);color:var(--fg)}.icon:disabled{opacity:.25;cursor:default;background:transparent}
dialog{border:0;padding:0;background:transparent;color:var(--fg);max-width:min(640px,calc(100vw - 32px));width:100%}
dialog::backdrop{background:rgba(0,0,0,.6);backdrop-filter:blur(6px)}
.sheet{background:rgba(44,44,46,.94);backdrop-filter:saturate(180%) blur(30px);border:1px solid var(--line);border-radius:16px;padding:22px;box-shadow:0 30px 80px rgba(0,0,0,.6);max-height:calc(100vh - 40px);overflow:auto}
.sheet h3{margin:0 0 16px;font-size:17px;font-weight:600}
.f{margin-bottom:12px}.f label{display:block;font-size:12px;font-weight:500;color:var(--fg2);margin-bottom:5px}
.f input,.f textarea,.f select{width:100%;border-radius:9px;border:1px solid var(--line);background:rgba(0,0,0,.35);padding:8px 11px;outline:none}
.f textarea{min-height:70px;resize:vertical}.f textarea.long{min-height:140px}
.f input:focus,.f textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(10,132,255,.25)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.shotrow{display:grid;grid-template-columns:1fr auto 90px;gap:8px;align-items:center;margin-bottom:6px}
.shotrow input[type=text]{font-family:var(--mono);font-size:13px}
.shotrow label{display:flex;gap:6px;align-items:center;font-size:13px;color:var(--fg2);margin:0}
.hint{font-size:12px;color:var(--fg3);margin-top:4px}
.err{color:var(--red);font-size:13px;min-height:18px;margin:4px 0 8px}
.foot{display:flex;gap:8px;justify-content:flex-end;align-items:center;flex-wrap:wrap}.foot .left{margin-right:auto;display:flex;gap:8px}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);opacity:0;background:rgba(44,44,46,.95);backdrop-filter:blur(20px);border:1px solid var(--line);padding:10px 16px;border-radius:12px;font-size:14px;transition:all .25s;pointer-events:none;z-index:10}
.toast.on{opacity:1;transform:translateX(-50%) translateY(0)}
.auth{min-height:100vh;display:grid;place-items:center;padding:24px}
.auth .sheet{width:100%;max-width:360px;text-align:center}
.auth .logo{width:56px;height:56px;margin:4px auto 14px;border-radius:14px;background:var(--panel2);display:grid;place-items:center}
.auth .logo i{width:14px;height:14px;border-radius:50%;background:var(--lime);display:block}
.auth p{color:var(--fg2);font-size:13px;margin:0 0 18px}
.auth input{width:100%;height:42px;border-radius:10px;border:1px solid var(--line);background:rgba(0,0,0,.35);padding:0 12px;outline:none;text-align:center;margin-bottom:10px}
.auth input#code{font:600 22px var(--mono);letter-spacing:.3em}
.auth input:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(10,132,255,.25)}
.auth .btn{width:100%;justify-content:center;height:40px}
@media (max-width:860px){.feat{grid-template-columns:1fr}.row{grid-template-columns:72px minmax(0,1fr) auto;}.row .seg{grid-column:2/-1}.th{width:72px}.two{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
</head>
<body>
${mode === 'app' ? APP_HTML : LOGIN_HTML}
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script>
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),2000);}
async function api(path, opts = {}) {
  const res = await fetch('/admin/api/' + path, { method: opts.method || 'GET', headers: { 'content-type': 'application/json' }, body: opts.body ? JSON.stringify(opts.body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && ${JSON.stringify(mode)} === 'app') { location.reload(); throw new Error('Session expirée'); }
  if (!res.ok) throw new Error(data.error || 'Erreur ' + res.status);
  return data;
}
${mode === 'app' ? APP_JS : LOGIN_JS}
</script>
</body>
</html>`;
}

const LOGIN_HTML = `<div class="auth"><div class="sheet">
<div class="logo"><i></i></div>
<h3>Admin abpq.cc</h3>
<form id="f1"><p>Un code de connexion sera envoyé par email.</p>
<input type="email" id="email" autocomplete="email" placeholder="Adresse email" required autofocus aria-label="Adresse email">
<div class="err" id="err1"></div><button class="btn primary" type="submit">Recevoir un code</button></form>
<form id="f2" hidden><p id="sent">Si l’adresse est autorisée, un code vient d’arriver. Il est valable 10 minutes.</p>
<input id="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" placeholder="000000" required aria-label="Code à 6 chiffres">
<div class="err" id="err2"></div><button class="btn primary" type="submit">Se connecter</button>
<button class="btn ghost" type="button" id="back" style="margin-top:6px">Changer d’adresse</button></form>
</div></div>`;

const LOGIN_JS = `
$('#f1').addEventListener('submit', async (e) => {
  e.preventDefault(); $('#err1').textContent = '';
  try { await api('code', { method: 'POST', body: { email: $('#email').value } }); $('#f1').hidden = true; $('#f2').hidden = false; $('#code').focus(); }
  catch (x) { $('#err1').textContent = x.message; }
});
$('#f2').addEventListener('submit', async (e) => {
  e.preventDefault(); $('#err2').textContent = '';
  try { await api('verify', { method: 'POST', body: { code: $('#code').value } }); location.reload(); }
  catch (x) { $('#err2').textContent = x.message; }
});
$('#back').addEventListener('click', () => { $('#f2').hidden = true; $('#f1').hidden = false; $('#email').focus(); });`;

const APP_HTML = `<main>
<div class="top">
  <h1>Projets <small id="count"></small></h1>
  <button class="btn" id="scan" type="button">Scanner les sous-domaines</button>
  <button class="btn" id="add" type="button">＋ Ajouter</button>
  <button class="btn" id="settings" type="button">Réglages</button>
  <a class="btn" href="/" target="_blank" rel="noopener">Voir le site ↗</a>
  <button class="btn ghost" id="logout" type="button">Déconnexion</button>
</div>
<div class="note" id="autoNote" hidden>Découverte automatique désactivée : le jeton API n’est pas encore posé. Les projets s’ajoutent à la main en attendant.</div>
<div class="feat" id="feat"></div>
<div class="h2"><span>Tous les projets</span><span id="lastScan"></span></div>
<div class="list" id="list"></div>
</main>
<dialog id="dlg"><form class="sheet" id="form">
  <h3 id="ftitle">Projet</h3>
  <div class="two"><div class="f"><label for="e-n">Identifiant (sous-domaine)</label><input id="e-n" required class="mono" spellcheck="false"></div>
  <div class="f"><label for="e-url">Adresse</label><input id="e-url" type="url" required class="mono" spellcheck="false"></div></div>
  <div class="two"><div class="f"><label for="e-t">Titre</label><input id="e-t" required></div>
  <div class="f"><label for="e-c">Catégorie</label><input id="e-c" list="cats" required><datalist id="cats"></datalist></div></div>
  <div class="f"><label for="e-d">Phrase courte</label><textarea id="e-d" maxlength="240"></textarea></div>
  <div class="f"><label for="e-tags">Stack (séparée par des virgules)</label><input id="e-tags" placeholder="Next.js, React, Tailwind"></div>
  <div class="f"><label for="e-long">Texte de l’étude de cas (utilisé si le projet est en highlight)</label><textarea id="e-long" class="long" maxlength="3000" placeholder="Le besoin, ce que fait l’app, comment. Un paragraphe par ligne vide."></textarea></div>
  <div class="f"><label>Captures de l’étude de cas (chemin, mobile, décalage vertical en px)</label><div id="shots"></div><div class="hint">L’image principale est toujours la page d’accueil.</div></div>
  <div class="f" style="max-width:160px"><label for="e-tint">Couleur sans capture</label><input id="e-tint" type="color"></div>
  <div class="err" id="ferr"></div>
  <div class="foot"><div class="left"><button class="btn danger" type="button" id="del">Supprimer</button><button class="btn" type="button" id="reshot">Refaire les captures</button></div>
  <button class="btn" type="button" id="cancel">Annuler</button><button class="btn primary" type="submit">Enregistrer</button></div>
</form></dialog>
<dialog id="dlg2"><form class="sheet" id="form2">
  <h3>Réglages</h3>
  <div class="f"><label for="e-ignore">Sous-domaines ignorés par le scan (séparés par des virgules)</label><textarea id="e-ignore" class="mono"></textarea><div class="hint">Un projet supprimé est ajouté ici pour ne pas revenir au scan suivant.</div></div>
  <div class="foot"><button class="btn" type="button" id="cancel2">Annuler</button><button class="btn primary" type="submit">Enregistrer</button></div>
</form></dialog>`;

const APP_JS = `
let S = null, EDIT = -1;
const I = {
  up: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 15 6-6 6 6"/></svg>',
  down: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>',
  edit: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h4L19 9l-4-4L4 16v4z"/></svg>',
  open: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>'
};
const host = (u) => { try { return new URL(u).hostname; } catch (e) { return u; } };
const thumb = (p) => '<div class="th" style="background:' + esc(p.tint) + '"><img src="/shots/' + esc(p.n) + '.jpg' + (p.shotsAt ? '?v=' + Date.parse(p.shotsAt) : '') + '" alt="" loading="lazy" onerror="this.remove()"></div>';

async function load() { S = await api('site'); render(); }
let saveT = null;
function save(msg) {
  clearTimeout(saveT);
  saveT = setTimeout(async () => {
    try { const r = await api('site', { method: 'PUT', body: { projects: S.projects, ignore: S.ignore } }); S.projects = r.projects; S.ignore = r.ignore; toast(msg || 'Enregistré'); render(); }
    catch (x) { toast(x.message); load(); }
  }, 250);
}

function render() {
  const P = S.projects;
  $('#autoNote').hidden = S.automation;
  $('#scan').disabled = !S.automation;
  $('#count').textContent = P.filter((p) => !p.hidden).length + ' visibles · ' + P.filter((p) => p.hidden).length + ' masqués';
  $('#lastScan').textContent = S.lastScan ? 'Dernier scan : ' + new Date(S.lastScan.at).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '';
  const hl = P.find((p) => p.role === 'highlight'), sc = P.filter((p) => p.role === 'showcase');
  const slot = (label, p) => '<div class="slot' + (p ? '' : ' empty') + '">' + (p ? thumb(p) : '') + '<div><span class="lab">' + label + '</span><b>' + (p ? esc(p.t) : 'Aucun — choisis-le dans la liste') + '</b></div></div>';
  $('#feat').innerHTML = slot('Highlight · étude de cas', hl) + slot('Showcase 1', sc[0]) + slot('Showcase 2', sc[1]);
  $('#cats').innerHTML = [...new Set(P.map((p) => p.c))].map((c) => '<option value="' + esc(c) + '">').join('');
  $('#list').innerHTML = P.map((p, i) => '<div class="row' + (p.hidden ? ' off' : '') + '">' + thumb(p) +
    '<div class="info"><b>' + esc(p.t) + '</b><span class="host">' + esc(host(p.url)) + '</span><div class="d">' + esc(p.d) + '</div>' +
      '<div class="chips">' + (p.auto && !p.reviewed ? '<span class="new">auto</span>' : '') + '<span>' + esc(p.c) + '</span>' + (p.tags || []).map((t) => '<span>' + esc(t) + '</span>').join('') + '</div></div>' +
    '<div class="seg" role="radiogroup" aria-label="Mise en avant de ' + esc(p.t) + '">' +
      ['', 'showcase', 'highlight'].map((r) => '<button type="button" role="radio" data-role="' + r + '" data-i="' + i + '" aria-checked="' + ((p.role || '') === r) + '" class="' + ((p.role || '') === r ? 'on' : '') + (r === 'highlight' ? ' hl' : r === 'showcase' ? ' sc' : '') + '">' + (r === '' ? '—' : r === 'showcase' ? 'Showcase' : 'Highlight') + '</button>').join('') + '</div>' +
    '<button class="sw" type="button" role="switch" data-vis="' + i + '" aria-checked="' + !p.hidden + '" aria-label="Visible sur le site : ' + esc(p.t) + '" title="Visible sur le site"></button>' +
    '<div class="acts"><button class="icon" type="button" data-move="' + i + ',-1" aria-label="Monter" ' + (i === 0 ? 'disabled' : '') + '>' + I.up + '</button>' +
      '<button class="icon" type="button" data-move="' + i + ',1" aria-label="Descendre" ' + (i === P.length - 1 ? 'disabled' : '') + '>' + I.down + '</button>' +
      '<a class="icon" href="' + esc(p.url) + '" target="_blank" rel="noopener" aria-label="Ouvrir">' + I.open + '</a>' +
      '<button class="icon" type="button" data-edit="' + i + '" aria-label="Modifier ' + esc(p.t) + '">' + I.edit + '</button></div>' +
  '</div>').join('');
}

function setRole(i, role) {
  const P = S.projects, p = P[i];
  if (role === 'showcase' && p.role !== 'showcase' && P.filter((x) => x.role === 'showcase').length >= 2) { toast('Deux showcases maximum : retire d’abord l’un des deux.'); return; }
  if (role === 'highlight') P.forEach((x) => { if (x.role === 'highlight') x.role = null; });
  p.role = role || null;
  if (p.role) p.hidden = false;
  render(); save(role === 'highlight' ? 'Highlight mis à jour' : 'Enregistré');
}

document.addEventListener('click', (e) => {
  const r = e.target.closest('[data-role]'); if (r) return setRole(Number(r.dataset.i), r.dataset.role);
  const v = e.target.closest('[data-vis]'); if (v) { const p = S.projects[Number(v.dataset.vis)]; p.hidden = !p.hidden; if (p.hidden) p.role = null; render(); save(p.hidden ? 'Masqué du site' : 'Visible sur le site'); return; }
  const m = e.target.closest('[data-move]'); if (m) { const [i, d] = m.dataset.move.split(',').map(Number); const P = S.projects; [P[i], P[i + d]] = [P[i + d], P[i]]; render(); save('Ordre enregistré'); return; }
  const ed = e.target.closest('[data-edit]'); if (ed) openForm(Number(ed.dataset.edit));
});

function shotRow(s, k) {
  return '<div class="shotrow"><input type="text" data-sp="' + k + '" value="' + esc(s.path) + '" aria-label="Chemin capture ' + (k + 1) + '">' +
    '<label><input type="checkbox" data-sm="' + k + '"' + (s.mobile ? ' checked' : '') + '> mobile</label>' +
    '<input type="number" data-sy="' + k + '" value="' + (s.y || 0) + '" min="0" step="100" aria-label="Décalage vertical capture ' + (k + 1) + '"></div>';
}
function openForm(i) {
  EDIT = i;
  const p = i >= 0 ? S.projects[i] : { n: '', url: '', t: '', d: '', long: '', c: 'Outils', tags: [], tint: '#2B2B2E', caseShots: [{ path: '/', mobile: true, y: 0 }, { path: '/', mobile: false, y: 800 }, { path: '/', mobile: false, y: 1600 }] };
  $('#ftitle').textContent = i >= 0 ? p.t : 'Nouveau projet';
  $('#e-n').value = p.n; $('#e-n').readOnly = i >= 0; $('#e-url').value = p.url; $('#e-t').value = p.t; $('#e-c').value = p.c;
  $('#e-d').value = p.d; $('#e-tags').value = (p.tags || []).join(', '); $('#e-long').value = p.long || ''; $('#e-tint').value = p.tint || '#2B2B2E';
  $('#shots').innerHTML = p.caseShots.map(shotRow).join('');
  $('#del').hidden = i < 0; $('#reshot').hidden = i < 0 || !S.automation; $('#ferr').textContent = '';
  $('#dlg').showModal();
}
$('#e-n').addEventListener('input', () => { if (EDIT < 0) $('#e-url').value = $('#e-n').value ? 'https://' + $('#e-n').value.trim().toLowerCase() + '.abpq.cc' : ''; });
function formList() {
  const base = EDIT >= 0 ? S.projects[EDIT] : { hidden: false, role: null, auto: false, addedAt: new Date().toISOString() };
  const p = Object.assign({}, base, {
    n: $('#e-n').value.trim().toLowerCase(), url: $('#e-url').value.trim(), t: $('#e-t').value.trim(), c: $('#e-c').value.trim(),
    d: $('#e-d').value.trim(), long: $('#e-long').value, tint: $('#e-tint').value, reviewed: true,
    tags: $('#e-tags').value.split(',').map((x) => x.trim()).filter(Boolean),
    caseShots: [0, 1, 2].map((k) => ({ path: $('[data-sp="' + k + '"]').value || '/', mobile: $('[data-sm="' + k + '"]').checked, y: Number($('[data-sy="' + k + '"]').value) || 0 }))
  });
  const next = S.projects.slice(); if (EDIT >= 0) next[EDIT] = p; else next.push(p);
  return { p, next };
}
$('#form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const { p, next } = formList();
  try {
    const r = await api('site', { method: 'PUT', body: { projects: next, ignore: S.ignore } });
    S.projects = r.projects; S.ignore = r.ignore; $('#dlg').close(); render(); toast('Enregistré');
    if (EDIT < 0 && S.automation) { toast('Capture en cours…'); try { await api('shots/' + encodeURIComponent(p.n), { method: 'POST' }); await load(); toast('Capture faite'); } catch (x) { toast(x.message); } }
  } catch (x) { $('#ferr').textContent = x.message; }
});
$('#cancel').addEventListener('click', () => $('#dlg').close());
$('#del').addEventListener('click', () => {
  const p = S.projects[EDIT];
  if (!confirm('Retirer « ' + p.t + ' » de la liste ? Le site lui-même n’est pas touché.')) return;
  S.projects.splice(EDIT, 1);
  if (p.url.endsWith('.abpq.cc') || p.url.includes('.abpq.cc/')) { const sub = host(p.url).replace('.abpq.cc', ''); if (!S.ignore.includes(sub)) S.ignore.push(sub); }
  $('#dlg').close(); render(); save('Retiré de la liste');
});
$('#reshot').addEventListener('click', async () => {
  const b = $('#reshot'); b.disabled = true; b.textContent = 'Captures en cours…';
  $('#ferr').textContent = '';
  try { const { p, next } = formList(); const r = await api('site', { method: 'PUT', body: { projects: next, ignore: S.ignore } }); S.projects = r.projects; await api('shots/' + encodeURIComponent(p.n) + '?case=1', { method: 'POST' }); await load(); $('#dlg').close(); toast('Captures refaites'); }
  catch (x) { $('#ferr').textContent = x.message; } finally { b.disabled = false; b.textContent = 'Refaire les captures'; }
});
$('#scan').addEventListener('click', async () => {
  const b = $('#scan'); b.disabled = true; b.textContent = 'Scan en cours…';
  try { const r = await api('scan', { method: 'POST' }); await load(); toast(r.added.length ? r.added.length + ' projet(s) ajouté(s) : ' + r.added.join(', ') : 'Aucun nouveau sous-domaine'); }
  catch (x) { toast(x.message); } finally { b.disabled = !S.automation; b.textContent = 'Scanner les sous-domaines'; }
});
$('#add').addEventListener('click', () => openForm(-1));
$('#settings').addEventListener('click', () => { $('#e-ignore').value = S.ignore.join(', '); $('#dlg2').showModal(); });
$('#cancel2').addEventListener('click', () => $('#dlg2').close());
$('#form2').addEventListener('submit', (e) => { e.preventDefault(); S.ignore = $('#e-ignore').value.split(',').map((x) => x.trim()).filter(Boolean); $('#dlg2').close(); save('Réglages enregistrés'); });
$('#logout').addEventListener('click', async () => { await api('logout', { method: 'POST' }); location.reload(); });
load();`;
