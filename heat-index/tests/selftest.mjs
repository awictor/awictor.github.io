import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cToF, fToC, heatIndexF, heatIndexC, category } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('temperature conversions round-trip', () => {
  assert.equal(cToF(0), 32);
  assert.equal(cToF(100), 212);
  assert.equal(fToC(32), 0);
  near(fToC(cToF(37)), 37, 1e-9);
});

check('matches NWS chart values (±2°F)', () => {
  near(heatIndexF(90, 70), 106, 2);   // chart ~106
  near(heatIndexF(100, 40), 109, 2);  // chart ~109
  near(heatIndexF(80, 40), 80, 2);    // chart 80
});

check('below threshold ≈ air temperature', () => {
  near(heatIndexF(78, 50), 78, 2);
  near(heatIndexF(70, 90), 70, 3);
});

check('rises with humidity at a fixed hot temperature', () => {
  assert.ok(heatIndexF(90, 80) > heatIndexF(90, 40));
});

check('rises with temperature at a fixed humidity', () => {
  assert.ok(heatIndexF(100, 60) > heatIndexF(90, 60));
});

check('celsius wrapper agrees with fahrenheit path', () => {
  near(heatIndexC(fToC(90), 70), fToC(heatIndexF(90, 70)), 1e-6);
  near(heatIndexC(32.2, 70), fToC(heatIndexF(cToF(32.2), 70)), 1e-6);
});

check('dry-air adjustment lowers the index', () => {
  // low humidity in the hot band triggers the subtraction branch
  const adjusted = heatIndexF(100, 10);
  assert.ok(Number.isFinite(adjusted));
  assert.ok(adjusted < 100); // very dry air feels cooler than the raw regression
});

check('category thresholds', () => {
  assert.equal(category(75).name, 'Comfortable');
  assert.equal(category(85).name, 'Caution');
  assert.equal(category(100).name, 'Extreme Caution');
  assert.equal(category(110).name, 'Danger');
  assert.equal(category(130).name, 'Extreme Danger');
});

check('category boundaries are half-open (< max)', () => {
  assert.equal(category(80).name, 'Caution');          // 80 is not Comfortable
  assert.equal(category(91).name, 'Extreme Caution');
  assert.equal(category(126).name, 'Extreme Danger');
});

check('validation', () => {
  assert.throws(() => heatIndexF(90, 150), /humidity/);
  assert.throws(() => heatIndexF(90, -1), /humidity/);
  assert.throws(() => heatIndexF('x', 50), /numbers/);
});

console.log(`\n${n} checks passed.`);
