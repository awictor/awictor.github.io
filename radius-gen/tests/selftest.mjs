// Headless regression tests for RadiusGen pure functions.
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
const { buildRadius, withProperty } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('all corners equal collapses to a single value', () => {
  assert.equal(buildRadius({ tl: 10, tr: 10, br: 10, bl: 10 }), '10px');
  assert.equal(buildRadius({ tl: 0, tr: 0, br: 0, bl: 0 }), '0px');
});

check('distinct corners produce four values in TL TR BR BL order', () => {
  assert.equal(buildRadius({ tl: 10, tr: 20, br: 30, bl: 40 }), '10px 20px 30px 40px');
  assert.equal(buildRadius({ tl: 10, tr: 0, br: 10, bl: 0 }), '10px 0px 10px 0px');
});

check('percent unit', () => {
  assert.equal(buildRadius({ tl: 50, tr: 50, br: 50, bl: 50 }, '%'), '50%');
  assert.equal(buildRadius({ tl: 10, tr: 20, br: 30, bl: 40 }, '%'), '10% 20% 30% 40%');
});

check('non-numeric corner falls back to 0', () => {
  assert.equal(buildRadius({ tl: 'x', tr: 5, br: 5, bl: 5 }), '0px 5px 5px 5px');
  assert.equal(buildRadius({}), '0px');
});

check('circle preset (all 50%) collapses', () => {
  assert.equal(buildRadius({ tl: 50, tr: 50, br: 50, bl: 50 }, '%'), '50%');
});

check('withProperty wraps output', () => {
  assert.equal(withProperty('10px'), 'border-radius: 10px;');
  assert.equal(withProperty('10px 20px 30px 40px'), 'border-radius: 10px 20px 30px 40px;');
});

check('three-equal-one-different does NOT collapse', () => {
  assert.equal(buildRadius({ tl: 10, tr: 10, br: 10, bl: 20 }), '10px 10px 10px 20px');
});

console.log(`\n${n} checks passed.`);
