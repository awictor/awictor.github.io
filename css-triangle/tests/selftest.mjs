import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isHex, triangleCss } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('every triangle has zero width/height', () => {
  const css = triangleCss({ direction: 'up', size: 20, color: '#ff0000' });
  assert.ok(css.includes('width: 0;'));
  assert.ok(css.includes('height: 0;'));
});

check('up: transparent sides, colored bottom border', () => {
  const css = triangleCss({ direction: 'up', size: 20, color: '#ff0000' });
  assert.ok(css.includes('border-left: 20px solid transparent;'));
  assert.ok(css.includes('border-right: 20px solid transparent;'));
  assert.ok(css.includes('border-bottom: 20px solid #ff0000;'));
});

check('down uses a colored top border', () => {
  const css = triangleCss({ direction: 'down', size: 15, color: '#00ff00' });
  assert.ok(css.includes('border-top: 15px solid #00ff00;'));
});

check('left uses a colored right border', () => {
  const css = triangleCss({ direction: 'left', size: 12, color: '#0000ff' });
  assert.ok(css.includes('border-right: 12px solid #0000ff;'));
  assert.ok(css.includes('border-top: 12px solid transparent;'));
});

check('right uses a colored left border', () => {
  const css = triangleCss({ direction: 'right', size: 12, color: '#0000ff' });
  assert.ok(css.includes('border-left: 12px solid #0000ff;'));
});

check('defaults: up, 20px', () => {
  const css = triangleCss({});
  assert.ok(css.includes('border-bottom: 20px solid #ff6100;'));
});

check('rejects invalid color', () => {
  assert.throws(() => triangleCss({ color: 'red' }), /invalid hex/);
});

check('rejects non-positive size', () => {
  assert.throws(() => triangleCss({ size: 0 }), /size must be positive/);
});

check('rejects unknown direction', () => {
  assert.throws(() => triangleCss({ direction: 'diagonal' }), /unknown direction/);
});

check('3-digit hex accepted; output deterministic', () => {
  assert.ok(triangleCss({ color: '#f0f' }).includes('#f0f'));
  assert.equal(triangleCss({ direction: 'up', size: 30 }), triangleCss({ direction: 'up', size: 30 }));
});

console.log(`\n${n} checks passed.`);
