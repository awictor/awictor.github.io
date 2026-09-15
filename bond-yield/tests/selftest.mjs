import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { bondPrice, currentYield, ytm } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-4) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('par bond: price = face when yield equals coupon', () => {
  near(bondPrice(1000, 0.05, 0.05, 10, 1), 1000);
  near(bondPrice(1000, 0.06, 0.06, 5, 2), 1000);
});

check('premium: yield below coupon prices above face', () => {
  assert.ok(bondPrice(1000, 0.05, 0.03, 10, 1) > 1000);
});

check('discount: yield above coupon prices below face', () => {
  assert.ok(bondPrice(1000, 0.05, 0.07, 10, 1) < 1000);
});

check('zero-coupon price = face / (1+y)^n', () => {
  near(bondPrice(1000, 0, 0.05, 10, 1), 1000 / Math.pow(1.05, 10)); // 613.9133
  near(bondPrice(1000, 0, 0.05, 10, 1), 613.9133, 1e-3);
});

check('price falls as yield rises (monotonic)', () => {
  assert.ok(bondPrice(1000, 0.05, 0.04, 10, 1) > bondPrice(1000, 0.05, 0.06, 10, 1));
});

check('current yield = annual coupon / price', () => {
  near(currentYield(1000, 0.05, 1000), 0.05);
  near(currentYield(1000, 0.05, 800), 50 / 800);
});

check('YTM recovers the coupon rate for a par bond', () => {
  near(ytm(1000, 0.05, 1000, 10, 1), 0.05, 1e-5);
  near(ytm(1000, 0.06, 1000, 5, 2), 0.06, 1e-5);
});

check('YTM of a zero-coupon bond', () => {
  near(ytm(1000, 0, 613.9133, 10, 1), 0.05, 1e-4);
});

check('YTM inverts bondPrice for premium and discount bonds', () => {
  for (const y of [0.03, 0.07, 0.045]) {
    const p = bondPrice(1000, 0.05, y, 10, 2);
    near(ytm(1000, 0.05, p, 10, 2), y, 1e-5);
  }
});

check('validation: bad inputs and frequency throw', () => {
  assert.throws(() => bondPrice(0, 0.05, 0.05, 10, 1), /face value must be positive/);
  assert.throws(() => bondPrice(1000, -0.01, 0.05, 10, 1), /coupon rate must be zero or positive/);
  assert.throws(() => bondPrice(1000, 0.05, 0.05, 10, 3), /1, 2, 4, or 12/);
  assert.throws(() => ytm(1000, 0.05, 0, 10, 1), /price must be positive/);
});

console.log(`\n${n} checks passed.`);
