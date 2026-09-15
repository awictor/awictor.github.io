// Headless regression tests for FilterGen pure functions.
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
  addEventListener(){},querySelectorAll(){return[];},querySelector(){return null;},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { FILTER_DEFS, buildFilter, withProperty } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('all-default config is "none"', () => {
  assert.equal(buildFilter({}), 'none');
  const defs = {}; FILTER_DEFS.forEach(f => defs[f[0]] = f[1]);
  assert.equal(buildFilter(defs), 'none');
});

check('single filter with correct unit', () => {
  assert.equal(buildFilter({ blur: 4 }), 'blur(4px)');
  assert.equal(buildFilter({ 'hue-rotate': 90 }), 'hue-rotate(90deg)');
  assert.equal(buildFilter({ grayscale: 100 }), 'grayscale(100%)');
});

check('multiple filters join in FILTER_DEFS order', () => {
  assert.equal(buildFilter({ brightness: 120, contrast: 90 }), 'brightness(120%) contrast(90%)');
  // sepia comes after blur in the order, regardless of key insertion order
  assert.equal(buildFilter({ sepia: 50, blur: 2 }), 'blur(2px) sepia(50%)');
});

check('values equal to default are omitted', () => {
  assert.equal(buildFilter({ brightness: 100, blur: 3 }), 'blur(3px)');
  assert.equal(buildFilter({ saturate: 100 }), 'none');
});

check('non-numeric / empty values fall back to default (omitted)', () => {
  assert.equal(buildFilter({ blur: 'x' }), 'none');
  assert.equal(buildFilter({ blur: '' }), 'none');
  assert.equal(buildFilter({ blur: null }), 'none');
});

check('full stack builds in order', () => {
  assert.equal(
    buildFilter({ blur: 1, brightness: 110, contrast: 120, grayscale: 20, 'hue-rotate': 45, invert: 10, saturate: 150, sepia: 30 }),
    'blur(1px) brightness(110%) contrast(120%) grayscale(20%) hue-rotate(45deg) invert(10%) saturate(150%) sepia(30%)');
});

check('withProperty wraps output', () => {
  assert.equal(withProperty('blur(4px)'), 'filter: blur(4px);');
  assert.equal(withProperty('none'), 'filter: none;');
});

check('FILTER_DEFS shape', () => {
  assert.equal(FILTER_DEFS.length, 8);
  assert.deepEqual(FILTER_DEFS.map(f => f[0]),
    ['blur','brightness','contrast','grayscale','hue-rotate','invert','saturate','sepia']);
});

console.log(`\n${n} checks passed.`);
