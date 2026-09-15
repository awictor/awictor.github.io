import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { wilksCoefficient, wilksScore, lbToKg } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('known coefficient: 100 kg male ≈ 0.6086', () => {
  near(wilksCoefficient(100, 'male'), 0.6086, 0.002);
});

check('Wilks score = total × coefficient', () => {
  const coef = wilksCoefficient(90, 'male');
  near(wilksScore(500, 90, 'male'), 500 * coef, 1e-9);
});

check('score scales linearly with total', () => {
  near(wilksScore(1000, 90, 'male'), 2 * wilksScore(500, 90, 'male'), 1e-9);
});

check('lighter lifter gets a higher coefficient', () => {
  assert.ok(wilksCoefficient(70, 'male') > wilksCoefficient(120, 'male'));
});

check('male and female coefficients differ at the same bodyweight', () => {
  assert.notEqual(wilksCoefficient(70, 'male'), wilksCoefficient(70, 'female'));
});

check('coefficients are positive in normal range', () => {
  for (const bw of [50, 60, 75, 90, 110, 140]) {
    assert.ok(wilksCoefficient(bw, 'male') > 0, `male ${bw}`);
    assert.ok(wilksCoefficient(bw, 'female') > 0, `female ${bw}`);
  }
});

check('lb → kg conversion', () => {
  near(lbToKg(220.462), 100, 0.01);
  near(lbToKg(0), 0, 1e-9);
});

check('same total, lighter male scores higher', () => {
  assert.ok(wilksScore(500, 70, 'male') > wilksScore(500, 120, 'male'));
});

check('female 60 kg example is a reasonable coefficient', () => {
  const c = wilksCoefficient(60, 'female');
  assert.ok(c > 0.8 && c < 1.3);   // sanity band
});

check('validation', () => {
  assert.throws(() => wilksCoefficient(0, 'male'), /positive/);
  assert.throws(() => wilksCoefficient(90, 'other'), /male.*female/);
  assert.throws(() => wilksScore('x', 90, 'male'), /numbers/);
});

console.log(`\n${n} checks passed.`);
