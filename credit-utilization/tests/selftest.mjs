import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { utilization, overallUtilization, category, paydownToTarget } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('single-card utilization = balance / limit', () => {
  near(utilization(300, 1000), 0.3);
  near(utilization(0, 1000), 0);
});

check('over-limit balance gives ratio > 1', () => {
  near(utilization(1200, 1000), 1.2);
});

check('overall aggregates balances and limits', () => {
  near(overallUtilization([{ balance: 300, limit: 1000 }, { balance: 200, limit: 1000 }]), 0.25);
  near(overallUtilization([{ balance: 300, limit: 1000 }, { balance: 200, limit: 2000 }]), 500 / 3000);
});

check('category bands', () => {
  assert.equal(category(0.05).name, 'Excellent');
  assert.equal(category(0.20).name, 'Good');
  assert.equal(category(0.40).name, 'Fair');
  assert.equal(category(0.60).name, 'High');
  assert.equal(category(0.90).name, 'Very high');
});

check('category boundaries are half-open (<)', () => {
  assert.equal(category(0.10).name, 'Good');
  assert.equal(category(0.30).name, 'Fair');
  assert.equal(category(0.50).name, 'High');
  assert.equal(category(0.75).name, 'Very high');
});

check('paydownToTarget computes the amount to pay', () => {
  const cards = [{ balance: 300, limit: 1000 }, { balance: 200, limit: 1000 }]; // bal 500, lim 2000
  near(paydownToTarget(cards, 0.10), 300);  // 500 - 0.1*2000
  near(paydownToTarget(cards, 0.25), 0);    // already at 25%
});

check('paydownToTarget never negative', () => {
  const cards = [{ balance: 100, limit: 5000 }];
  assert.equal(paydownToTarget(cards, 0.30), 0);
});

check('paydown reaches the target exactly', () => {
  const cards = [{ balance: 800, limit: 1000 }];
  const pay = paydownToTarget(cards, 0.30);
  near(pay, 500);                                   // 800 - 300
  near(overallUtilization([{ balance: 800 - pay, limit: 1000 }]), 0.30);
});

check('validation: bad limit/balance', () => {
  assert.throws(() => utilization(100, 0), /limit/);
  assert.throws(() => utilization(-1, 1000), /balance/);
  assert.throws(() => overallUtilization([{ balance: 100, limit: 0 }]), /limit/);
});

check('overall of no usable limit throws', () => {
  assert.throws(() => overallUtilization([]), /at least one card/);
});

console.log(`\n${n} checks passed.`);
