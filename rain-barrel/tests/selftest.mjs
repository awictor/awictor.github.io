import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { harvestGallons, harvestLiters } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('0.623 gallons per inch per square foot at 100% efficiency', () => {
  near(harvestGallons(1000, 1, 1), 623, 1e-9);
  near(harvestGallons(1, 1, 1), 0.623, 1e-9);
});

check('efficiency scales the result', () => {
  near(harvestGallons(1000, 1, 0.9), 560.7, 1e-6);
  near(harvestGallons(1000, 1, 0.5), 311.5, 1e-6);
});

check('metric: 1 mm on 1 m2 is 1 liter', () => {
  near(harvestLiters(100, 10, 1), 1000, 1e-9);
  near(harvestLiters(1, 1, 1), 1, 1e-9);
});

check('doubling area doubles the harvest', () => {
  near(harvestGallons(2000, 1, 1), 2 * harvestGallons(1000, 1, 1), 1e-9);
});

check('doubling rainfall doubles the harvest', () => {
  near(harvestGallons(1000, 2, 1), 2 * harvestGallons(1000, 1, 1), 1e-9);
});

check('zero rainfall or zero efficiency gives zero', () => {
  near(harvestGallons(1000, 0, 0.9), 0, 1e-9);
  near(harvestGallons(1000, 1, 0), 0, 1e-9);
});

check('imperial and metric roughly agree', () => {
  // 1000 sqft ~= 92.9 m2, 1 inch = 25.4 mm
  const gal = harvestGallons(1000, 1, 1);        // 623 gal
  const galInL = gal * 3.78541;                   // ~2358 L
  const lit = harvestLiters(1000 / 10.7639, 25.4, 1);
  assert.ok(Math.abs(galInL - lit) / lit < 0.01); // within 1%
});

check('a bigger roof collects more', () => {
  assert.ok(harvestGallons(3000, 1, 0.9) > harvestGallons(800, 1, 0.9));
});

check('default efficiency is 0.9', () => {
  near(harvestGallons(1000, 1), harvestGallons(1000, 1, 0.9), 1e-9);
  near(harvestLiters(100, 10), harvestLiters(100, 10, 0.9), 1e-9);
});

check('validation', () => {
  assert.throws(() => harvestGallons(-1, 1, 0.9), /non-negative/);
  assert.throws(() => harvestGallons(1000, 1, 1.5), /between 0 and 1/);
  assert.throws(() => harvestLiters(100, 10, -0.1), /between 0 and 1/);
});

console.log(`\n${n} checks passed.`);
