import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pxLineHeight, ratioFromPx, leading, halfLeading, recommend } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);

check('pixel line-height = font size * ratio', () => {
  near(pxLineHeight(16, 1.5), 24);
  near(pxLineHeight(20, 1.4), 28);
});

check('ratio from pixels', () => {
  near(ratioFromPx(16, 24), 1.5);
  near(ratioFromPx(20, 28), 1.4);
});

check('px and ratio round-trip', () => {
  near(ratioFromPx(18, pxLineHeight(18, 1.618)), 1.618);
});

check('leading = line-height px - font size', () => {
  near(leading(16, 24), 8);
  near(leading(20, 28), 8);
});

check('half-leading is half the leading', () => {
  near(halfLeading(16, 24), 4);
  near(leading(16, 24), 2 * halfLeading(16, 24));
});

check('recommend default band 1.4-1.6', () => {
  const r = recommend(16);
  assert.equal(r.minRatio, 1.4);
  assert.equal(r.maxRatio, 1.6);
  near(r.minPx, 22.4);
  near(r.maxPx, 25.6);
});

check('recommend with a custom band', () => {
  const r = recommend(20, 1.2, 1.5);
  near(r.minPx, 24);
  near(r.maxPx, 30);
});

check('larger font gives larger px line-height at the same ratio', () => {
  assert.ok(pxLineHeight(24, 1.5) > pxLineHeight(16, 1.5));
});

check('tighter ratio yields less leading', () => {
  assert.ok(leading(16, pxLineHeight(16, 1.2)) < leading(16, pxLineHeight(16, 1.6)));
});

check('validation: non-positive values and inverted band throw', () => {
  assert.throws(() => pxLineHeight(0, 1.5), /font size must be a positive/);
  assert.throws(() => ratioFromPx(16, 0), /line height must be a positive/);
  assert.throws(() => recommend(16, 1.8, 1.4), /min ratio must not exceed/);
});

console.log(`\n${n} checks passed.`);
