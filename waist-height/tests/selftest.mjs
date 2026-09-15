// Headless regression tests for WaistHeight pure functions.
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
  addEventListener(){},querySelectorAll(){return[];},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { whtr, whtrCategory, whr, whrRisk } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 0.005) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

check('whtr ratio', () => {
  near(whtr(80, 160), 0.5);
  near(whtr(85, 178), 0.4775);
  assert.equal(whtr(0, 160), null);
  assert.equal(whtr(80, 0), null);
});

check('whtrCategory boundaries', () => {
  assert.equal(whtrCategory(0.39), 'Slim');
  assert.equal(whtrCategory(0.45), 'Healthy');
  assert.equal(whtrCategory(0.5), 'Increased risk');
  assert.equal(whtrCategory(0.55), 'Increased risk');
  assert.equal(whtrCategory(0.6), 'High risk');
  assert.equal(whtrCategory(0.7), 'High risk');
});

check('whr ratio', () => {
  near(whr(90, 100), 0.9);
  near(whr(85, 98), 0.867, 0.001);
  assert.equal(whr(90, 0), null);
});

check('whrRisk male thresholds', () => {
  assert.equal(whrRisk(0.85, 'male'), 'Low');
  assert.equal(whrRisk(0.9, 'male'), 'Moderate');   // 0.9-1.0
  assert.equal(whrRisk(0.95, 'male'), 'Moderate');
  assert.equal(whrRisk(1.0, 'male'), 'High');
  assert.equal(whrRisk(1.1, 'male'), 'High');
});

check('whrRisk female thresholds', () => {
  assert.equal(whrRisk(0.75, 'female'), 'Low');
  assert.equal(whrRisk(0.8, 'female'), 'Moderate');  // 0.8-0.85
  assert.equal(whrRisk(0.85, 'female'), 'High');
  assert.equal(whrRisk(0.9, 'female'), 'High');
});

check('null propagation', () => {
  assert.equal(whtrCategory(null), null);
  assert.equal(whrRisk(null, 'male'), null);
});

check('worked example: 85/178 healthy', () => {
  const r = whtr(85, 178);
  assert.equal(whtrCategory(r), 'Healthy');
});

check('same-unit independence (cm vs in ratio equal)', () => {
  near(whtr(34, 70), whtr(34 * 2.54, 70 * 2.54));
});

console.log(`\n${n} checks passed.`);
