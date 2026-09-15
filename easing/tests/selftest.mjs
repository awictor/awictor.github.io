// Headless regression tests for Easing pure functions.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'0',textContent:'',innerHTML:'',style:{},className:'',offsetWidth:0,
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
const { bezier, sample, trim, cssTimingFunction } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-3) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

check('endpoints are always 0 and 1', () => {
  const f = bezier(0.42, 0, 0.58, 1);
  near(f(0), 0);
  near(f(1), 1);
  const g = bezier(0.68, -0.55, 0.27, 1.55);
  near(g(0), 0);
  near(g(1), 1);
});

check('linear cubic-bezier(0,0,1,1) is identity', () => {
  const f = bezier(0, 0, 1, 1);
  near(f(0.25), 0.25);
  near(f(0.5), 0.5);
  near(f(0.75), 0.75);
});

check('symmetric ease-in-out passes through (0.5, 0.5)', () => {
  const f = bezier(0.42, 0, 0.58, 1);
  near(f(0.5), 0.5, 2e-3);
});

check('ease-in accelerates: f(0.5) < 0.5', () => {
  const f = bezier(0.42, 0, 1, 1);
  assert.ok(f(0.5) < 0.5);
});

check('ease-out decelerates: f(0.5) > 0.5', () => {
  const f = bezier(0, 0, 0.58, 1);
  assert.ok(f(0.5) > 0.5);
});

check('easing is monotonic in x for standard curves', () => {
  const f = bezier(0.25, 0.1, 0.25, 1);
  let prev = -1;
  for(let i = 0; i <= 20; i++){ const y = f(i / 20); assert.ok(y >= prev - 1e-9); prev = y; }
});

check('sample returns n+1 points spanning 0..1', () => {
  const pts = sample(bezier(0, 0, 1, 1), 10);
  assert.equal(pts.length, 11);
  assert.equal(pts[0].x, 0);
  assert.equal(pts[10].x, 1);
  near(pts[5].y, 0.5);
});

check('trim and cssTimingFunction formatting', () => {
  assert.equal(trim(0.25), '0.25');
  assert.equal(trim(1), '1');
  assert.equal(trim(0.1), '0.1');
  assert.equal(trim(-0.55), '-0.55');
  assert.equal(cssTimingFunction(0.25, 0.1, 0.25, 1), 'cubic-bezier(0.25, 0.1, 0.25, 1)');
  assert.equal(cssTimingFunction(0.68, -0.55, 0.27, 1.55), 'cubic-bezier(0.68, -0.55, 0.27, 1.55)');
});

console.log(`\n${n} checks passed.`);
