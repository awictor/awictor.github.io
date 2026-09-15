// Headless regression tests for ColorMix — RGB interpolation.
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
  classList:{add(){},remove(){},toggle(){}},
  addEventListener(){},querySelectorAll(){return[];},querySelector(){return null;},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(), querySelector: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { clamp255, hexToRgb, rgbToHex, mixChannel, mix, steps } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('mix — midpoint of black & white is mid-grey', () => {
  assert.equal(mix('#000000', '#ffffff', 0.5), '#808080'); // round(127.5)=128
});

check('mix — endpoints return the inputs', () => {
  assert.equal(mix('#ff0000', '#0000ff', 0), '#ff0000');
  assert.equal(mix('#ff0000', '#0000ff', 1), '#0000ff');
  assert.equal(mix('#ff0000', '#0000ff', 0.5), '#800080');
});

check('mix — t clamped to [0,1]', () => {
  assert.equal(mix('#000000', '#ffffff', -1), '#000000');
  assert.equal(mix('#000000', '#ffffff', 5), '#ffffff');
});

check('mix — accepts 3-digit hex', () => {
  assert.equal(mix('#000', '#fff', 0.5), '#808080');
});

check('mix — invalid input -> null', () => {
  assert.equal(mix('nope', '#fff', 0.5), null);
  assert.equal(mix('#fff', 'zzz', 0.5), null);
});

check('mixChannel rounds', () => {
  assert.equal(mixChannel(0, 255, 0.5), 128);
  assert.equal(mixChannel(0, 100, 0.25), 25);
  assert.equal(mixChannel(10, 10, 0.7), 10);
});

check('steps — endpoints included, correct count', () => {
  assert.deepEqual(steps('#000000', '#ffffff', 3), ['#000000', '#808080', '#ffffff']);
  const five = steps('#000000', '#ffffff', 5);
  assert.equal(five.length, 5);
  assert.equal(five[0], '#000000');
  assert.equal(five[4], '#ffffff');
});

check('steps — n clamped to >= 2', () => {
  assert.deepEqual(steps('#000000', '#ffffff', 1), ['#000000', '#ffffff']);
  assert.deepEqual(steps('#000000', '#ffffff', 0), ['#000000', '#ffffff']);
});

check('steps — monotonic brightness for black->white ramp', () => {
  const pal = steps('#000000', '#ffffff', 6).map(h => hexToRgb(h).r);
  for(let i = 1; i < pal.length; i++) assert.ok(pal[i] >= pal[i - 1]);
});

check('hexToRgb / rgbToHex round-trip', () => {
  assert.equal(rgbToHex(hexToRgb('#3a7bd5')), '#3a7bd5');
  assert.equal(rgbToHex({ r: 300, g: -1, b: 16 }), '#ff0010'); // clamps
});

console.log(`\n${n} checks passed.`);
