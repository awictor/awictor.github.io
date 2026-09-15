import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tokenize, parseCurl, toFetch, curlToFetch } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('tokenize respects single and double quotes', () => {
  assert.deepEqual(tokenize(`curl -H 'A: b c' "http://x"`), ['curl', '-H', 'A: b c', 'http://x']);
});

check('tokenize joins backslash line continuations', () => {
  assert.deepEqual(tokenize("curl -X POST \\\n  http://x"), ['curl', '-X', 'POST', 'http://x']);
});

check('bare GET request', () => {
  const p = parseCurl('curl https://api.example.com/users');
  assert.equal(p.method, 'GET');
  assert.equal(p.url, 'https://api.example.com/users');
  assert.deepEqual(p.headers, {});
  assert.equal(p.body, null);
});

check('POST with headers and body', () => {
  const p = parseCurl(`curl -X POST https://x -H 'Content-Type: application/json' -d '{"a":1}'`);
  assert.equal(p.method, 'POST');
  assert.equal(p.url, 'https://x');
  assert.equal(p.headers['Content-Type'], 'application/json');
  assert.equal(p.body, '{"a":1}');
});

check('data flag implies POST when no method given', () => {
  const p = parseCurl(`curl https://x -d 'hello=1'`);
  assert.equal(p.method, 'POST');
  assert.equal(p.body, 'hello=1');
});

check('header value keeps colons after the first', () => {
  const p = parseCurl(`curl -H 'X-Time: 12:30:00' https://x`);
  assert.equal(p.headers['X-Time'], '12:30:00');
});

check('-u builds a Basic auth header', () => {
  const p = parseCurl('curl -u user:pass https://x');
  assert.ok(p.headers['Authorization'].startsWith('Basic '));
  assert.equal(p.headers['Authorization'], 'Basic ' + Buffer.from('user:pass').toString('base64'));
});

check('boolean flags are ignored, url still found', () => {
  const p = parseCurl('curl -sL --compressed https://x -A curl/8');
  assert.equal(p.url, 'https://x');
  assert.equal(p.method, 'GET');
  assert.equal(p.headers['User-Agent'], 'curl/8');
});

check('toFetch emits url, method, headers and body', () => {
  const code = curlToFetch(`curl -X POST https://x -H 'Content-Type: application/json' -d '{"a":1}'`);
  assert.ok(code.includes('fetch("https://x", {'));
  assert.ok(code.includes('method: "POST"'));
  assert.ok(code.includes('"Content-Type": "application/json"'));
  assert.ok(code.includes('body: "{\\"a\\":1}"'));
  assert.ok(code.includes('res.json()'));
});

check('GET fetch omits the body line', () => {
  const code = curlToFetch('curl https://x');
  assert.ok(code.includes('method: "GET"'));
  assert.ok(!code.includes('body:'));
});

console.log(`\n${n} checks passed.`);
