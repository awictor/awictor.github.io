import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { kelvinToRgb, toHex } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('channels are integers in 0–255', () => {
  for(const k of [1000, 2700, 5500, 6500, 10000, 40000]){
    const { r, g, b } = kelvinToRgb(k);
    for(const v of [r, g, b]){ assert.ok(Number.isInteger(v) && v >= 0 && v <= 255); }
  }
});

check('~6600K is near white', () => {
  const c = kelvinToRgb(6600);
  assert.equal(c.r, 255);
  assert.equal(c.b, 255);
  assert.ok(c.g >= 250);
});

check('warm temperatures are reddish (R maxed, low B)', () => {
  const c = kelvinToRgb(1500);
  assert.equal(c.r, 255);
  assert.equal(c.b, 0);
});

check('cool temperatures are bluish (B maxed, R reduced)', () => {
  const c = kelvinToRgb(15000);
  assert.equal(c.b, 255);
  assert.ok(c.r < 255);
});

check('red is 255 at or below ~6600K', () => {
  for(const k of [1000, 3000, 5000, 6600]) assert.equal(kelvinToRgb(k).r, 255);
});

check('blue is 255 at or above ~6600K', () => {
  for(const k of [6600, 8000, 20000]) assert.equal(kelvinToRgb(k).b, 255);
});

check('red decreases as temperature rises above 6600K', () => {
  assert.ok(kelvinToRgb(8000).r > kelvinToRgb(20000).r);
});

check('blue increases with temperature below 6600K', () => {
  assert.ok(kelvinToRgb(2500).b < kelvinToRgb(4000).b);
});

check('input is clamped to the valid range', () => {
  assert.deepEqual(kelvinToRgb(500), kelvinToRgb(1000));
  assert.deepEqual(kelvinToRgb(99999), kelvinToRgb(40000));
});

check('toHex and validation', () => {
  assert.match(toHex(kelvinToRgb(5500)), /^#[0-9a-f]{6}$/);
  assert.equal(toHex(kelvinToRgb(6600)), '#ffffff');
  assert.throws(() => kelvinToRgb('warm'), /Kelvin/);
});

console.log(`\n${n} checks passed.`);
