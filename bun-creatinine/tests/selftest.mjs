import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ratio, category, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);

check('ratio = BUN / creatinine', () => {
  near(ratio(15, 1.0), 15);
  near(ratio(28, 1.4), 20);
});

check('normal band 10-20', () => {
  assert.equal(category(15), 'Normal (10–20:1)');
  assert.equal(category(10), 'Normal (10–20:1)');
  assert.equal(category(20), 'Normal (10–20:1)');
});

check('low band below 10', () => {
  assert.equal(category(9.9), 'Low (below 10:1)');
  assert.equal(category(5), 'Low (below 10:1)');
});

check('high band above 20', () => {
  assert.equal(category(20.1), 'High (above 20:1)');
  assert.equal(category(30), 'High (above 20:1)');
});

check('a prerenal (high) example', () => {
  const r = analyze(40, 1.0);
  near(r.ratio, 40);
  assert.equal(r.category, 'High (above 20:1)');
});

check('an intrinsic-renal (low) example', () => {
  const r = analyze(8, 1.6);
  near(r.ratio, 5);
  assert.equal(r.category, 'Low (below 10:1)');
});

check('analyze bundles ratio and category', () => {
  const r = analyze(15, 1);
  near(r.ratio, 15);
  assert.equal(r.category, 'Normal (10–20:1)');
});

check('higher creatinine lowers the ratio', () => {
  assert.ok(ratio(20, 2) < ratio(20, 1));
});

check('ratio is unitless (scales together)', () => {
  near(ratio(30, 2), ratio(15, 1));
});

check('validation: non-positive values throw', () => {
  assert.throws(() => ratio(15, 0), /creatinine must be a positive/);
  assert.throws(() => ratio(0, 1), /BUN must be a positive/);
  assert.throws(() => category('x'), /ratio must be a number/);
});

console.log(`\n${n} checks passed.`);
