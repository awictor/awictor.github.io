// Headless regression tests for ColorBlind — CVD simulation matrices.
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
const { MATRICES, clamp255, hexToRgb, rgbToHex, applyMatrix, simulate, parseColors } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('hexToRgb — 6-digit, 3-digit, with/without #', () => {
  assert.deepEqual(hexToRgb('#ff0000'), { r: 255, g: 0, b: 0 });
  assert.deepEqual(hexToRgb('00ff00'), { r: 0, g: 255, b: 0 });
  assert.deepEqual(hexToRgb('#fff'), { r: 255, g: 255, b: 255 });
  assert.deepEqual(hexToRgb('#123'), { r: 0x11, g: 0x22, b: 0x33 });
  assert.equal(hexToRgb('nope'), null);
  assert.equal(hexToRgb('#12345'), null);
});

check('rgbToHex — pads and clamps', () => {
  assert.equal(rgbToHex({ r: 255, g: 0, b: 0 }), '#ff0000');
  assert.equal(rgbToHex({ r: 0, g: 255, b: 0 }), '#00ff00');
  assert.equal(rgbToHex({ r: 300, g: -5, b: 16 }), '#ff0010'); // clamped
});

check('clamp255 rounds and bounds', () => {
  assert.equal(clamp255(144.585), 145);
  assert.equal(clamp255(-3), 0);
  assert.equal(clamp255(999), 255);
});

check('matrices have rows summing to 1 (so white stays white)', () => {
  Object.keys(MATRICES).forEach(k => {
    MATRICES[k].forEach(row => {
      assert.ok(Math.abs(row[0] + row[1] + row[2] - 1) < 1e-9, k + ' row sum != 1');
    });
  });
});

check('simulate — white and black are invariant', () => {
  ['protanopia', 'deuteranopia', 'tritanopia', 'grayscale'].forEach(t => {
    assert.equal(simulate('#ffffff', t), '#ffffff');
    assert.equal(simulate('#000000', t), '#000000');
  });
});

check('simulate — protanopia on pure red (known matrix result)', () => {
  // r=0.567*255=145, g=0.558*255=142, b=0
  assert.equal(simulate('#ff0000', 'protanopia'), '#918e00');
});

check('simulate — grayscale uses rec601 luma', () => {
  // 0.299*255 = 76.245 -> 76 = 0x4c
  assert.equal(simulate('#ff0000', 'grayscale'), '#4c4c4c');
  // 0.587*255 = 149.685 -> 150 = 0x96
  assert.equal(simulate('#00ff00', 'grayscale'), '#969696');
});

check('simulate — normal / unknown type returns normalized input', () => {
  assert.equal(simulate('#ABCDEF', 'normal'), '#abcdef');
  assert.equal(simulate('#f00', 'normal'), '#ff0000');
  assert.equal(simulate('zzz', 'protanopia'), null); // 'bad' would be valid hex!
});

check('applyMatrix identity leaves color unchanged', () => {
  const I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  assert.deepEqual(applyMatrix({ r: 12, g: 34, b: 56 }, I), { r: 12, g: 34, b: 56 });
});

check('parseColors — extracts & normalizes valid hexes only', () => {
  assert.deepEqual(parseColors('#ff0000 00ff00, #00f\ngarbage #fff'),
    ['#ff0000', '#00ff00', '#0000ff', '#ffffff']);
  assert.deepEqual(parseColors(''), []);
  assert.deepEqual(parseColors('not hex at all'), []);
});

console.log(`\n${n} checks passed.`);
