// Headless regression tests for TransformGen pure functions.
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
const { TRANSFORMS, buildTransform, withProperty } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('identity config is "none"', () => {
  assert.equal(buildTransform({}), 'none');
  assert.equal(buildTransform({ scaleX: 1, scaleY: 1, rotate: 0 }), 'none');
});

check('single transform with correct unit', () => {
  assert.equal(buildTransform({ translateX: 10 }), 'translateX(10px)');
  assert.equal(buildTransform({ rotate: 45 }), 'rotate(45deg)');
  assert.equal(buildTransform({ scaleX: 1.2 }), 'scaleX(1.2)');
  assert.equal(buildTransform({ skewY: 15 }), 'skewY(15deg)');
});

check('multiple transforms in TRANSFORMS order', () => {
  assert.equal(buildTransform({ translateX: 10, rotate: 45, scaleX: 1.5 }),
    'translateX(10px) rotate(45deg) scaleX(1.5)');
  // insertion order irrelevant; TRANSFORMS order used
  assert.equal(buildTransform({ scaleX: 2, translateY: 5 }),
    'translateY(5px) scaleX(2)');
});

check('identity values are omitted', () => {
  assert.equal(buildTransform({ scaleX: 1, translateX: 20 }), 'translateX(20px)');
  assert.equal(buildTransform({ rotate: 0, scaleX: 1 }), 'none');
});

check('negatives and non-numeric handling', () => {
  assert.equal(buildTransform({ translateX: -30, rotate: -90 }), 'translateX(-30px) rotate(-90deg)');
  assert.equal(buildTransform({ rotate: 'x' }), 'none');
  assert.equal(buildTransform({ translateX: '' }), 'none');
});

check('full stack builds in order', () => {
  assert.equal(
    buildTransform({ translateX: 1, translateY: 2, rotate: 3, scaleX: 1.1, scaleY: 1.2, skewX: 4, skewY: 5 }),
    'translateX(1px) translateY(2px) rotate(3deg) scaleX(1.1) scaleY(1.2) skewX(4deg) skewY(5deg)');
});

check('withProperty wraps output', () => {
  assert.equal(withProperty('rotate(45deg)'), 'transform: rotate(45deg);');
  assert.equal(withProperty('none'), 'transform: none;');
});

check('TRANSFORMS shape', () => {
  assert.equal(TRANSFORMS.length, 7);
  assert.deepEqual(TRANSFORMS.map(t => t[0]),
    ['translateX','translateY','rotate','scaleX','scaleY','skewX','skewY']);
});

console.log(`\n${n} checks passed.`);
