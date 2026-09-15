// Headless regression tests for ShadowGen pure functions.
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
const { px, shadowLayer, boxShadow, withProperty } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('px formats numbers and defaults bad input to 0', () => {
  assert.equal(px(4), '4px');
  assert.equal(px(-8), '-8px');
  assert.equal(px('x'), '0px');
  assert.equal(px(0), '0px');
});

check('shadowLayer full spec', () => {
  assert.equal(shadowLayer({ x:0, y:4, blur:6, spread:0, color:'#0003' }),
    '0px 4px 6px 0px #0003');
});

check('shadowLayer inset prefix', () => {
  assert.equal(shadowLayer({ inset:true, x:0, y:2, blur:4, spread:0, color:'#000' }),
    'inset 0px 2px 4px 0px #000');
});

check('shadowLayer defaults (missing fields -> 0 and default color)', () => {
  assert.equal(shadowLayer({}), '0px 0px 0px 0px rgba(0,0,0,0.2)');
  assert.equal(shadowLayer({ x:5, y:5 }), '5px 5px 0px 0px rgba(0,0,0,0.2)');
});

check('boxShadow joins layers with ", "', () => {
  const layers = [
    { x:0, y:1, blur:2, spread:0, color:'#000' },
    { x:0, y:4, blur:8, spread:-2, color:'#0005' }
  ];
  assert.equal(boxShadow(layers),
    '0px 1px 2px 0px #000, 0px 4px 8px -2px #0005');
});

check('boxShadow empty -> none', () => {
  assert.equal(boxShadow([]), 'none');
  assert.equal(boxShadow(null), 'none');
});

check('withProperty wraps output', () => {
  assert.equal(withProperty('0px 4px 6px 0px #000'), 'box-shadow: 0px 4px 6px 0px #000;');
  assert.equal(withProperty('none'), 'box-shadow: none;');
});

check('negative spread and offsets render correctly', () => {
  assert.equal(shadowLayer({ x:-3, y:-6, blur:10, spread:-4, color:'red' }),
    '-3px -6px 10px -4px red');
});

console.log(`\n${n} checks passed.`);
