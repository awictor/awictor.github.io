import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gallonsFromInches, litersFromCm, gallonsToLiters, litersToGallons, waterWeightLb, waterWeightKg } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('gallons from inches (231 in³/gal)', () => {
  near(gallonsFromInches(24, 12, 16), 4608 / 231, 1e-9);   // ≈ 19.95 (20-gal long)
  near(gallonsFromInches(231, 1, 1), 1, 1e-9);
});

check('litres from cm (1000 cm³/L)', () => {
  near(litersFromCm(60, 30, 36), 64.8, 1e-9);
  near(litersFromCm(10, 10, 10), 1, 1e-9);
});

check('gallon ↔ litre conversions', () => {
  near(gallonsToLiters(1), 3.785411784, 1e-9);
  near(litersToGallons(3.785411784), 1, 1e-9);
  near(litersToGallons(gallonsToLiters(20)), 20, 1e-9);
});

check('water weight (lb per gallon)', () => {
  near(waterWeightLb(1), 8.345404, 1e-6);
  near(waterWeightLb(20), 20 * 8.345404, 1e-6);
});

check('water weight (kg per litre)', () => {
  near(waterWeightKg(100), 99.8, 1e-6);
  assert.ok(waterWeightKg(50) < 50);   // slightly under 1 kg/L
});

check('volume scales with each dimension', () => {
  near(gallonsFromInches(48, 12, 16), 2 * gallonsFromInches(24, 12, 16), 1e-9);
  near(litersFromCm(120, 30, 36), 2 * litersFromCm(60, 30, 36), 1e-9);
});

check('20-gallon-long is about 20 gallons', () => {
  const g = gallonsFromInches(24, 12, 16);
  assert.ok(g > 19.5 && g < 20.5);
});

check('a litre tank holds ~0.264 gallons', () => {
  near(litersToGallons(1), 0.264172, 1e-5);
});

check('metric round-trip via gallons', () => {
  const lit = litersFromCm(50, 25, 30);   // 37.5 L
  near(gallonsToLiters(litersToGallons(lit)), lit, 1e-9);
});

check('validation', () => {
  assert.throws(() => gallonsFromInches('x', 12, 16), /numbers/);
  assert.throws(() => litersFromCm(60, 'y', 36), /numbers/);
});

console.log(`\n${n} checks passed.`);
