import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { PHI, goldenSplit, goldenLarger, goldenSmaller, isGolden, goldenSequence } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('PHI value and defining identity φ² = φ + 1', () => {
  near(PHI, 1.6180339887498949);
  near(PHI * PHI, PHI + 1);
  near(1 / PHI, PHI - 1);   // reciprocal identity
});

check('goldenSplit parts sum to the total', () => {
  const { major, minor } = goldenSplit(100);
  near(major + minor, 100);
  near(major, 61.803398875, 1e-6);
  near(minor, 38.196601125, 1e-6);
});

check('goldenSplit ratio is φ', () => {
  const { major, minor } = goldenSplit(960);
  near(major / minor, PHI, 1e-9);
});

check('goldenLarger / goldenSmaller scale by φ', () => {
  near(goldenLarger(10) / 10, PHI);
  near(10 / goldenSmaller(10), PHI);
});

check('scale round-trips', () => {
  near(goldenSmaller(goldenLarger(16)), 16);
  near(goldenLarger(goldenSmaller(42)), 42);
});

check('isGolden recognises golden pairs, rejects others', () => {
  assert.equal(isGolden(PHI, 1), true);
  assert.equal(isGolden(161.8, 100), true);
  assert.equal(isGolden(100, 161.8), true);   // order-independent
  assert.equal(isGolden(2, 1), false);
  assert.equal(isGolden(1, 1), false);
});

check('isGolden guards zero and non-numbers', () => {
  assert.equal(isGolden(0, 5), false);
  assert.equal(isGolden(5, 0), false);
  assert.equal(isGolden('x', 5), false);
});

check('goldenSequence grows by φ each step', () => {
  const s = goldenSequence(16, 4);
  assert.equal(s.length, 4);
  near(s[0], 16);
  near(s[1] / s[0], PHI);
  near(s[3] / s[2], PHI);
  near(s[2], 16 * PHI * PHI);
});

check('goldenSequence validates count', () => {
  assert.throws(() => goldenSequence(16, 0), /positive integer/);
  assert.throws(() => goldenSequence(16, 2.5), /positive integer/);
});

check('positive-value validation', () => {
  assert.throws(() => goldenSplit(-1), /length/);
  assert.throws(() => goldenLarger(-5), /value/);
  assert.throws(() => goldenSplit('x'), /number/);
});

console.log(`\n${n} checks passed.`);
