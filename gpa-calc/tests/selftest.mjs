// Headless regression tests for GPACalc pure functions.
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
const { gradePoints, gpa, standing } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-4) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

check('gradePoints scale', () => {
  assert.equal(gradePoints('A'), 4.0);
  assert.equal(gradePoints('A+'), 4.0);
  assert.equal(gradePoints('A-'), 3.7);
  assert.equal(gradePoints('B+'), 3.3);
  assert.equal(gradePoints('C'), 2.0);
  assert.equal(gradePoints('F'), 0.0);
  assert.equal(gradePoints('a-'), 3.7);   // case-insensitive
  assert.equal(gradePoints('Z'), null);
});

check('gpa credit-weighted', () => {
  const r = gpa([{ credits: 3, grade: 'A' }, { credits: 4, grade: 'B' }]);
  near(r.gpa, 24 / 7);          // (4*3 + 3*4) / 7 = 3.4286
  assert.equal(r.credits, 7);
});

check('gpa all-A is 4.0', () => {
  near(gpa([{ credits: 3, grade: 'A' }, { credits: 3, grade: 'A' }]).gpa, 4.0);
});

check('gpa mixed +/- grades', () => {
  const r = gpa([{ credits: 4, grade: 'A' }, { credits: 3, grade: 'B+' }, { credits: 4, grade: 'A-' }]);
  // (4*4 + 3.3*3 + 3.7*4) / 11 = (16 + 9.9 + 14.8)/11 = 40.7/11
  near(r.gpa, 40.7 / 11);
  assert.equal(r.credits, 11);
});

check('gpa ignores invalid rows', () => {
  const r = gpa([{ credits: 3, grade: 'A' }, { credits: 0, grade: 'F' }, { credits: 4, grade: '' }, { credits: 'x', grade: 'B' }]);
  near(r.gpa, 4.0);            // only the first valid course counts
  assert.equal(r.credits, 3);
});

check('gpa returns null with no valid credits', () => {
  assert.equal(gpa([]), null);
  assert.equal(gpa([{ credits: 0, grade: 'A' }]), null);
  assert.equal(gpa([{ credits: 3, grade: 'Z' }]), null);
});

check('standing classification', () => {
  assert.equal(standing(3.9), "Dean's List");
  assert.equal(standing(3.5), "Dean's List");
  assert.equal(standing(3.0), 'Good standing');
  assert.equal(standing(2.0), 'Good standing');
  assert.equal(standing(1.5), 'Below 2.0 — at risk');
  assert.equal(standing(null), null);
});

check('single course GPA equals its grade points', () => {
  near(gpa([{ credits: 5, grade: 'B-' }]).gpa, 2.7);
});

console.log(`\n${n} checks passed.`);
