import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parseSetCookie, audit } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parses name, value and attributes', () => {
  const c = parseSetCookie('sessionId=abc123; Path=/; Max-Age=3600; Secure; HttpOnly; SameSite=Strict');
  assert.equal(c.name, 'sessionId');
  assert.equal(c.value, 'abc123');
  assert.equal(c.path, '/');
  assert.equal(c.maxAge, 3600);
  assert.equal(c.secure, true);
  assert.equal(c.httpOnly, true);
  assert.equal(c.sameSite, 'Strict');
});

check('value keeps everything after the first =', () => {
  assert.equal(parseSetCookie('token=a=b=c; Path=/').value, 'a=b=c');
});

check('attribute names are case-insensitive', () => {
  const c = parseSetCookie('x=1; SECURE; httponly; samesite=lax');
  assert.equal(c.secure, true);
  assert.equal(c.httpOnly, true);
  assert.equal(c.sameSite, 'lax');
});

check('absent flags default to false / null', () => {
  const c = parseSetCookie('x=1');
  assert.equal(c.secure, false);
  assert.equal(c.httpOnly, false);
  assert.equal(c.sameSite, null);
  assert.equal(c.maxAge, null);
});

check('domain, expires and non-numeric max-age', () => {
  const c = parseSetCookie('a=b; Domain=example.com; Expires=Wed, 09 Jun 2027 10:18:14 GMT; Max-Age=oops');
  assert.equal(c.domain, 'example.com');
  assert.equal(c.expires, 'Wed, 09 Jun 2027 10:18:14 GMT');
  assert.equal(c.maxAge, 'oops');   // preserved as string when not an integer
});

check('whitespace is trimmed', () => {
  const c = parseSetCookie('  a = 1 ;  Path = /app ; Secure ');
  assert.equal(c.name, 'a');
  assert.equal(c.value, '1');
  assert.equal(c.path, '/app');
  assert.equal(c.secure, true);
});

check('audit flags a hardened cookie as clean', () => {
  const c = parseSetCookie('s=1; Secure; HttpOnly; SameSite=Strict; Max-Age=60');
  assert.deepEqual(audit(c), []);
});

check('audit warns about missing flags', () => {
  const w = audit(parseSetCookie('s=1'));
  assert.ok(w.some(x => /Secure/.test(x)));
  assert.ok(w.some(x => /HttpOnly/.test(x)));
  assert.ok(w.some(x => /SameSite/.test(x)));
  assert.ok(w.some(x => /Session cookie/.test(x)));
});

check('audit warns SameSite=None without Secure', () => {
  const w = audit(parseSetCookie('s=1; SameSite=None; HttpOnly; Max-Age=60'));
  assert.ok(w.some(x => /SameSite=None requires/.test(x)));
});

check('validation', () => {
  assert.throws(() => parseSetCookie(''), /empty/);
  assert.throws(() => parseSetCookie('novalue'), /name=value/);
});

console.log(`\n${n} checks passed.`);
