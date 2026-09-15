import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { digitSum, digitalRoot, additivePersistence, chain } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('digit sum', () => {
  assert.equal(digitSum(9875), 29);
  assert.equal(digitSum(0), 0);
  assert.equal(digitSum(9), 9);
  assert.equal(digitSum(1000000), 1);
});

check('digital root of known values', () => {
  assert.equal(digitalRoot(9875), 2);
  assert.equal(digitalRoot(12345), 6);
  assert.equal(digitalRoot(0), 0);
  assert.equal(digitalRoot(9), 9);
});

check('digital root of single digits is itself', () => {
  for (let d = 0; d <= 9; d++) assert.equal(digitalRoot(d), d);
});

check('digital root formula: 1 + (n-1) mod 9', () => {
  for (let i = 1; i <= 2000; i++) assert.equal(digitalRoot(i), 1 + (i - 1) % 9);
});

check('digital root matches repeated digit summing', () => {
  const naive = x => { while (x >= 10) x = digitSum(x); return x; };
  for (const x of [0, 5, 38, 9875, 199999, 123456789]) assert.equal(digitalRoot(x), naive(x));
});

check('multiples of 9 (except 0) have digital root 9', () => {
  for (const x of [9, 18, 99, 999, 123453]) assert.equal(digitalRoot(x), 9);
});

check('additive persistence', () => {
  assert.equal(additivePersistence(9875), 3); // 9875->29->11->2
  assert.equal(additivePersistence(0), 0);
  assert.equal(additivePersistence(7), 0);
  assert.equal(additivePersistence(10), 1);
  assert.equal(additivePersistence(29), 2); // 29->11->2
});

check('additive persistence of 199 is 3', () => {
  assert.equal(additivePersistence(199), 3); // 199->19->10->1
});

check('chain shows the digit-sum path ending at the digital root', () => {
  assert.deepEqual(chain(9875), [9875, 29, 11, 2]);
  assert.deepEqual(chain(7), [7]);
  const c = chain(123456789);
  assert.equal(c[c.length - 1], digitalRoot(123456789));
});

check('validation: negatives and non-integers throw', () => {
  assert.throws(() => digitSum(-1), /non-negative whole number/);
  assert.throws(() => digitalRoot(2.5), /non-negative whole number/);
  assert.throws(() => additivePersistence('x'), /non-negative whole number/);
});

console.log(`\n${n} checks passed.`);
