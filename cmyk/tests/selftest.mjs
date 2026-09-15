import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hexToRgb, rgbToHex, rgbToCmyk, cmykToRgb, totalInk } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('white → all zero CMYK', () => {
  assert.deepEqual(rgbToCmyk(255, 255, 255), { c: 0, m: 0, y: 0, k: 0 });
});

check('black → K=100, no CMY', () => {
  assert.deepEqual(rgbToCmyk(0, 0, 0), { c: 0, m: 0, y: 0, k: 100 });
});

check('pure red → M and Y at 100, no C or K', () => {
  const cmyk = rgbToCmyk(255, 0, 0);
  near(cmyk.c, 0, 1e-9); near(cmyk.m, 100, 1e-9); near(cmyk.y, 100, 1e-9); near(cmyk.k, 0, 1e-9);
});

check('pure green and blue', () => {
  const g = rgbToCmyk(0, 255, 0);
  near(g.c, 100, 1e-9); near(g.m, 0, 1e-9); near(g.y, 100, 1e-9); near(g.k, 0, 1e-9);
  const b = rgbToCmyk(0, 0, 255);
  near(b.c, 100, 1e-9); near(b.m, 100, 1e-9); near(b.y, 0, 1e-9); near(b.k, 0, 1e-9);
});

check('mid-gray → only K', () => {
  const cmyk = rgbToCmyk(128, 128, 128);
  near(cmyk.c, 0, 1e-9); near(cmyk.m, 0, 1e-9); near(cmyk.y, 0, 1e-9);
  near(cmyk.k, (1 - 128 / 255) * 100, 1e-9);
});

check('cmykToRgb inverts on pure colors', () => {
  assert.deepEqual(cmykToRgb(0, 100, 100, 0), [255, 0, 0]);
  assert.deepEqual(cmykToRgb(100, 0, 100, 0), [0, 255, 0]);
  assert.deepEqual(cmykToRgb(0, 0, 0, 0), [255, 255, 255]);
  assert.deepEqual(cmykToRgb(0, 0, 0, 100), [0, 0, 0]);
});

check('round-trip RGB → CMYK → RGB', () => {
  for (const rgb of [[147, 51, 234], [10, 200, 90], [33, 33, 33], [250, 128, 64]]) {
    const cmyk = rgbToCmyk(...rgb);
    assert.deepEqual(cmykToRgb(cmyk.c, cmyk.m, cmyk.y, cmyk.k), rgb);
  }
});

check('hex helpers', () => {
  assert.deepEqual(hexToRgb('#ffffff'), [255, 255, 255]);
  assert.deepEqual(hexToRgb('#000'), [0, 0, 0]);
  assert.deepEqual(hexToRgb('#9333ea'), [147, 51, 234]);
  assert.equal(rgbToHex(147, 51, 234), '#9333ea');
  assert.equal(rgbToHex(255, 255, 255), '#ffffff');
});

check('total ink coverage', () => {
  assert.equal(totalInk({ c: 0, m: 0, y: 0, k: 0 }), 0);       // white
  assert.equal(totalInk({ c: 0, m: 0, y: 0, k: 100 }), 100);   // black
  near(totalInk(rgbToCmyk(255, 0, 0)), 200, 1e-9);             // red = M+Y
});

check('invalid hex throws', () => {
  assert.throws(() => hexToRgb('#12'), /hex/);
  assert.throws(() => hexToRgb('nope'), /hex/);
});

console.log(`\n${n} checks passed.`);
