import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hexToRgb, rgbToHex, rgbToHsv, hsvToRgb } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);
const hsvNear = (o, h, s, v) => { near(o.h, h, 0.5); near(o.s, s, 0.5); near(o.v, v, 0.5); };

check('primary colors → HSV', () => {
  hsvNear(rgbToHsv(255, 0, 0), 0, 100, 100);
  hsvNear(rgbToHsv(0, 255, 0), 120, 100, 100);
  hsvNear(rgbToHsv(0, 0, 255), 240, 100, 100);
});

check('secondary colors → HSV', () => {
  hsvNear(rgbToHsv(255, 255, 0), 60, 100, 100);   // yellow
  hsvNear(rgbToHsv(0, 255, 255), 180, 100, 100);  // cyan
  hsvNear(rgbToHsv(255, 0, 255), 300, 100, 100);  // magenta
});

check('white, black, and gray', () => {
  hsvNear(rgbToHsv(255, 255, 255), 0, 0, 100);   // white: s=0, v=100
  hsvNear(rgbToHsv(0, 0, 0), 0, 0, 0);           // black
  const g = rgbToHsv(128, 128, 128);
  near(g.s, 0, 0.5); near(g.v, 128 / 255 * 100, 0.5);
});

check('hsvToRgb inverts primaries', () => {
  assert.deepEqual(hsvToRgb(0, 100, 100), [255, 0, 0]);
  assert.deepEqual(hsvToRgb(120, 100, 100), [0, 255, 0]);
  assert.deepEqual(hsvToRgb(240, 100, 100), [0, 0, 255]);
});

check('hsvToRgb: white and black', () => {
  assert.deepEqual(hsvToRgb(0, 0, 100), [255, 255, 255]);
  assert.deepEqual(hsvToRgb(0, 0, 0), [0, 0, 0]);
});

check('round-trip RGB → HSV → RGB', () => {
  for (const rgb of [[124, 58, 237], [10, 200, 90], [33, 33, 33], [250, 128, 64], [200, 0, 100]]) {
    const hsv = rgbToHsv(...rgb);
    assert.deepEqual(hsvToRgb(hsv.h, hsv.s, hsv.v), rgb);
  }
});

check('hue wraps and saturation/value clamp', () => {
  assert.deepEqual(hsvToRgb(360, 100, 100), hsvToRgb(0, 100, 100));
  assert.deepEqual(hsvToRgb(0, 150, 100), hsvToRgb(0, 100, 100)); // s clamp
});

check('lowering value darkens toward black', () => {
  assert.deepEqual(hsvToRgb(0, 100, 50), [128, 0, 0]);
});

check('hex helpers', () => {
  assert.deepEqual(hexToRgb('#7c3aed'), [124, 58, 237]);
  assert.deepEqual(hexToRgb('#fff'), [255, 255, 255]);
  assert.equal(rgbToHex(124, 58, 237), '#7c3aed');
});

check('invalid hex throws', () => {
  assert.throws(() => hexToRgb('#12'), /hex/);
  assert.throws(() => hexToRgb('zzz'), /hex/);
});

console.log(`\n${n} checks passed.`);
