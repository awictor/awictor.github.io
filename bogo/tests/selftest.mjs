import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { effectiveDiscount, pricePerItem } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('buy 1 get 1 free = 50% off', () => {
  near(effectiveDiscount(1, 1, 100), 0.5);
});

check('buy 2 get 1 free = 33.3% off', () => {
  near(effectiveDiscount(2, 1, 100), 1 / 3);
});

check('buy 1 get 1 at 50% off = 25% off', () => {
  near(effectiveDiscount(1, 1, 50), 0.25);
});

check('buy 3 get 2 free = 40% off', () => {
  near(effectiveDiscount(3, 2, 100), 0.4);
});

check('0% off on the "get" items = no discount', () => {
  near(effectiveDiscount(1, 1, 0), 0);
});

check('more free items → bigger discount', () => {
  assert.ok(effectiveDiscount(1, 2, 100) > effectiveDiscount(1, 1, 100));
});

check('price per item for BOGO free', () => {
  const p = pricePerItem(10, 1, 1, 100);
  near(p.total, 10);        // pay for 1 of 2
  near(p.perItem, 5);       // 10 / 2 items
});

check('price per item with partial discount', () => {
  const p = pricePerItem(10, 1, 1, 50);   // pay 10 + 5 = 15 for 2
  near(p.total, 15);
  near(p.perItem, 7.5);
});

check('effective discount matches the per-item saving', () => {
  const eff = effectiveDiscount(2, 1, 100);     // 1/3
  const p = pricePerItem(30, 2, 1, 100);        // total 60 for 3 items
  near(1 - p.perItem / 30, eff);                // per-item 20 vs 30 → 1/3
});

check('validation', () => {
  assert.throws(() => effectiveDiscount(0, 1, 100), /buy/);
  assert.throws(() => effectiveDiscount(1, 0, 100), /get/);
  assert.throws(() => effectiveDiscount(1, 1, 150), /0–100/);
  assert.throws(() => pricePerItem(-1, 1, 1, 100), /price/);
});

console.log(`\n${n} checks passed.`);
