import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cagr, futureValue, yearsToTarget, doublingTime } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('cagr of a doubling over 10 years ≈ 7.177%', () => {
  near(cagr(1000, 2000, 10), Math.pow(2, 0.1) - 1);
  near(cagr(1000, 2000, 10), 0.0717734625);
});

check('cagr is 0 when value is unchanged', () => {
  near(cagr(5000, 5000, 3), 0);
});

check('cagr is negative when value falls', () => {
  assert.ok(cagr(10000, 5000, 5) < 0);
  near(cagr(10000, 5000, 5), Math.pow(0.5, 0.2) - 1);
});

check('cagr rejects non-positive inputs', () => {
  assert.throws(() => cagr(0, 2000, 10), /start value/);
  assert.throws(() => cagr(1000, 0, 10), /end value/);
  assert.throws(() => cagr(1000, 2000, 0), /years/);
});

check('futureValue round-trips with cagr', () => {
  const r = cagr(1000, 2000, 10);
  near(futureValue(1000, r, 10), 2000);
});

check('futureValue compounds correctly', () => {
  near(futureValue(1000, 0.08, 10), 1000 * Math.pow(1.08, 10));
  near(futureValue(1000, 0, 10), 1000);
});

check('yearsToTarget inverts the growth', () => {
  const r = cagr(1000, 2000, 10);
  near(yearsToTarget(1000, 2000, r), 10);
});

check('doublingTime matches ln2 / ln(1+rate)', () => {
  near(doublingTime(0.072), Math.log(2) / Math.log(1.072));
  // rule-of-72 sanity: ~10 years at ~7.2%
  assert.ok(Math.abs(doublingTime(0.072) - 10) < 0.1);
});

check('doublingTime rejects zero / <= -1 rates', () => {
  assert.throws(() => doublingTime(0), /non-zero/);
  assert.throws(() => doublingTime(-1), /> -1/);
});

check('yearsToTarget rejects invalid values and rates', () => {
  assert.throws(() => yearsToTarget(0, 2000, 0.05), /positive/);
  assert.throws(() => yearsToTarget(1000, 2000, 0), /non-zero/);
});

console.log(`\n${n} checks passed.`);
