import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { mean, median, mode, variance, stdDev, percentile, quartiles, summary } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('mean', () => {
  near(mean([1, 2, 3, 4, 5]), 3);
  near(mean([2, 4, 4, 4, 5, 5, 7, 9]), 5);
});

check('median for odd and even counts', () => {
  near(median([1, 2, 3, 4, 5]), 3);
  near(median([1, 2, 3, 4]), 2.5);
  near(median([9, 1, 5]), 5); // unsorted input
});

check('mode: single, multimodal, and none', () => {
  assert.deepEqual(mode([1, 2, 2, 3]), [2]);
  assert.deepEqual(mode([1, 1, 2, 2]), [1, 2]);
  assert.deepEqual(mode([1, 2, 3, 4]), []);
});

check('population vs sample variance of 1..5', () => {
  near(variance([1, 2, 3, 4, 5], false), 2);
  near(variance([1, 2, 3, 4, 5], true), 2.5);
});

check('std dev is the square root of variance', () => {
  near(stdDev([1, 2, 3, 4, 5], false), Math.sqrt(2));
  near(stdDev([1, 2, 3, 4, 5], true), Math.sqrt(2.5));
});

check('percentile endpoints and midpoint', () => {
  near(percentile([1, 2, 3, 4, 5], 0), 1);
  near(percentile([1, 2, 3, 4, 5], 1), 5);
  near(percentile([1, 2, 3, 4, 5], 0.5), 3);
});

check('quartiles of 1..5 (linear interpolation)', () => {
  const q = quartiles([1, 2, 3, 4, 5]);
  near(q.q1, 2); near(q.q2, 3); near(q.q3, 4); near(q.iqr, 2);
});

check('the classic 8-value data set', () => {
  const d = [2, 4, 4, 4, 5, 5, 7, 9];
  near(stdDev(d, false), 2);                 // population σ = 2
  near(variance(d, true), 32 / 7);           // sample variance
  near(median(d), 4.5);
});

check('summary aggregates everything consistently', () => {
  const s = summary([1, 2, 3, 4, 5]);
  assert.equal(s.count, 5);
  near(s.sum, 15); near(s.mean, 3); near(s.min, 1); near(s.max, 5); near(s.range, 4);
  near(s.populationVariance, 2); near(s.sampleVariance, 2.5);
});

check('validation: empty, non-number, bad percentile throw', () => {
  assert.throws(() => mean([]), /at least one number/);
  assert.throws(() => mean([1, NaN]), /finite numbers/);
  assert.throws(() => percentile([1, 2, 3], 1.5), /between 0 and 1/);
  assert.throws(() => variance([5], true), /at least two values/);
});

console.log(`\n${n} checks passed.`);
