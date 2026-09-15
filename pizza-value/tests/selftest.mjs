import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pizzaArea, totalArea, pricePerArea, areaPerDollar, bestValue } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('pizzaArea = pi * r^2', () => {
  near(pizzaArea(12), Math.PI * 36, 1e-9);   // ≈ 113.10
  near(pizzaArea(16), Math.PI * 64, 1e-9);   // ≈ 201.06
});

check('doubling the diameter quadruples the area', () => {
  near(pizzaArea(20), 4 * pizzaArea(10), 1e-9);
});

check('a 16-inch has ~78% more area than a 12-inch', () => {
  const ratio = pizzaArea(16) / pizzaArea(12);
  near(ratio, (16 * 16) / (12 * 12), 1e-9); // 1.777...
});

check('totalArea scales by count', () => {
  near(totalArea(2, 12), 2 * pizzaArea(12), 1e-9);
  near(totalArea(0, 12), 0, 1e-9);
});

check('pricePerArea and areaPerDollar are reciprocals', () => {
  near(pricePerArea(14, 15) * areaPerDollar(14, 15), 1, 1e-9);
});

check('areaPerDollar rewards more pizza for the money', () => {
  // same price, bigger pizza -> more area per dollar
  assert.ok(areaPerDollar(16, 15) > areaPerDollar(12, 15));
});

check('bestValue picks the most area per dollar', () => {
  // 18" @ $15 vs 12" @ $10 -> 18" is better
  assert.equal(bestValue([{ diameter: 18, price: 15 }, { diameter: 12, price: 10 }]), 0);
  assert.equal(bestValue([{ diameter: 10, price: 9 }, { diameter: 14, price: 12 }]), 1);
});

check('bestValue accounts for quantity (two mediums vs one large)', () => {
  // two 10" ($8 each = $16 total, area 2*78.54=157.1) vs one 14" ($14, area 153.9)
  // per dollar: 157.1/16 = 9.82  vs  153.9/14 = 10.99 -> the large wins
  const idx = bestValue([{ diameter: 10, price: 16, count: 2 }, { diameter: 14, price: 14, count: 1 }]);
  assert.equal(idx, 1);
});

check('bestValue breaks ties toward the earliest', () => {
  assert.equal(bestValue([{ diameter: 12, price: 10 }, { diameter: 12, price: 10 }]), 0);
});

check('validation', () => {
  assert.throws(() => pizzaArea(0), /diameter must be positive/);
  assert.throws(() => pricePerArea(12, 0), /price must be positive/);
  assert.throws(() => bestValue([]), /at least one/);
  assert.throws(() => totalArea(-1, 12), /non-negative/);
});

console.log(`\n${n} checks passed.`);
