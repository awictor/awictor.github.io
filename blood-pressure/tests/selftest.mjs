// Headless regression tests for BloodPressure — AHA category + MAP.
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
const { LEVELS, bpCategory, meanArterialPressure, pulsePressure } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b}`);

check('Normal', () => {
  assert.equal(bpCategory(118, 76).category, 'Normal');
  assert.equal(bpCategory(118, 76).level, 0);
  assert.equal(bpCategory(119, 79).level, 0);
});

check('Elevated — SBP 120-129 AND DBP < 80', () => {
  assert.equal(bpCategory(122, 78).category, 'Elevated');
  assert.equal(bpCategory(129, 79).level, 1);
  // SBP 120 but DBP 82 -> Stage 1 (OR rule), not Elevated
  assert.equal(bpCategory(120, 82).level, 2);
});

check('Stage 1 — SBP 130-139 OR DBP 80-89', () => {
  assert.equal(bpCategory(132, 78).category, 'Hypertension Stage 1');
  assert.equal(bpCategory(118, 82).level, 2);   // diastolic drives it
  assert.equal(bpCategory(139, 89).level, 2);
});

check('Stage 2 — SBP >= 140 OR DBP >= 90', () => {
  assert.equal(bpCategory(145, 85).category, 'Hypertension Stage 2');
  assert.equal(bpCategory(120, 92).level, 3);
  assert.equal(bpCategory(140, 80).level, 3);
});

check('Crisis — SBP > 180 OR DBP > 120', () => {
  assert.equal(bpCategory(185, 70).category, 'Hypertensive Crisis');
  assert.equal(bpCategory(150, 130).level, 4);
  assert.equal(bpCategory(181, 80).level, 4);
});

check('boundary values land in the right bucket', () => {
  assert.equal(bpCategory(120, 79).level, 1); // exactly 120 -> Elevated
  assert.equal(bpCategory(130, 79).level, 2); // exactly 130 -> Stage 1
  assert.equal(bpCategory(140, 79).level, 3); // exactly 140 -> Stage 2
  assert.equal(bpCategory(180, 79).level, 3); // 180 >= 140 -> Stage 2 (only > 180 is Crisis)
});

check('meanArterialPressure', () => {
  near(meanArterialPressure(120, 80), 80 + 40 / 3);
  near(meanArterialPressure(120, 90), 100); // 90 + 30/3
});

check('pulsePressure', () => {
  assert.equal(pulsePressure(120, 80), 40);
  assert.equal(pulsePressure(140, 70), 70);
});

check('invalid input', () => {
  assert.equal(bpCategory(0, 80).level, -1);
  assert.equal(bpCategory(120, 0).category, null);
  assert.ok(Number.isNaN(bpCategory('x', 80).map));
});

check('LEVELS ordering', () => {
  assert.deepEqual(LEVELS, ['Normal', 'Elevated', 'Hypertension Stage 1', 'Hypertension Stage 2', 'Hypertensive Crisis']);
});

console.log(`\n${n} checks passed.`);
