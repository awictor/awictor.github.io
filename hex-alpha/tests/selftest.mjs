import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { opacityToHex, hexToOpacity, normalizeHex6, withAlpha, toRgba } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('opacity → hex alpha endpoints', () => {
  assert.equal(opacityToHex(100), 'ff');
  assert.equal(opacityToHex(0), '00');
});

check('opacity → hex alpha midpoints (rounded)', () => {
  assert.equal(opacityToHex(50), '80');   // round(127.5) = 128
  assert.equal(opacityToHex(75), 'bf');   // round(191.25) = 191
  assert.equal(opacityToHex(25), '40');   // round(63.75) = 64
});

check('hex alpha → opacity', () => {
  assert.equal(hexToOpacity('ff'), 100);
  assert.equal(hexToOpacity('00'), 0);
  near(hexToOpacity('80'), 50.196, 1e-2);
});

check('round-trips within rounding', () => {
  for(const p of [0, 10, 25, 50, 75, 100]){
    near(Math.round(hexToOpacity(opacityToHex(p))), p, 0.6);
  }
});

check('normalizeHex6 handles # and shorthand', () => {
  assert.equal(normalizeHex6('#FF0000'), '#ff0000');
  assert.equal(normalizeHex6('f00'), '#ff0000');
  assert.equal(normalizeHex6('00ff00'), '#00ff00');
});

check('withAlpha builds #RRGGBBAA', () => {
  assert.equal(withAlpha('#ff0000', 50), '#ff000080');
  assert.equal(withAlpha('#ff0000', 100), '#ff0000ff');
  assert.equal(withAlpha('#123456', 0), '#12345600');
});

check('toRgba builds rgba()', () => {
  assert.equal(toRgba('#ff0000', 50), 'rgba(255, 0, 0, 0.5)');
  assert.equal(toRgba('#00ff00', 100), 'rgba(0, 255, 0, 1)');
  assert.equal(toRgba('#0000ff', 0), 'rgba(0, 0, 255, 0)');
});

check('withAlpha length is always 9 chars', () => {
  for(const p of [0, 33, 66, 100]) assert.equal(withAlpha('#abcdef', p).length, 9);
});

check('validation: opacity range', () => {
  assert.throws(() => opacityToHex(-1), /0–100/);
  assert.throws(() => opacityToHex(101), /0–100/);
  assert.throws(() => hexToOpacity('zz'), /2 hex digits/);
});

check('validation: hex color', () => {
  assert.throws(() => normalizeHex6('nope'), /6-digit hex/);
  assert.throws(() => withAlpha('12345', 50), /6-digit hex/);
});

console.log(`\n${n} checks passed.`);
