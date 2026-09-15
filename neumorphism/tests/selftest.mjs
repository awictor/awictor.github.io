import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { adjust, neu, hexToRgb, rgbToHex } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('hexToRgb expands 3-digit and parses 6-digit', () => {
  assert.deepEqual(hexToRgb('#fff'), [255, 255, 255]);
  assert.deepEqual(hexToRgb('#808080'), [128, 128, 128]);
  assert.deepEqual(hexToRgb('000000'), [0, 0, 0]);
});

check('rgbToHex clamps and pads', () => {
  assert.equal(rgbToHex(0, 0, 0), '#000000');
  assert.equal(rgbToHex(255, 255, 255), '#ffffff');
  assert.equal(rgbToHex(300, -5, 128), '#ff0080'); // clamps out-of-range
});

check('adjust lightens toward white for positive percent', () => {
  // 128 + (255-128)*0.10 = 140.7 -> 141 = 0x8d
  assert.equal(adjust('#808080', 10), '#8d8d8d');
});

check('adjust darkens toward black for negative percent', () => {
  // 128 * 0.90 = 115.2 -> 115 = 0x73
  assert.equal(adjust('#808080', -10), '#737373');
});

check('adjust 0% is a no-op (round-trip)', () => {
  assert.equal(adjust('#3a7bd5', 0), '#3a7bd5');
});

check('neu produces symmetric light/dark shadow pair', () => {
  const r = neu({ color: '#808080', distance: 20, blur: 40, intensity: 10 });
  assert.equal(r.light, '#8d8d8d');
  assert.equal(r.dark, '#737373');
  assert.equal(r.shadow, '20px 20px 40px #737373, -20px -20px 40px #8d8d8d');
  assert.ok(r.css.includes('box-shadow:'));
  assert.ok(r.css.includes('background: #808080'));
});

check('pressed shape uses inset shadows', () => {
  const r = neu({ color: '#808080', distance: 12, blur: 24, intensity: 10, shape: 'pressed' });
  assert.equal(r.shadow, 'inset 12px 12px 24px #737373, inset -12px -12px 24px #8d8d8d');
});

check('concave/convex swap the gradient direction', () => {
  const cc = neu({ color: '#808080', intensity: 10, shape: 'concave' });
  const cv = neu({ color: '#808080', intensity: 10, shape: 'convex' });
  assert.equal(cc.background, 'linear-gradient(145deg, #737373, #8d8d8d)');
  assert.equal(cv.background, 'linear-gradient(145deg, #8d8d8d, #737373)');
});

check('neu defaults blur to double the distance', () => {
  const r = neu({ color: '#808080', distance: 15 });
  assert.ok(r.shadow.includes('30px'));
});

check('invalid hex is rejected', () => {
  assert.throws(() => hexToRgb('zzz'), /invalid hex/);
  assert.throws(() => neu({ color: 'nope' }), /invalid hex/);
});

console.log(`\n${n} checks passed.`);
