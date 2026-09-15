import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { normalizeKey, transform, encode, decode } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('classic vector: ATTACKATDAWN / LEMON → LXFOPVEFRNHR', () => {
  assert.equal(encode('ATTACKATDAWN', 'LEMON'), 'LXFOPVEFRNHR');
});

check('decode reverses encode (round-trip)', () => {
  assert.equal(decode('LXFOPVEFRNHR', 'LEMON'), 'ATTACKATDAWN');
  const msg = 'The quick brown fox!';
  assert.equal(decode(encode(msg, 'secret'), 'secret'), msg);
});

check('preserves case', () => {
  const out = encode('Hello', 'key');
  assert.equal(out.length, 5);
  assert.ok(/^[A-Z][a-z]{4}$/.test(out));  // H uppercase, ello lowercase
  assert.equal(decode(out, 'key'), 'Hello');
});

check('non-letters are preserved and do not advance the key', () => {
  // spaces don't shift the key alignment, so segments match the spaceless cipher
  assert.equal(encode('attack at dawn', 'LEMON'), 'lxfopv ef rnhr');
});

check('digits and punctuation pass through untouched', () => {
  assert.equal(encode('a1b2c3!', 'A'), 'a1b2c3!'); // key A = shift 0
  const out = encode('a-b-c', 'B');
  assert.equal(out, 'b-c-d');                       // shift 1, dashes kept
});

check('key A is the identity', () => {
  assert.equal(encode('WhateverText', 'A'), 'WhateverText');
  assert.equal(decode('WhateverText', 'A'), 'WhateverText');
});

check('key is normalized (case & non-letters stripped)', () => {
  assert.equal(normalizeKey('k3y!'), 'KY');
  assert.equal(encode('hello', 'LEMON'), encode('hello', 'l e m o n'));
  assert.equal(encode('hello', 'LEMON'), encode('hello', 'LeMoN'));
});

check('wrap-around arithmetic (mod 26)', () => {
  assert.equal(encode('Z', 'B'), 'A');    // Z + 1 wraps to A
  assert.equal(decode('A', 'B'), 'Z');    // A - 1 wraps to Z
});

check('longer text than key repeats the key', () => {
  const out = encode('aaaaaa', 'ab');     // shifts 0,1,0,1,0,1
  assert.equal(out, 'ababab');
});

check('empty key throws', () => {
  assert.throws(() => encode('hi', ''), /at least one letter/);
  assert.throws(() => encode('hi', '123'), /at least one letter/);
  assert.throws(() => normalizeKey('!!!'), /at least one letter/);
});

console.log(`\n${n} checks passed.`);
