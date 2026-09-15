import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { toGray, fromGray, toBits, popcount } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('the 3-bit Gray sequence matches the standard table', () => {
  assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7].map(toGray), [0, 1, 3, 2, 6, 7, 5, 4]);
});

check('toGray uses n XOR (n>>1)', () => {
  for (let i = 0; i < 256; i++) assert.equal(toGray(i), i ^ (i >> 1));
});

check('fromGray inverts toGray', () => {
  for (let i = 0; i < 1000; i++) assert.equal(fromGray(toGray(i)), i);
});

check('fromGray of the 3-bit table recovers 0..7', () => {
  assert.deepEqual([0, 1, 3, 2, 6, 7, 5, 4].map(fromGray), [0, 1, 2, 3, 4, 5, 6, 7]);
});

check('consecutive Gray codes differ by exactly one bit', () => {
  for (let i = 0; i < 512; i++) assert.equal(popcount(toGray(i) ^ toGray(i + 1)), 1);
});

check('gray(0) is 0 and gray is a bijection on a range', () => {
  assert.equal(toGray(0), 0);
  const seen = new Set([...Array(256).keys()].map(toGray));
  assert.equal(seen.size, 256);
});

check('popcount counts set bits', () => {
  assert.equal(popcount(0), 0);
  assert.equal(popcount(7), 3);
  assert.equal(popcount(255), 8);
  assert.equal(popcount(1024), 1);
});

check('toBits formats and left-pads', () => {
  assert.equal(toBits(5), '101');
  assert.equal(toBits(5, 8), '00000101');
  assert.equal(toBits(0, 4), '0000');
});

check('a specific value: 42', () => {
  assert.equal(toGray(42), 63);       // 42=101010 -> gray 111111 = 63
  assert.equal(fromGray(63), 42);
});

check('validation: negatives and non-integers throw', () => {
  assert.throws(() => toGray(-1), /non-negative integer/);
  assert.throws(() => toGray(2.5), /non-negative integer/);
  assert.throws(() => fromGray(-3), /non-negative integer/);
});

console.log(`\n${n} checks passed.`);
