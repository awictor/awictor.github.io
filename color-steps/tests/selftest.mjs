import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hexToRgb, rgbToHex, lerp, colorSteps } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('lerp', () => {
  assert.equal(lerp(0, 10, 0.5), 5);
  assert.equal(lerp(0, 255, 0), 0);
  assert.equal(lerp(0, 255, 1), 255);
});

check('two steps returns the endpoints', () => {
  assert.deepEqual(colorSteps('#000000', '#ffffff', 2), ['#000000', '#ffffff']);
});

check('three steps includes the midpoint', () => {
  assert.deepEqual(colorSteps('#000000', '#ffffff', 3), ['#000000', '#808080', '#ffffff']);
});

check('endpoints are always preserved', () => {
  const s = colorSteps('#ff0000', '#0000ff', 6);
  assert.equal(s[0], '#ff0000');
  assert.equal(s[s.length - 1], '#0000ff');
});

check('length equals the requested step count', () => {
  assert.equal(colorSteps('#123456', '#abcdef', 5).length, 5);
  assert.equal(colorSteps('#123456', '#abcdef', 12).length, 12);
});

check('red → blue midpoint', () => {
  assert.equal(colorSteps('#ff0000', '#0000ff', 3)[1], '#800080');
});

check('reversing endpoints reverses the palette', () => {
  const a = colorSteps('#000000', '#ffffff', 4);
  const b = colorSteps('#ffffff', '#000000', 4);
  assert.deepEqual(a, b.slice().reverse());
});

check('shorthand hex accepted', () => {
  assert.deepEqual(hexToRgb('#f0f'), [255, 0, 255]);
  assert.equal(colorSteps('#000', '#fff', 2)[1], '#ffffff');
});

check('all outputs are valid 6-digit hex', () => {
  colorSteps('#f97316', '#4f46e5', 9).forEach(c => assert.match(c, /^#[0-9a-f]{6}$/));
});

check('validation', () => {
  assert.throws(() => colorSteps('#000', '#fff', 1), /at least 2/);
  assert.throws(() => colorSteps('nope', '#fff', 3), /hex/);
});

console.log(`\n${n} checks passed.`);
