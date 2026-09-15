// Headless regression tests for BACCalc — Widmark BAC estimation.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',
  appendChild(){},getAttribute(){return null;},setAttribute(){},removeAttribute(){},
  classList:{add(){},remove(){},toggle(){}},
  addEventListener(){},querySelectorAll(){return[];},querySelector(){return null;},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(), querySelector: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { alcoholGrams, standardDrinksToGrams, distributionRatio, bac, timeToZero, timeToLegal, bacStatus, lbToKg } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-3) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b}`);

check('alcoholGrams — a 355ml 5% beer ~ 14g', () => {
  near(alcoholGrams(355, 5), 14.0, 0.05);
  near(alcoholGrams(44, 40), 13.88, 0.05);  // 1.5oz spirit at 40%
  assert.ok(Number.isNaN(alcoholGrams('x', 5)));
});

check('standardDrinksToGrams', () => {
  assert.equal(standardDrinksToGrams(3), 42);      // 3 * 14g default
  assert.equal(standardDrinksToGrams(2, 10), 20);  // UK-ish units
  assert.equal(standardDrinksToGrams(0), 0);
});

check('distributionRatio by sex', () => {
  assert.equal(distributionRatio('male'), 0.68);
  assert.equal(distributionRatio('female'), 0.55);
  assert.equal(distributionRatio('other'), 0.68); // default
});

check('bac — Widmark at t=0 (male, 80kg, 14g)', () => {
  near(bac({ grams: 14, weightKg: 80, sex: 'male', hours: 0 }), 0.02574, 1e-4);
});

check('bac — female higher for same intake', () => {
  const m = bac({ grams: 14, weightKg: 80, sex: 'male', hours: 0 });
  const f = bac({ grams: 14, weightKg: 80, sex: 'female', hours: 0 });
  assert.ok(f > m);
  near(f, 0.03182, 1e-4);
});

check('bac — elimination reduces over time, floored at 0', () => {
  const t0 = bac({ grams: 42, weightKg: 80, sex: 'male', hours: 0 });
  const t2 = bac({ grams: 42, weightKg: 80, sex: 'male', hours: 2, beta: 0.015 });
  near(t2, t0 - 0.03, 1e-6);
  assert.equal(bac({ grams: 14, weightKg: 80, sex: 'male', hours: 10 }), 0); // fully eliminated
});

check('bac — invalid inputs -> NaN', () => {
  assert.ok(Number.isNaN(bac({ grams: 14, weightKg: 0 })));
  assert.ok(Number.isNaN(bac({ grams: 'x', weightKg: 80 })));
  assert.ok(Number.isNaN(bac({})));
});

check('bac — custom r overrides sex', () => {
  near(bac({ grams: 14, weightKg: 80, r: 0.5, hours: 0 }), 0.035, 1e-3);
});

check('timeToZero / timeToLegal', () => {
  near(timeToZero(0.15, 0.015), 10);
  assert.equal(timeToZero(0, 0.015), 0);
  near(timeToLegal(0.15, 0.015, 0.08), (0.15 - 0.08) / 0.015);
  assert.equal(timeToLegal(0.05, 0.015, 0.08), 0); // already under
});

check('bacStatus — labels and legal flag', () => {
  assert.equal(bacStatus(0).overLegalLimit, false);
  assert.equal(bacStatus(0).label, 'No measurable alcohol');
  assert.equal(bacStatus(0.02).overLegalLimit, false);
  assert.equal(bacStatus(0.08).overLegalLimit, true);
  assert.equal(bacStatus(0.1).overLegalLimit, true);
  assert.equal(bacStatus(0.2).label, 'Severe impairment');
  assert.equal(bacStatus(0.4).label, 'Life-threatening — get help');
});

check('lbToKg', () => {
  near(lbToKg(220), 99.79, 0.01);
  near(lbToKg(0), 0);
});

console.log(`\n${n} checks passed.`);
