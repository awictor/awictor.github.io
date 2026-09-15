import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { applyDiscounts, effectiveDiscount, savings } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('sequential discounts multiply', () => {
  near(applyDiscounts(100, [20, 10]), 72);      // 100*0.8*0.9
  near(applyDiscounts(100, [50, 50]), 25);
});

check('the headline: 20% + 10% = 28% off, not 30%', () => {
  near(effectiveDiscount([20, 10]), 28);
});

check('effectiveDiscount for other combos', () => {
  near(effectiveDiscount([50, 50]), 75);
  near(effectiveDiscount([10]), 10);
  near(effectiveDiscount([]), 0);
});

check('order does not matter for the result', () => {
  near(applyDiscounts(100, [20, 10]), applyDiscounts(100, [10, 20]));
});

check('savings = price - final', () => {
  near(savings(100, [20, 10]), 28);
  near(savings(200, [10]), 20);
});

check('no discounts leaves the price', () => {
  near(applyDiscounts(100, []), 100);
  near(savings(50, []), 0);
});

check('100% off → free', () => {
  near(applyDiscounts(100, [100]), 0);
  near(effectiveDiscount([100, 50]), 100);
});

check('rejects out-of-range discounts', () => {
  assert.throws(() => applyDiscounts(100, [120]), /0-100/);
  assert.throws(() => applyDiscounts(100, [-5]), /0-100/);
  assert.throws(() => effectiveDiscount([101]), /0-100/);
});

check('rejects negative price', () => {
  assert.throws(() => applyDiscounts(-10, [10]), /non-negative/);
});

check('three stacked discounts', () => {
  near(applyDiscounts(100, [10, 10, 10]), 72.9); // 0.9^3 * 100
  near(effectiveDiscount([10, 10, 10]), 27.1);
});

console.log(`\n${n} checks passed.`);
