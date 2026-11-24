// Connexion à /admin par code à usage unique envoyé par email.
import { EmailMessage } from 'cloudflare:email';

const enc = new TextEncoder();
const SESSION_DAYS = 30;
const CODE_TTL = 10 * 60 * 1000;

const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function hmac(env, msg) {
  const key = await crypto.subtle.importKey('raw', enc.encode(env.SESSION_KEY), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64u(await crypto.subtle.sign('HMAC', key, enc.encode(msg)));
}

function safeEq(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function isAuthed(request, env) {
  const m = (request.headers.get('cookie') || '').match(/(?:^|;\s*)abpq_admin=(\d+)\.([\w-]+)/);
  if (!m || Number(m[1]) < Date.now()) return false;
  return safeEq(m[2], await hmac(env, 'admin.' + m[1]));
}

async function sessionCookie(env) {
  const exp = Date.now() + SESSION_DAYS * 864e5;
  return `abpq_admin=${exp}.${await hmac(env, 'admin.' + exp)}; Path=/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_DAYS * 86400}`;
}
export const clearCookie = 'abpq_admin=; Path=/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=0';

const encodeHeader = (s) => '=?UTF-8?B?' + btoa(String.fromCharCode(...enc.encode(s))) + '?=';

async function sendCode(env, code) {
  const from = env.MAIL_FROM || 'admin@abpq.cc';
  const to = env.ADMIN_EMAIL;
  const raw = [
    `From: ${encodeHeader('ABPQ')} <${from}>`,
    `To: <${to}>`,
    `Subject: ${encodeHeader(`Code de connexion ABPQ : ${code}`)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@abpq.cc>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    `Ton code de connexion à l'admin de abpq.cc : ${code}`,
    '',
    'Il est valable 10 minutes et ne sert qu’une fois.',
    'Si tu n’as rien demandé, ignore ce message.',
  ].join('\r\n');
  await env.MAIL.send(new EmailMessage(from, to, raw));
}

// POST /admin/api/code { email }
export async function requestCode(request, env) {
  const { email } = await request.json().catch(() => ({}));
  const ok = String(email || '').trim().toLowerCase() === String(env.ADMIN_EMAIL).toLowerCase();
  if (ok) {
    const prev = await env.DATA.get('otp', { type: 'json' });
    if (prev && Date.now() - prev.sentAt < 45 * 1000) return { status: 429, body: { error: 'Un code vient d’être envoyé. Attends quelques secondes.' } };
    const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, '0');
    await env.DATA.put('otp', JSON.stringify({ hash: await hmac(env, 'otp.' + code), sentAt: Date.now(), exp: Date.now() + CODE_TTL, tries: 0 }), { expirationTtl: 900 });
    await sendCode(env, code);
  }
  // Même réponse que l'adresse soit la bonne ou non.
  return { status: 200, body: { ok: true } };
}

// POST /admin/api/verify { code }
export async function verifyCode(request, env) {
  const { code } = await request.json().catch(() => ({}));
  const otp = await env.DATA.get('otp', { type: 'json' });
  if (!otp || otp.exp < Date.now()) return { status: 401, body: { error: 'Code expiré. Demandes-en un nouveau.' } };
  if (otp.tries >= 5) { await env.DATA.delete('otp'); return { status: 401, body: { error: 'Trop d’essais. Demande un nouveau code.' } }; }
  const good = safeEq(await hmac(env, 'otp.' + String(code || '').trim()), otp.hash);
  if (!good) {
    otp.tries++;
    await env.DATA.put('otp', JSON.stringify(otp), { expirationTtl: 900 });
    return { status: 401, body: { error: 'Code incorrect.' } };
  }
  await env.DATA.delete('otp');
  return { status: 200, body: { ok: true }, cookie: await sessionCookie(env) };
}
