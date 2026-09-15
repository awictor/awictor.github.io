import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isHex, spinnerCss } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('isHex validates 3- and 6-digit hex', () => {
  assert.ok(isHex('#fff'));
  assert.ok(isHex('#0ea5e9'));
  assert.ok(!isHex('0ea5e9'));
  assert.ok(!isHex('#xyz'));
});

check('spinnerCss composes the values', () => {
  const css = spinnerCss({ size: 40, thickness: 4, color: '#0ea5e9', track: '#e5e7eb', speed: 0.8 });
  assert.ok(css.includes('width: 40px;'));
  assert.ok(css.includes('height: 40px;'));
  assert.ok(css.includes('border: 4px solid #e5e7eb;'));
  assert.ok(css.includes('border-top-color: #0ea5e9;'));
  assert.ok(css.includes('animation: spin 0.8s linear infinite;'));
});

check('spinnerCss always includes the keyframes and circle', () => {
  const css = spinnerCss({});
  assert.ok(css.includes('@keyframes spin {'));
  assert.ok(css.includes('transform: rotate(360deg)'));
  assert.ok(css.includes('border-radius: 50%;'));
});

check('spinnerCss has sensible defaults', () => {
  const css = spinnerCss({});
  assert.ok(css.includes('width: 40px;'));
  assert.ok(css.includes('border-top-color: #0ea5e9;'));
  assert.ok(css.includes('animation: spin 0.8s'));
});

check('custom size/thickness/speed flow through', () => {
  const css = spinnerCss({ size: 80, thickness: 8, speed: 1.5, color: '#ff0000', track: '#000000' });
  assert.ok(css.includes('width: 80px;'));
  assert.ok(css.includes('border: 8px solid #000000;'));
  assert.ok(css.includes('border-top-color: #ff0000;'));
  assert.ok(css.includes('animation: spin 1.5s linear infinite;'));
});

check('spinnerCss rejects invalid colors', () => {
  assert.throws(() => spinnerCss({ color: 'red' }), /invalid hex/);
  assert.throws(() => spinnerCss({ track: 'nope' }), /invalid hex/);
});

check('spinnerCss rejects non-positive numbers', () => {
  assert.throws(() => spinnerCss({ size: 0 }), /must be positive/);
  assert.throws(() => spinnerCss({ thickness: -1 }), /must be positive/);
  assert.throws(() => spinnerCss({ speed: 0 }), /must be positive/);
});

check('3-digit hex colors are accepted', () => {
  const css = spinnerCss({ color: '#f00', track: '#eee' });
  assert.ok(css.includes('border-top-color: #f00;'));
});

check('output is deterministic', () => {
  assert.equal(spinnerCss({ size: 50 }), spinnerCss({ size: 50 }));
});

check('the CSS targets a .spinner class', () => {
  assert.ok(spinnerCss({}).startsWith('.spinner {'));
});

console.log(`\n${n} checks passed.`);
