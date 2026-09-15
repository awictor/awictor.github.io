import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { monthlyRate, minPaymentFor, amortizeMinimum, amortizeFixed } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('monthlyRate = APR/12', () => {
  near(monthlyRate(12), 0.01, 1e-12);
  near(monthlyRate(0), 0, 1e-12);
});

check('minPaymentFor: floor applies when the percent is tiny', () => {
  // balance 100, 0% APR, 1% -> $1, floored to $25
  near(minPaymentFor(100, 0, 1, 25), 25, 1e-9);
});

check('minPaymentFor: percent + interest beats the floor for big balances', () => {
  // balance 5000, 12% APR -> interest 50, 1% -> 50, base 100, floor 25 -> 100
  near(minPaymentFor(5000, 12, 1, 25), 100, 1e-9);
});

check('minPaymentFor never exceeds balance + interest', () => {
  // tiny balance: pay <= balance + interest
  const p = minPaymentFor(10, 12, 1, 25);
  near(p, 10 + 10 * 0.01, 1e-9); // 10.10, not the $25 floor
});

check('amortizeFixed with no interest is balance / payment', () => {
  const r = amortizeFixed(1000, 0, 100);
  assert.equal(r.months, 10);
  near(r.totalInterest, 0, 1e-9);
  near(r.totalPaid, 1000, 1e-9);
});

check('amortizeFixed with interest (worked example)', () => {
  // balance 100, 12% APR (1%/mo), pay 50 -> 3 months, interest ~1.5251
  const r = amortizeFixed(100, 12, 50);
  assert.equal(r.months, 3);
  near(r.totalInterest, 1.5251, 0.01);
  near(r.totalPaid, 101.5251, 0.01);
});

check('amortizeFixed throws when payment cannot cover interest', () => {
  // balance 1000, 12% APR -> interest $10/mo; paying $10 or less never reduces
  assert.throws(() => amortizeFixed(1000, 12, 10), /cover interest/);
  assert.throws(() => amortizeFixed(1000, 12, 5), /cover interest/);
});

check('amortizeMinimum terminates with finite months and real interest', () => {
  const r = amortizeMinimum(5000, 22, 1, 25);
  assert.ok(r.months > 0 && r.months < 6000);
  assert.ok(r.totalInterest > 0);
  assert.ok(r.totalPaid > 5000);
});

check('minimum payments cost more and take longer than a solid fixed payment', () => {
  const m = amortizeMinimum(5000, 22, 1, 25);
  const f = amortizeFixed(5000, 22, 200);
  assert.ok(m.months > f.months, 'minimum should take longer');
  assert.ok(m.totalInterest > f.totalInterest, 'minimum should cost more interest');
});

check('validation', () => {
  assert.throws(() => monthlyRate(-1), /non-negative/);
  assert.throws(() => amortizeMinimum(1000, 22, 0, 25), /percent/);
  assert.throws(() => amortizeFixed(1000, 22, 0), /positive/);
  assert.throws(() => amortizeFixed(-5, 22, 100), /non-negative/);
});

console.log(`\n${n} checks passed.`);
