import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { PATTERNS, identify, classify } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const A = 'a'.repeat(36);

check('detects AWS access key IDs', () => {
  assert.equal(classify('AKIAIOSFODNN7EXAMPLE'), 'AWS Access Key ID');
  assert.equal(classify('ASIA' + 'B'.repeat(16)), 'AWS Access Key ID');
});

check('detects GitHub tokens', () => {
  assert.equal(classify('ghp_' + A), 'GitHub Token');
  assert.equal(classify('ghs_' + A), 'GitHub Token');
});

check('detects Stripe keys', () => {
  // built by concatenation so no full key literal sits in source (push protection)
  assert.equal(classify('sk_live_' + '51H8xYz0000000000abcdefghij'), 'Stripe Key');
  assert.equal(classify('pk_test_' + '0123456789abcd'), 'Stripe Key');
});

check('detects OpenAI keys (sk- with a dash)', () => {
  assert.equal(classify('sk-' + 'A'.repeat(32)), 'OpenAI API Key');
});

check('detects Google API keys', () => {
  assert.equal(classify('AIza' + 'x'.repeat(35)), 'Google API Key');
});

check('detects JWTs', () => {
  assert.equal(classify('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.abc-123_XY'), 'JSON Web Token (JWT)');
});

check('detects PEM private keys of several kinds', () => {
  assert.equal(classify('-----BEGIN RSA PRIVATE KEY-----'), 'PEM Private Key');
  assert.equal(classify('-----BEGIN PRIVATE KEY-----'), 'PEM Private Key');
  assert.equal(classify('-----BEGIN OPENSSH PRIVATE KEY-----'), 'PEM Private Key');
});

check('detects UUIDs and hex digests', () => {
  assert.equal(classify('550e8400-e29b-41d4-a716-446655440000'), 'UUID');
  assert.equal(classify('d41d8cd98f00b204e9800998ecf8427e'), 'Hex digest (MD5/SHA)'); // md5 (32)
});

check('finds a secret embedded in a larger blob', () => {
  const log = 'export TOKEN=ghp_' + A + ' # do not commit';
  const hits = identify(log);
  assert.ok(hits.some(h => h.name === 'GitHub Token'));
  assert.equal(hits.find(h => h.name === 'GitHub Token').match, 'ghp_' + A);
});

check('plain text yields Unknown / no matches', () => {
  assert.equal(classify('the quick brown fox'), 'Unknown');
  assert.deepEqual(identify('hello world'), []);
});

console.log(`\n${n} checks passed.`);
