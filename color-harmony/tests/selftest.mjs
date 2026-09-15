// Headless regression tests for Harmony pure functions.
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
const { hexToRgb, hexToHsl, hslToHex, rotate, harmony } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('hslToHex exact for pure hues', () => {
  assert.equal(hslToHex(0, 100, 50), '#ff0000');
  assert.equal(hslToHex(120, 100, 50), '#00ff00');
  assert.equal(hslToHex(240, 100, 50), '#0000ff');
  assert.equal(hslToHex(180, 100, 50), '#00ffff');
  assert.equal(hslToHex(0, 0, 100), '#ffffff');
  assert.equal(hslToHex(0, 0, 0), '#000000');
});

check('hslToHex normalizes out-of-range hue', () => {
  assert.equal(hslToHex(360, 100, 50), '#ff0000');
  assert.equal(hslToHex(-120, 100, 50), '#0000ff');   // -120 == 240
  assert.equal(hslToHex(480, 100, 50), '#00ff00');    // 480 == 120
});

check('hexToHsl for primaries and gray', () => {
  assert.deepEqual(hexToHsl('#ff0000'), { h: 0, s: 100, l: 50 });
  assert.deepEqual(hexToHsl('#00ff00'), { h: 120, s: 100, l: 50 });
  assert.deepEqual(hexToHsl('#0000ff'), { h: 240, s: 100, l: 50 });
  const gray = hexToHsl('#808080');
  assert.equal(gray.s, 0);
  assert.equal(hexToHsl('nope'), null);
});

check('hexToRgb supports 3-digit shorthand', () => {
  assert.deepEqual(hexToRgb('#f00'), { r: 255, g: 0, b: 0 });
  assert.deepEqual(hexToRgb('#fff'), { r: 255, g: 255, b: 255 });
  assert.equal(hexToRgb('#12'), null);
});

check('rotate hue', () => {
  assert.equal(rotate('#ff0000', 180), '#00ffff');   // complement of red
  assert.equal(rotate('#ff0000', 120), '#00ff00');
  assert.equal(rotate('#ff0000', 240), '#0000ff');
  assert.equal(rotate('#ff0000', 360), '#ff0000');
});

check('harmony: triadic of red = R, G, B', () => {
  assert.deepEqual(harmony('#ff0000', 'triadic'), ['#ff0000', '#00ff00', '#0000ff']);
});

check('harmony: complementary and split-complementary', () => {
  assert.deepEqual(harmony('#ff0000', 'complementary'), ['#ff0000', '#00ffff']);
  const sc = harmony('#ff0000', 'split-complementary');
  assert.equal(sc.length, 3);
  assert.equal(sc[0], '#ff0000');
});

check('harmony: analogous keeps base in the middle', () => {
  const a = harmony('#ff0000', 'analogous');
  assert.equal(a.length, 3);
  assert.equal(a[1], '#ff0000');
});

check('harmony: tetradic has 4, monochromatic has 5', () => {
  assert.equal(harmony('#ff0000', 'tetradic').length, 4);
  assert.equal(harmony('#3366cc', 'tetradic')[0], hslToHex(hexToHsl('#3366cc').h, hexToHsl('#3366cc').s, hexToHsl('#3366cc').l));
  const mono = harmony('#e11d48', 'monochromatic');
  assert.equal(mono.length, 5);
  // lightness increases across the set
  const ls = mono.map(h => hexToHsl(h).l);
  for(let i = 1; i < ls.length; i++) assert.ok(ls[i] >= ls[i-1]);
});

check('harmony returns null on invalid color', () => {
  assert.equal(harmony('zzz', 'triadic'), null);
});

console.log(`\n${n} checks passed.`);
