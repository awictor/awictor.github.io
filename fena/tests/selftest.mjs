import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { feNa, feUrea, interpretFeNa, interpretFeUrea } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('FENa formula', () => {
  // (UNa 20 × PCr 1) / (PNa 140 × UCr 50) × 100 = 0.2857%
  near(feNa(20, 1, 140, 50), 20 / 7000 * 100, 1e-9);
});

check('prerenal example (<1%)', () => {
  assert.ok(feNa(20, 1, 140, 50) < 1);
});

check('intrinsic example (>2%)', () => {
  // (80×2)/(140×40)×100 = 2.857%
  near(feNa(80, 2, 140, 40), 160 / 5600 * 100, 1e-9);
  assert.ok(feNa(80, 2, 140, 40) > 2);
});

check('FENa interpretation', () => {
  assert.equal(interpretFeNa(0.5), 'prerenal');
  assert.equal(interpretFeNa(1.5), 'indeterminate');
  assert.equal(interpretFeNa(3), 'intrinsic');
});

check('FENa interpretation boundaries', () => {
  assert.equal(interpretFeNa(0.99), 'prerenal');
  assert.equal(interpretFeNa(1), 'indeterminate');
  assert.equal(interpretFeNa(2), 'indeterminate');
  assert.equal(interpretFeNa(2.01), 'intrinsic');
});

check('FEUrea formula', () => {
  near(feUrea(300, 2, 40, 50), (300 * 2) / (40 * 50) * 100, 1e-9);   // 30%
});

check('FEUrea interpretation (<35% prerenal)', () => {
  assert.equal(interpretFeUrea(30), 'prerenal');
  assert.equal(interpretFeUrea(50), 'intrinsic');
  assert.equal(interpretFeUrea(35), 'intrinsic');   // boundary: not <35
});

check('higher urine sodium raises FENa', () => {
  assert.ok(feNa(60, 1, 140, 50) > feNa(20, 1, 140, 50));
});

check('shared formula: FENa and FEUrea use the same fe()', () => {
  near(feNa(40, 2, 140, 50), feUrea(40, 2, 140, 50), 1e-12);
});

check('validation', () => {
  assert.throws(() => feNa(20, 1, 0, 50), /positive/);
  assert.throws(() => feNa(20, 1, 140, 0), /positive/);
  assert.throws(() => feNa('x', 1, 140, 50), /numbers/);
});

console.log(`\n${n} checks passed.`);
