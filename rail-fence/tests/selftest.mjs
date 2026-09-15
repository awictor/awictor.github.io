import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { railPattern, encode, decode } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('classic Wikipedia vector (3 rails)', () => {
  assert.equal(encode('WEAREDISCOVEREDFLEEATONCE', 3), 'WECRLTEERDSOEEFEAOCAIVDEN');
});

check('two-rail example', () => {
  assert.equal(encode('HELLO', 2), 'HLOEL');
});

check('decode reverses encode (round-trip)', () => {
  for(const rails of [2, 3, 4, 5]){
    const msg = 'The quick brown fox jumps!';
    assert.equal(decode(encode(msg, rails), rails), msg);
  }
  assert.equal(decode('WECRLTEERDSOEEFEAOCAIVDEN', 3), 'WEAREDISCOVEREDFLEEATONCE');
});

check('one rail is the identity', () => {
  assert.equal(encode('anything here', 1), 'anything here');
  assert.equal(decode('anything here', 1), 'anything here');
});

check('rails larger than text still round-trips', () => {
  assert.equal(decode(encode('hi', 9), 9), 'hi');
});

check('all characters are preserved (a permutation)', () => {
  const src = 'WEAREDISCOVEREDFLEEATONCE';
  const enc = encode(src, 4);
  assert.equal(enc.length, src.length);
  assert.deepEqual([...enc].sort(), [...src].sort());
});

check('spaces and punctuation are preserved through a round-trip', () => {
  const msg = 'meet me @ 5, ok?';
  assert.equal(decode(encode(msg, 3), 3), msg);
});

check('railPattern zigzags correctly', () => {
  assert.deepEqual(railPattern(7, 3), [0, 1, 2, 1, 0, 1, 2]);
  assert.deepEqual(railPattern(5, 2), [0, 1, 0, 1, 0]);
  assert.deepEqual(railPattern(4, 1), [0, 0, 0, 0]);
});

check('empty string', () => {
  assert.equal(encode('', 3), '');
  assert.equal(decode('', 3), '');
});

check('validation', () => {
  assert.throws(() => encode('hi', 0), /positive integer/);
  assert.throws(() => encode('hi', 2.5), /positive integer/);
  assert.throws(() => decode('hi', -1), /positive integer/);
});

console.log(`\n${n} checks passed.`);
