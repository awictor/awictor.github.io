// Headless regression tests for BodyFat pure functions.
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
  addEventListener(){},querySelectorAll(){return[];}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { navyBodyFat, bodyFatCategory, fatMass, leanMass } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 0.05) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

check('navyBodyFat male worked example', () => {
  // h=180, neck=40, waist=90 -> ~18.37%
  near(navyBodyFat({ sex: 'male', height: 180, neck: 40, waist: 90 }), 18.37, 0.05);
});

check('navyBodyFat female worked example', () => {
  // h=165, neck=34, waist=74, hip=96 -> ~26.4%
  near(navyBodyFat({ sex: 'female', height: 165, neck: 34, waist: 74, hip: 96 }), 26.42, 0.1);
});

check('navyBodyFat validates inputs', () => {
  assert.equal(navyBodyFat({ sex: 'male', height: 180, neck: 40, waist: 40 }), null); // waist<=neck
  assert.equal(navyBodyFat({ sex: 'male', height: 0, neck: 40, waist: 90 }), null);
  assert.equal(navyBodyFat({ sex: 'female', height: 165, neck: 34, waist: 74 }), null); // missing hip
  assert.equal(navyBodyFat({ sex: 'male', height: 180, neck: 'x', waist: 90 }), null);
});

check('female requires hip, male ignores it', () => {
  const male = navyBodyFat({ sex: 'male', height: 180, neck: 40, waist: 90, hip: 999 });
  near(male, 18.37, 0.05); // hip ignored for men
});

check('bodyFatCategory male thresholds', () => {
  assert.equal(bodyFatCategory(4, 'male'), 'Essential fat');
  assert.equal(bodyFatCategory(10, 'male'), 'Athletes');
  assert.equal(bodyFatCategory(16, 'male'), 'Fitness');
  assert.equal(bodyFatCategory(20, 'male'), 'Average');
  assert.equal(bodyFatCategory(30, 'male'), 'Obese');
});

check('bodyFatCategory female thresholds', () => {
  assert.equal(bodyFatCategory(12, 'female'), 'Essential fat');
  assert.equal(bodyFatCategory(18, 'female'), 'Athletes');
  assert.equal(bodyFatCategory(23, 'female'), 'Fitness');
  assert.equal(bodyFatCategory(28, 'female'), 'Average');
  assert.equal(bodyFatCategory(35, 'female'), 'Obese');
});

check('fatMass and leanMass split weight', () => {
  assert.equal(fatMass(80, 25), 20);
  assert.equal(leanMass(80, 25), 60);
  assert.equal(fatMass(0, 25), null);
  assert.equal(leanMass(80, NaN), null);
});

check('fat + lean mass sum to weight', () => {
  const w = 72.5, pct = 18.62;
  near(fatMass(w, pct) + leanMass(w, pct), w, 1e-9);
});

console.log(`\n${n} checks passed.`);
