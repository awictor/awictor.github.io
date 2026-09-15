// Headless regression tests for A1C pure functions (vs ADA table).
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
const { a1cToEagMgdl, a1cToEagMmol, eagMgdlToA1c, mgdlToMmol, mmolToMgdl, a1cCategory, convert } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 0.5) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

check('a1cToEagMgdl matches ADA table', () => {
  near(a1cToEagMgdl(6), 126, 0.6);   // 125.5
  near(a1cToEagMgdl(7), 154, 0.6);   // 154.2
  near(a1cToEagMgdl(8), 183, 0.6);   // 182.9
  near(a1cToEagMgdl(5), 97, 0.6);    // 96.8
});

check('a1cToEagMmol', () => {
  near(a1cToEagMmol(7), 8.54, 0.05);
  near(a1cToEagMmol(6), 6.95, 0.05);
});

check('eagMgdlToA1c is inverse of a1cToEagMgdl', () => {
  near(eagMgdlToA1c(a1cToEagMgdl(6.5)), 6.5, 1e-9);
  near(eagMgdlToA1c(154.2), 7, 0.01);
});

check('mg/dL <-> mmol/L', () => {
  near(mgdlToMmol(180), 9.99, 0.02);
  near(mmolToMgdl(10), 180.18, 0.02);
  near(mgdlToMmol(mmolToMgdl(7.5)), 7.5, 1e-9);
});

check('a1cCategory ADA cutoffs', () => {
  assert.equal(a1cCategory(5.0), 'Normal');
  assert.equal(a1cCategory(5.6), 'Normal');
  assert.equal(a1cCategory(5.7), 'Prediabetes');
  assert.equal(a1cCategory(6.4), 'Prediabetes');
  assert.equal(a1cCategory(6.5), 'Diabetes');
  assert.equal(a1cCategory(9), 'Diabetes');
});

check('convert from A1C', () => {
  const r = convert(7, 'a1c');
  near(r.a1c, 7); near(r.mgdl, 154.2, 0.1); near(r.mmol, 8.54, 0.05);
  assert.equal(r.category, 'Diabetes');
});

check('convert from mg/dL back to A1C', () => {
  const r = convert(154.2, 'mgdl');
  near(r.a1c, 7, 0.01);
  assert.equal(r.category, 'Diabetes');
});

check('convert from mmol/L', () => {
  const r = convert(8.54, 'mmol');
  near(r.a1c, 7, 0.05);
});

check('convert guards bad/negative input', () => {
  assert.equal(convert('abc', 'a1c'), null);
  assert.equal(convert(-1, 'a1c'), null);
});

console.log(`\n${n} checks passed.`);
