import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hexToRgb, rgbToHex, rgbToHwb, hwbToRgb } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);
const hwbNear = (o, h, w, b) => { near(o.h, h, 0.5); near(o.w, w, 0.5); near(o.b, b, 0.5); };

check('primary colors → HWB (0 white, 0 black)', () => {
  hwbNear(rgbToHwb(255, 0, 0), 0, 0, 0);
  hwbNear(rgbToHwb(0, 255, 0), 120, 0, 0);
  hwbNear(rgbToHwb(0, 0, 255), 240, 0, 0);
});

check('white, black, gray', () => {
  hwbNear(rgbToHwb(255, 255, 255), 0, 100, 0);
  hwbNear(rgbToHwb(0, 0, 0), 0, 0, 100);
  const g = rgbToHwb(128, 128, 128);
  near(g.w, 128 / 255 * 100, 0.5);
  near(g.b, (1 - 128 / 255) * 100, 0.5);
});

check('hwbToRgb: pure hue with no white/black', () => {
  assert.deepEqual(hwbToRgb(0, 0, 0), [255, 0, 0]);
  assert.deepEqual(hwbToRgb(120, 0, 0), [0, 255, 0]);
  assert.deepEqual(hwbToRgb(240, 0, 0), [0, 0, 255]);
});

check('adding whiteness tints toward white', () => {
  assert.deepEqual(hwbToRgb(0, 50, 0), [255, 128, 128]);   // light red
});

check('adding blackness shades toward black', () => {
  assert.deepEqual(hwbToRgb(0, 0, 50), [128, 0, 0]);       // dark red
});

check('W + B ≥ 100% produces gray', () => {
  assert.deepEqual(hwbToRgb(0, 50, 50), [128, 128, 128]);
  assert.deepEqual(hwbToRgb(200, 60, 60), [128, 128, 128]); // 0.6/1.2 = 0.5
});

check('W=100 → white, B=100 → black', () => {
  assert.deepEqual(hwbToRgb(0, 100, 0), [255, 255, 255]);
  assert.deepEqual(hwbToRgb(0, 0, 100), [0, 0, 0]);
});

check('round-trip RGB → HWB → RGB (primaries & mixes)', () => {
  for (const rgb of [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 128, 0]]) {
    const hwb = rgbToHwb(...rgb);
    assert.deepEqual(hwbToRgb(hwb.h, hwb.w, hwb.b), rgb);
  }
});

check('hex helpers', () => {
  assert.deepEqual(hexToRgb('#c026d3'), [192, 38, 211]);
  assert.deepEqual(hexToRgb('#fff'), [255, 255, 255]);
  assert.equal(rgbToHex(192, 38, 211), '#c026d3');
});

check('invalid hex throws', () => {
  assert.throws(() => hexToRgb('#12'), /hex/);
  assert.throws(() => hexToRgb('zzz'), /hex/);
});

console.log(`\n${n} checks passed.`);
