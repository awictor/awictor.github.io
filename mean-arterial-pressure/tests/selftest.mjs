import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { meanArterialPressure, pulsePressure, category, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

check('MAP of 120/80 is 93.33', () => {
  near(meanArterialPressure(120, 80), 280 / 3);
});

check('MAP equals DBP + (SBP-DBP)/3', () => {
  near(meanArterialPressure(120, 80), 80 + (120 - 80) / 3);
  near(meanArterialPressure(140, 90), 90 + (140 - 90) / 3);
});

check('MAP of 90/60 is exactly 70', () => {
  near(meanArterialPressure(90, 60), 70);
});

check('pulse pressure is systolic minus diastolic', () => {
  assert.equal(pulsePressure(120, 80), 40);
  assert.equal(pulsePressure(150, 90), 60);
});

check('category: normal range 65-100', () => {
  assert.equal(category(93.33), 'Normal (65–100)');
  assert.equal(category(65), 'Normal (65–100)');
  assert.equal(category(100), 'Normal (65–100)');
});

check('category: low below 65', () => {
  assert.equal(category(64.9), 'Low (below 65)');
  assert.equal(category(50), 'Low (below 65)');
});

check('category: elevated above 100', () => {
  assert.equal(category(100.1), 'Elevated (above 100)');
  assert.equal(category(120), 'Elevated (above 100)');
});

check('analyze bundles map, pulse pressure, and category', () => {
  const r = analyze(120, 80);
  near(r.map, 280 / 3);
  assert.equal(r.pulsePressure, 40);
  assert.equal(r.category, 'Normal (65–100)');
});

check('a low reading is categorized low', () => {
  const r = analyze(85, 50); // MAP = (85+100)/3 = 61.67
  near(r.map, 185 / 3);
  assert.equal(r.category, 'Low (below 65)');
});

check('validation: bad numbers and SBP<=DBP throw', () => {
  assert.throws(() => meanArterialPressure(0, 80), /systolic must be a positive/);
  assert.throws(() => meanArterialPressure(80, 120), /greater than diastolic/);
  assert.throws(() => meanArterialPressure(120, 120), /greater than diastolic/);
  assert.throws(() => category('x'), /must be a number/);
});

console.log(`\n${n} checks passed.`);
