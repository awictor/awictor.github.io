import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parseHeaders, analyze, grade } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const statusOf = (res, name) => res.results.find(r => r.name === name).status;

check('parseHeaders lowercases names and keeps colon-bearing values', () => {
  const h = parseHeaders('HTTP/2 200\nContent-Type: text/html\nDate: Mon, 01 Jan 2024 00:00:00 GMT');
  assert.equal(h['content-type'], 'text/html');
  assert.equal(h['date'], 'Mon, 01 Jan 2024 00:00:00 GMT');
  assert.equal('http/2 200' in h, false); // status line skipped
});

check('grade thresholds', () => {
  assert.equal(grade(100), 'A');
  assert.equal(grade(90), 'A');
  assert.equal(grade(85), 'B');
  assert.equal(grade(72), 'C');
  assert.equal(grade(60), 'D');
  assert.equal(grade(45), 'F');
});

check('a fully hardened response scores 100 / grade A', () => {
  const raw = [
    'strict-transport-security: max-age=31536000; includeSubDomains',
    "content-security-policy: default-src 'self'; frame-ancestors 'none'",
    'x-frame-options: DENY',
    'x-content-type-options: nosniff',
    'referrer-policy: no-referrer',
    'permissions-policy: geolocation=()'
  ].join('\n');
  const r = analyze(raw);
  assert.equal(r.score, 100);
  assert.equal(r.grade, 'A');
  assert.ok(r.results.every(x => x.status === 'pass'));
});

check('an empty response fails everything and scores 0', () => {
  const r = analyze('');
  assert.equal(r.score, 0);
  assert.equal(r.grade, 'F');
  assert.equal(statusOf(r, 'Content-Security-Policy'), 'fail');
  assert.equal(statusOf(r, 'Referrer-Policy'), 'warn'); // soft checks warn, not fail
});

check('short HSTS max-age warns and scores half', () => {
  const r = analyze('strict-transport-security: max-age=3600');
  assert.equal(statusOf(r, 'Strict-Transport-Security'), 'warn');
  assert.equal(r.score, 10);
});

check('CSP frame-ancestors satisfies clickjacking without X-Frame-Options', () => {
  const r = analyze("content-security-policy: default-src 'self'; frame-ancestors 'none'");
  assert.equal(statusOf(r, 'X-Frame-Options'), 'pass');
});

check('X-Content-Type-Options must be nosniff', () => {
  assert.equal(statusOf(analyze('x-content-type-options: nosniff'), 'X-Content-Type-Options'), 'pass');
  assert.equal(statusOf(analyze('x-content-type-options: something'), 'X-Content-Type-Options'), 'fail');
});

check('header matching is case-insensitive', () => {
  const r = analyze('Strict-Transport-Security: max-age=31536000');
  assert.equal(statusOf(r, 'Strict-Transport-Security'), 'pass');
});

check('feature-policy counts for the permissions check', () => {
  const r = analyze('feature-policy: geolocation none');
  assert.equal(statusOf(r, 'Permissions-Policy'), 'pass');
});

check('analyze accepts a pre-parsed header object', () => {
  const r = analyze({ 'content-security-policy': "default-src 'self'" });
  assert.equal(statusOf(r, 'Content-Security-Policy'), 'pass');
});

console.log(`\n${n} checks passed.`);
