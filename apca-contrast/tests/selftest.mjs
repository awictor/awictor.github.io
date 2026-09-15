import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hexToRgb, sRGBtoY, apcaContrast, apcaLevel } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('hexToRgb parses #RRGGBB and #RGB', () => {
  assert.deepEqual(hexToRgb('#ffffff'), [255, 255, 255]);
  assert.deepEqual(hexToRgb('#000000'), [0, 0, 0]);
  assert.deepEqual(hexToRgb('#FF0000'), [255, 0, 0]);
  assert.deepEqual(hexToRgb('#fff'), [255, 255, 255]);
  assert.deepEqual(hexToRgb('abc'), [0xaa, 0xbb, 0xcc]);
});

check('sRGBtoY: white ≈ 1, black = 0', () => {
  near(sRGBtoY([255, 255, 255]), 1, 1e-6);
  assert.equal(sRGBtoY([0, 0, 0]), 0);
});

check('black text on white ≈ +106 Lc', () => {
  near(apcaContrast('#000000', '#ffffff'), 106.04, 0.1);
});

check('white text on black ≈ -108 Lc (reverse polarity)', () => {
  near(apcaContrast('#ffffff', '#000000'), -107.88, 0.2);
});

check('APCA is asymmetric (polarity matters)', () => {
  const bow = apcaContrast('#000000', '#ffffff');
  const wob = apcaContrast('#ffffff', '#000000');
  assert.ok(bow > 0 && wob < 0);
  assert.ok(Math.abs(Math.abs(bow) - Math.abs(wob)) > 1);  // not mirror images
});

check('identical colors give 0 Lc', () => {
  assert.equal(apcaContrast('#3a3a3a', '#3a3a3a'), 0);
  assert.equal(apcaContrast('#ffffff', '#ffffff'), 0);
});

check('darker text on white yields higher |Lc| than mid-gray', () => {
  assert.ok(apcaContrast('#000000', '#ffffff') > apcaContrast('#767676', '#ffffff'));
  assert.ok(apcaContrast('#767676', '#ffffff') > 0);
});

check('very low contrast clips toward 0', () => {
  const lc = apcaContrast('#f8f8f8', '#ffffff');
  assert.ok(Math.abs(lc) < 15);
});

check('apcaLevel tiers', () => {
  assert.equal(apcaLevel(106).tier, 'Best');
  assert.equal(apcaLevel(-108).tier, 'Best');   // uses absolute value
  assert.equal(apcaLevel(80).tier, 'Good');
  assert.equal(apcaLevel(50).tier, 'Large only');
  assert.equal(apcaLevel(35).tier, 'Minimum');
  assert.equal(apcaLevel(5).tier, 'Invisible');
});

check('invalid hex throws', () => {
  assert.throws(() => hexToRgb('#12'), /hex/);
  assert.throws(() => hexToRgb('nothex!'), /hex/);
  assert.throws(() => apcaContrast('zzz', '#fff'), /hex/);
});

console.log(`\n${n} checks passed.`);
