import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { rgbToHex, quantize } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('single color image', () => {
  const p = quantize([[255, 0, 0], [255, 0, 0], [255, 0, 0]], 6);
  assert.equal(p.length, 1);
  assert.deepEqual(p[0].color, [255, 0, 0]);
  assert.equal(p[0].count, 3);
});

check('most frequent color comes first', () => {
  const p = quantize([[255, 0, 0], [255, 0, 0], [0, 0, 255]], 6);
  assert.deepEqual(p[0].color, [255, 0, 0]);
  assert.equal(p[0].count, 2);
  assert.deepEqual(p[1].color, [0, 0, 255]);
});

check('k limits the number of colors', () => {
  const px = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0]];
  assert.equal(quantize(px, 2).length, 2);
});

check('near colors merge into one bucket (>>5)', () => {
  // 250 and 255 both map to bucket 7 in the red channel
  const p = quantize([[250, 0, 0], [255, 0, 0]], 6);
  assert.equal(p.length, 1);
  assert.equal(p[0].count, 2);
  assert.deepEqual(p[0].color, [253, 0, 0]);   // average, rounded
});

check('distinct-enough colors stay separate', () => {
  // 0 and 64 → buckets 0 and 2
  assert.equal(quantize([[0, 0, 0], [64, 0, 0]], 6).length, 2);
});

check('empty pixels → empty palette', () => {
  assert.deepEqual(quantize([], 6), []);
});

check('counts sum to pixel count', () => {
  const px = [[10, 10, 10], [200, 200, 200], [10, 10, 10], [90, 90, 90]];
  const total = quantize(px, 12).reduce((s, p) => s + p.count, 0);
  assert.equal(total, 4);
});

check('rgbToHex', () => {
  assert.equal(rgbToHex(255, 0, 0), '#ff0000');
  assert.equal(rgbToHex(0, 128, 255), '#0080ff');
  assert.equal(rgbToHex(255, 255, 255), '#ffffff');
});

check('rgbToHex clamps and rounds', () => {
  assert.equal(rgbToHex(300, -5, 127.6), '#ff0080');
});

check('default k is 6', () => {
  const px = [];
  for (let i = 0; i < 20; i++) px.push([i * 12, 0, 0]);   // many distinct buckets
  assert.equal(quantize(px).length, 6);
});

console.log(`\n${n} checks passed.`);
