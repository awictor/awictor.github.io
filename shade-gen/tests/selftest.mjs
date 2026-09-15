// Headless regression tests for ShadeGen pure functions.
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
const { hexToRgb, rgbToHex, clampByte, mix, tint, shade, luminance, scale, toCssVars } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('hexToRgb parses 6- and 3-digit hex', () => {
  assert.deepEqual(hexToRgb('#ffffff'), { r:255, g:255, b:255 });
  assert.deepEqual(hexToRgb('000000'), { r:0, g:0, b:0 });
  assert.deepEqual(hexToRgb('#f80'), { r:255, g:136, b:0 });
  assert.deepEqual(hexToRgb('#8b5cf6'), { r:139, g:92, b:246 });
});

check('hexToRgb rejects bad input', () => {
  assert.equal(hexToRgb('#12345'), null);
  assert.equal(hexToRgb('zzzzzz'), null);
  assert.equal(hexToRgb(''), null);
  assert.equal(hexToRgb('#ggg'), null);
});

check('rgbToHex round-trips and clamps', () => {
  assert.equal(rgbToHex({ r:255, g:136, b:0 }), '#ff8800');
  assert.equal(rgbToHex({ r:-5, g:300, b:128 }), '#00ff80');
  assert.equal(rgbToHex(hexToRgb('#8b5cf6')), '#8b5cf6');
});

check('clampByte rounds and bounds', () => {
  assert.equal(clampByte(127.5), 128);
  assert.equal(clampByte(-1), 0);
  assert.equal(clampByte(999), 255);
});

check('mix blends by weight', () => {
  assert.equal(mix('#000000', '#ffffff', 0.5), '#808080');  // 127.5 -> 128
  assert.equal(mix('#ff0000', '#0000ff', 0.5), '#800080');
  assert.equal(mix('#123456', '#123456', 0.5), '#123456');
  assert.equal(mix('#000000', '#ffffff', 0), '#000000');
  assert.equal(mix('#000000', '#ffffff', 1), '#ffffff');
});

check('mix clamps weight to 0..1', () => {
  assert.equal(mix('#000000', '#ffffff', 2), '#ffffff');
  assert.equal(mix('#000000', '#ffffff', -1), '#000000');
});

check('tint lightens, shade darkens', () => {
  assert.equal(tint('#808080', 0.5), '#c0c0c0');   // toward white
  assert.equal(shade('#808080', 0.5), '#404040');  // toward black
  assert.equal(tint('#808080', 0), '#808080');
});

check('luminance ordering: black < gray < white', () => {
  assert.equal(luminance('#000000'), 0);
  assert.ok(Math.abs(luminance('#ffffff') - 1) < 1e-9);
  assert.ok(luminance('#808080') > 0 && luminance('#808080') < 1);
});

check('scale produces 11 steps with base at 500', () => {
  const sc = scale('#8b5cf6');
  const keys = Object.keys(sc).map(Number).sort((a,b)=>a-b);
  assert.deepEqual(keys, [50,100,200,300,400,500,600,700,800,900,950]);
  assert.equal(sc[500], '#8b5cf6');
  assert.equal(scale('nothex'), null);
});

check('scale luminance is monotonically decreasing 50->950', () => {
  const sc = scale('#3b82f6');
  const order = [50,100,200,300,400,500,600,700,800,900,950];
  for(let i = 1; i < order.length; i++){
    assert.ok(luminance(sc[order[i]]) <= luminance(sc[order[i-1]]),
      `step ${order[i]} not darker than ${order[i-1]}`);
  }
});

check('toCssVars emits sorted :root block', () => {
  const css = toCssVars('#8b5cf6', 'brand');
  assert.ok(css.startsWith(':root {'));
  assert.ok(css.includes('--brand-50: '));
  assert.ok(css.includes('--brand-500: #8b5cf6;'));
  assert.ok(css.includes('--brand-950: '));
  assert.ok(css.trim().endsWith('}'));
  // 50 line appears before 500 line
  assert.ok(css.indexOf('--brand-50:') < css.indexOf('--brand-500:'));
  assert.equal(toCssVars('zzz'), null);
});

console.log(`\n${n} checks passed.`);
