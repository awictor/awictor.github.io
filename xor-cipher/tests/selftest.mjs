import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hexToBytes, bytesToHex, xor, xorTextToHex, xorHexToText } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('hex ⇄ bytes', () => {
  assert.deepEqual(hexToBytes('48656c6c6f'), [72, 101, 108, 108, 111]); // Hello
  assert.equal(bytesToHex([255, 0, 16]), 'ff0010');
  assert.equal(bytesToHex(hexToBytes('deadBEEF')), 'deadbeef');
});

check('single-byte XOR', () => {
  assert.deepEqual(xor([0x41], [0x20]), [0x61]);   // 'A' ^ space = 'a'
  assert.deepEqual(xor([1, 2, 3], [0xff]), [254, 253, 252]);
});

check('repeating key wraps', () => {
  assert.deepEqual(xor([10, 20, 30], [1, 2]), [11, 22, 31]); // ^1,^2,^1
});

check('XOR is self-inverse', () => {
  const data = [...'Attack at dawn'].map(c => c.charCodeAt(0));
  const key = [...'key'].map(c => c.charCodeAt(0));
  assert.deepEqual(xor(xor(data, key), key), data);
});

check('classic "Hello" ^ "K"', () => {
  assert.equal(xorTextToHex('Hello', 'K'), '032e272724');
});

check('text → hex → text round-trip', () => {
  assert.equal(xorHexToText(xorTextToHex('Attack at dawn', 'secret'), 'secret'), 'Attack at dawn');
});

check('hex key mode', () => {
  assert.equal(xorTextToHex('A', 'ff', true), bytesToHex([0x41 ^ 0xff]));
  assert.equal(xorHexToText(xorTextToHex('hi there', '0f10', true), '0f10', true), 'hi there');
});

check('UTF-8 payload round-trips', () => {
  assert.equal(xorHexToText(xorTextToHex('café €', 'k'), 'k'), 'café €');
});

check('empty key throws', () => {
  assert.throws(() => xor([1, 2, 3], []), /key must not be empty/);
  assert.throws(() => xorTextToHex('x', ''), /empty/);
});

check('invalid hex throws', () => {
  assert.throws(() => hexToBytes('xyz'), /invalid hex/);
  assert.throws(() => hexToBytes('abc'), /even number/);
});

console.log(`\n${n} checks passed.`);
