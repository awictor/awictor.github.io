import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { bondPrice, currentYield, yieldToMaturity, macaulayDuration, modifiedDuration } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('par bond: yield = coupon → price = face', () => {
  near(bondPrice(1000, 5, 10, 5, 2), 1000, 1e-6);
});

check('discount vs premium', () => {
  assert.ok(bondPrice(1000, 5, 10, 6, 2) < 1000);   // yield > coupon → discount
  assert.ok(bondPrice(1000, 5, 10, 4, 2) > 1000);   // yield < coupon → premium
});

check('zero-coupon price (semiannual convention)', () => {
  near(bondPrice(1000, 0, 10, 5, 2), 1000 / Math.pow(1.025, 20), 1e-6); // ≈ 610.27
  near(bondPrice(1000, 0, 10, 5, 2), 610.27, 0.01);
});

check('zero yield → sum of undiscounted cash flows', () => {
  // 5% coupon, semiannual, 10y: 20 coupons of 25 + 1000 face = 1500
  near(bondPrice(1000, 5, 10, 0, 2), 25 * 20 + 1000, 1e-6);
});

check('current yield = annual coupon / price', () => {
  near(currentYield(1000, 5, 1000), 5, 1e-9);
  near(currentYield(1000, 5, 500), 10, 1e-9);
});

check('YTM inverts price', () => {
  const p = bondPrice(1000, 5, 10, 6.3, 2);
  near(yieldToMaturity(p, 1000, 5, 10, 2), 6.3, 1e-3);
});

check('YTM of a par-priced bond equals its coupon', () => {
  near(yieldToMaturity(1000, 1000, 5, 10, 2), 5, 1e-3);
});

check('zero-coupon Macaulay duration equals maturity', () => {
  near(macaulayDuration(1000, 0, 10, 5, 2), 10, 1e-6);
});

check('modified duration is below Macaulay and positive', () => {
  const mac = macaulayDuration(1000, 5, 10, 6, 2);
  const mod = modifiedDuration(1000, 5, 10, 6, 2);
  assert.ok(mod > 0 && mod < mac);
  near(mod, mac / (1 + 0.06 / 2), 1e-9);
});

check('coupon bond duration is less than maturity', () => {
  assert.ok(macaulayDuration(1000, 5, 10, 5, 2) < 10);
  assert.throws(() => bondPrice('x', 5, 10, 5, 2), /numbers/);
});

console.log(`\n${n} checks passed.`);
