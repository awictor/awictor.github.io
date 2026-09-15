import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { expectedPCO2, pco2Range, interpret } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('expected PaCO2 = 1.5 × HCO3 + 8', () => {
  near(expectedPCO2(24), 44, 1e-9);
  near(expectedPCO2(12), 26, 1e-9);
  near(expectedPCO2(10), 23, 1e-9);
});

check('range is ±2 around expected', () => {
  assert.deepEqual(pco2Range(12), [24, 28]);
  assert.deepEqual(pco2Range(24), [42, 46]);
});

check('appropriate compensation (measured within range)', () => {
  assert.equal(interpret(12, 26), 'appropriate');
  assert.equal(interpret(12, 24), 'appropriate');   // low boundary
  assert.equal(interpret(12, 28), 'appropriate');   // high boundary
});

check('measured below range → concurrent respiratory alkalosis', () => {
  assert.equal(interpret(12, 20), 'respiratory alkalosis');
});

check('measured above range → concurrent respiratory acidosis', () => {
  assert.equal(interpret(12, 34), 'respiratory acidosis');
});

check('just outside boundaries', () => {
  assert.equal(interpret(12, 23.9), 'respiratory alkalosis');
  assert.equal(interpret(12, 28.1), 'respiratory acidosis');
});

check('severe acidosis example (HCO3 6)', () => {
  near(expectedPCO2(6), 17, 1e-9);
  assert.deepEqual(pco2Range(6), [15, 19]);
});

check('normal-ish HCO3 gives ~40 mmHg', () => {
  const r = pco2Range(22);   // expected 41
  assert.ok(r[0] <= 40 && 40 <= r[1]);
});

check('expected rises with HCO3', () => {
  assert.ok(expectedPCO2(20) > expectedPCO2(10));
});

check('validation', () => {
  assert.throws(() => expectedPCO2('x'), /numbers/);
  assert.throws(() => interpret(12, 'y'), /numbers/);
});

console.log(`\n${n} checks passed.`);
