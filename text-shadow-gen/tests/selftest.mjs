// Headless regression tests for TextShadowGen pure functions.
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
const { px, textShadowLayer, textShadow, withProperty } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('px formats and defaults bad input to 0', () => {
  assert.equal(px(2), '2px');
  assert.equal(px(-8), '-8px');
  assert.equal(px('x'), '0px');
});

check('textShadowLayer full spec (no spread/inset)', () => {
  assert.equal(textShadowLayer({ x: 2, y: 2, blur: 4, color: '#000' }), '2px 2px 4px #000');
  assert.equal(textShadowLayer({ x: -1, y: -1, blur: 0, color: 'red' }), '-1px -1px 0px red');
});

check('textShadowLayer defaults', () => {
  assert.equal(textShadowLayer({}), '0px 0px 0px rgba(0,0,0,0.3)');
  assert.equal(textShadowLayer({ x: 3, y: 3 }), '3px 3px 0px rgba(0,0,0,0.3)');
});

check('textShadow joins layers with ", "', () => {
  const layers = [{ x: 1, y: 1, blur: 2, color: '#000' }, { x: -1, y: -1, blur: 3, color: '#0af' }];
  assert.equal(textShadow(layers), '1px 1px 2px #000, -1px -1px 3px #0af');
});

check('textShadow empty -> none', () => {
  assert.equal(textShadow([]), 'none');
  assert.equal(textShadow(null), 'none');
});

check('withProperty wraps', () => {
  assert.equal(withProperty('2px 2px 4px #000'), 'text-shadow: 2px 2px 4px #000;');
  assert.equal(withProperty('none'), 'text-shadow: none;');
});

check('single glow-style layer', () => {
  assert.equal(textShadow([{ x: 0, y: 0, blur: 10, color: '#0ff' }]), '0px 0px 10px #0ff');
});

console.log(`\n${n} checks passed.`);
