import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { baselineUnit, snap, spacingScale } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('baselineUnit = base × line-height', () => {
  assert.equal(baselineUnit(16, 1.5), 24);
  assert.equal(baselineUnit(18, 1.6), 28.8);
});

check('snap at base size uses one line', () => {
  const s = snap(16, 24);
  assert.equal(s.lines, 1);
  assert.equal(s.px, 24);
  near(s.lineHeight, 1.5);
});

check('snap grows to whole multiples of the unit', () => {
  assert.deepEqual([snap(32, 24).lines, snap(32, 24).px], [2, 48]);   // ceil(32/24)=2
  near(snap(32, 24).lineHeight, 1.5);
  assert.equal(snap(40, 24).lines, 2);                                 // ceil(40/24)=2
  near(snap(40, 24).lineHeight, 48 / 40);                              // 1.2
});

check('exact multiple stays on that many lines', () => {
  const s = snap(48, 24);
  assert.equal(s.lines, 2);          // 48/24 = 2 exactly
  assert.equal(s.px, 48);
  near(s.lineHeight, 1);
});

check('just over a boundary bumps to the next line', () => {
  assert.equal(snap(49, 24).lines, 3);
  assert.equal(snap(49, 24).px, 72);
});

check('tiny sizes still get at least one line', () => {
  const s = snap(10, 24);
  assert.equal(s.lines, 1);
  assert.equal(s.px, 24);
});

check('line box is always ≥ the font size', () => {
  for(const sz of [12, 16, 24, 33, 41, 60, 96]){
    assert.ok(snap(sz, 24).px >= sz);
  }
});

check('spacingScale produces n multiples', () => {
  assert.deepEqual(spacingScale(24, 4), [24, 48, 72, 96]);
  assert.equal(spacingScale(24, 8).length, 8);
});

check('lineHeight relationship: px = size × lineHeight', () => {
  const s = snap(33, 24);
  near(s.px, 33 * s.lineHeight, 1e-9);
});

check('validation', () => {
  assert.throws(() => baselineUnit(0, 1.5), /font size/);
  assert.throws(() => baselineUnit(16, 0), /line-height/);
  assert.throws(() => snap(16, 0), /unit/);
  assert.throws(() => spacingScale(24, 0), /positive integer/);
  assert.throws(() => spacingScale(0, 4), /unit/);
});

console.log(`\n${n} checks passed.`);
