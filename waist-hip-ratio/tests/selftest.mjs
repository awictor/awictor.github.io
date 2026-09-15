import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { THRESHOLDS, ratio, categorize, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);

check('ratio is waist / hip', () => {
  near(ratio(80, 100), 0.8);
  near(ratio(94, 94), 1.0);
});

check('ratio is unit-independent (same in cm or inches)', () => {
  near(ratio(80, 100), ratio(80 / 2.54, 100 / 2.54));
});

check('female: Low below 0.80', () => {
  assert.equal(categorize(0.79, 'female'), 'Low');
  assert.equal(categorize(0.70, 'female'), 'Low');
});

check('female: Moderate 0.80-0.84', () => {
  assert.equal(categorize(0.80, 'female'), 'Moderate');
  assert.equal(categorize(0.84, 'female'), 'Moderate');
});

check('female: High at/above 0.85', () => {
  assert.equal(categorize(0.85, 'female'), 'High');
  assert.equal(categorize(0.95, 'female'), 'High');
});

check('male: Low below 0.90', () => {
  assert.equal(categorize(0.89, 'male'), 'Low');
});

check('male: Moderate 0.90-0.99', () => {
  assert.equal(categorize(0.90, 'male'), 'Moderate');
  assert.equal(categorize(0.99, 'male'), 'Moderate');
});

check('male: High at/above 1.0', () => {
  assert.equal(categorize(1.00, 'male'), 'High');
  assert.equal(categorize(1.10, 'male'), 'High');
});

check('analyze bundles ratio, category, and sex', () => {
  const r = analyze(80, 100, 'female');
  near(r.ratio, 0.8);
  assert.equal(r.category, 'Moderate');
  assert.equal(r.sex, 'female');
  assert.deepEqual(THRESHOLDS.male, [0.90, 1.00]);
});

check('validation: non-positive sizes and unknown sex throw', () => {
  assert.throws(() => ratio(0, 100), /waist must be a positive/);
  assert.throws(() => ratio(80, 0), /hip must be a positive/);
  assert.throws(() => categorize(0.9, 'other'), /male.*female/);
});

console.log(`\n${n} checks passed.`);
