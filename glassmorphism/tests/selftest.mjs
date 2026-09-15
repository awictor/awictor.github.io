import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hexToRgb, rgba, glass } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('hexToRgb expands 3-digit and parses 6-digit', () => {
  assert.deepEqual(hexToRgb('#fff'), [255, 255, 255]);
  assert.deepEqual(hexToRgb('#3a7bd5'), [58, 123, 213]);
});

check('rgba composes and clamps alpha', () => {
  assert.equal(rgba('#ffffff', 0.25), 'rgba(255, 255, 255, 0.25)');
  assert.equal(rgba('#3a7bd5', 0.5), 'rgba(58, 123, 213, 0.5)');
  assert.equal(rgba('#000000', 2), 'rgba(0, 0, 0, 1)');   // clamps high
  assert.equal(rgba('#000000', -1), 'rgba(0, 0, 0, 0)');  // clamps low
});

check('glass uses tint + opacity for the background', () => {
  const g = glass({ color: '#ffffff', opacity: 0.2, blur: 10, radius: 16 });
  assert.equal(g.background, 'rgba(255, 255, 255, 0.2)');
});

check('glass CSS includes both backdrop-filter prefixes', () => {
  const g = glass({ blur: 12 });
  assert.ok(g.css.includes('backdrop-filter: blur(12px);'));
  assert.ok(g.css.includes('-webkit-backdrop-filter: blur(12px);'));
});

check('glass applies radius and a white translucent border', () => {
  const g = glass({ radius: 24, borderOpacity: 0.3 });
  assert.ok(g.css.includes('border-radius: 24px;'));
  assert.equal(g.border, '1px solid rgba(255, 255, 255, 0.3)');
});

check('glass has sensible defaults', () => {
  const g = glass();
  assert.equal(g.background, 'rgba(255, 255, 255, 0.2)');
  assert.equal(g.blur, 10);
  assert.equal(g.radius, 16);
  assert.ok(g.css.includes('box-shadow:'));
});

check('glass border opacity clamps', () => {
  const g = glass({ borderOpacity: 5 });
  assert.equal(g.border, '1px solid rgba(255, 255, 255, 1)');
});

check('invalid hex is rejected', () => {
  assert.throws(() => hexToRgb('zzz'), /invalid hex/);
  assert.throws(() => rgba('nope', 0.5), /invalid hex/);
  assert.throws(() => glass({ color: 'bad!' }), /invalid hex/);
});

check('a 3-digit tint round-trips through glass', () => {
  const g = glass({ color: '#abc', opacity: 0.4 });
  assert.equal(g.background, 'rgba(170, 187, 204, 0.4)');
});

check('zero blur and zero radius are represented literally', () => {
  const g = glass({ blur: 0, radius: 0 });
  assert.ok(g.css.includes('blur(0px)'));
  assert.ok(g.css.includes('border-radius: 0px;'));
});

console.log(`\n${n} checks passed.`);
