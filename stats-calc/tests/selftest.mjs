import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parseNumbers, sum, mean, median, mode, variance, stdev, quartiles, summary } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

check('parseNumbers splits on commas/spaces/newlines and drops junk', () => {
  assert.deepEqual(parseNumbers('1, 2  3\n4'), [1, 2, 3, 4]);
  assert.deepEqual(parseNumbers('1, x, 2.5, NaN, -3'), [1, 2.5, -3]);
});

check('sum and mean', () => {
  const a = [2, 4, 4, 4, 5, 5, 7, 9];
  assert.equal(sum(a), 40);
  assert.equal(mean(a), 5);
});

check('median handles even and odd counts', () => {
  assert.equal(median([1, 2, 3, 4]), 2.5);
  assert.equal(median([1, 2, 3, 4, 5]), 3);
  assert.equal(median([9, 1, 5]), 5); // unsorted input
});

check('mode: single, multiple, and none', () => {
  assert.deepEqual(mode([2, 4, 4, 4, 5, 5, 7, 9]), [4]);
  assert.deepEqual(mode([1, 1, 2, 2, 3]), [1, 2]);
  assert.deepEqual(mode([1, 2, 3]), []);
});

check('population variance and standard deviation (classic example = 4 and 2)', () => {
  const a = [2, 4, 4, 4, 5, 5, 7, 9];
  near(variance(a, false), 4);
  near(stdev(a, false), 2);
});

check('sample variance and standard deviation use n-1', () => {
  const a = [2, 4, 4, 4, 5, 5, 7, 9];
  near(variance(a, true), 32 / 7);
  near(stdev(a, true), Math.sqrt(32 / 7));
});

check('quartiles for an even-length set', () => {
  const q = quartiles([1, 2, 3, 4, 5, 6, 7, 8]);
  assert.deepEqual([q.q1, q.q2, q.q3], [2.5, 4.5, 6.5]);
});

check('quartiles for an odd-length set exclude the median', () => {
  const q = quartiles([1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual([q.q1, q.q2, q.q3], [2, 4, 6]);
});

check('summary bundles everything, including IQR and min/max', () => {
  const r = summary([2, 4, 4, 4, 5, 5, 7, 9]);
  assert.equal(r.count, 8);
  assert.equal(r.min, 2);
  assert.equal(r.max, 9);
  assert.equal(r.range, 7);
  near(r.populationStdev, 2);
  near(r.iqr, r.q3 - r.q1);
  // single value: sample stats are null, population variance is 0
  const one = summary([5]);
  assert.equal(one.sampleVariance, null);
  assert.equal(one.populationVariance, 0);
  assert.equal(one.q1, 5);
});

check('validation: empty input throws', () => {
  assert.throws(() => mean([]), /at least one number/);
  assert.throws(() => summary([]), /at least one number/);
  assert.throws(() => variance([5], true), /at least two values/);
});

console.log(`\n${n} checks passed.`);
