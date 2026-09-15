import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { abvSimple, abvStandard, apparentAttenuation, sgToPlato } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('simple ABV = (OG − FG) × 131.25', () => {
  near(abvSimple(1.050, 1.010), 0.04 * 131.25); // 5.25
  near(abvSimple(1.050, 1.010), 5.25);
});

check('standard ABV for a typical ale', () => {
  const v = abvStandard(1.050, 1.010);
  near(v, (76.08 * 0.04 / (1.775 - 1.050)) * (1.010 / 0.794));
  assert.ok(v > 5.3 && v < 5.35); // ~5.34%
});

check('no fermentation means zero alcohol', () => {
  near(abvSimple(1.050, 1.050), 0);
  near(abvStandard(1.050, 1.050), 0);
});

check('standard exceeds simple at higher gravities', () => {
  assert.ok(abvStandard(1.090, 1.020) > abvSimple(1.090, 1.020));
});

check('apparent attenuation = (OG − FG)/(OG − 1)', () => {
  near(apparentAttenuation(1.050, 1.010), 80); // 0.04/0.05
  near(apparentAttenuation(1.060, 1.015), 0.045 / 0.060 * 100); // 75
});

check('full attenuation to 1.000 is 100%', () => {
  near(apparentAttenuation(1.050, 1.000), 100);
});

check('sgToPlato: water (1.000) is ~0 °Plato', () => {
  near(sgToPlato(1.000), 0, 0.01);
});

check('sgToPlato: 1.040 is ~10 °Plato', () => {
  near(sgToPlato(1.040), 10, 0.02);
});

check('higher gravity yields more Plato (monotonic)', () => {
  assert.ok(sgToPlato(1.060) > sgToPlato(1.040));
  assert.ok(sgToPlato(1.040) > sgToPlato(1.020));
});

check('validation: FG > OG and out-of-range gravities throw', () => {
  assert.throws(() => abvSimple(1.010, 1.050), /cannot exceed/);
  assert.throws(() => abvStandard(1.010, 1.050), /cannot exceed/);
  assert.throws(() => abvSimple(50, 1.010), /specific gravity/);
  assert.throws(() => sgToPlato(2), /specific gravity/);
});

console.log(`\n${n} checks passed.`);
