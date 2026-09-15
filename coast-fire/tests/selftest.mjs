import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { futureValue, fireNumber, coastNumber, yearsToTarget, isCoastFire } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('futureValue compounds a lump sum', () => {
  near(futureValue(10000, 0.07, 10), 10000 * Math.pow(1.07, 10), 1e-6); // ≈ 19671.51
  near(futureValue(5000, 0, 20), 5000, 1e-9); // 0% return -> unchanged
});

check('fireNumber applies the withdrawal-rate rule', () => {
  near(fireNumber(40000, 0.04), 1000000, 1e-6); // 25x
  near(fireNumber(40000, 0.035), 40000 / 0.035, 1e-6);
});

check('coastNumber discounts the target back to today', () => {
  near(coastNumber(1000000, 0.07, 30), 1000000 / Math.pow(1.07, 30), 1e-6); // ≈ 131367
});

check('coastNumber then futureValue round-trips to the target', () => {
  const target = 1000000, rate = 0.06, years = 25;
  const cn = coastNumber(target, rate, years);
  near(futureValue(cn, rate, years), target, 1e-6);
});

check('a higher return rate means a smaller coast number', () => {
  assert.ok(coastNumber(1000000, 0.08, 30) < coastNumber(1000000, 0.05, 30));
});

check('yearsToTarget inverts the growth', () => {
  const cn = coastNumber(1000000, 0.07, 30);
  near(yearsToTarget(cn, 1000000, 0.07), 30, 1e-6);
});

check('yearsToTarget is 0 when already at/above target', () => {
  assert.equal(yearsToTarget(200000, 150000, 0.07), 0);
});

check('yearsToTarget is Infinity when the rate is 0 and short of target', () => {
  assert.equal(yearsToTarget(100000, 200000, 0), Infinity);
});

check('isCoastFire reflects whether savings will reach the target', () => {
  const target = fireNumber(40000, 0.04); // 1,000,000
  // 200k at 7% for 30y -> ~1.52M >= target
  assert.equal(isCoastFire(200000, target, 0.07, 30), true);
  // 50k at 7% for 30y -> ~380k < target
  assert.equal(isCoastFire(50000, target, 0.07, 30), false);
});

check('validation', () => {
  assert.throws(() => futureValue(1000, -1, 10), /greater than -100/);
  assert.throws(() => futureValue(1000, 0.07, -1), /non-negative/);
  assert.throws(() => fireNumber(40000, 0), /withdrawal rate/);
  assert.throws(() => yearsToTarget(0, 1000, 0.07), /must be positive/);
});

console.log(`\n${n} checks passed.`);
