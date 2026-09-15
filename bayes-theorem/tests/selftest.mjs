import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { bayes, posteriorPositive, posteriorNegative } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('general Bayes update', () => {
  near(bayes(0.5, 0.9, 0.1), 0.9);
  near(bayes(0.5, 0.9, 0.3), 0.9 / 1.2); // 0.75
});

check('the classic base-rate result: 1% prevalence, 99%/99% test ⇒ 50%', () => {
  near(posteriorPositive(0.01, 0.99, 0.99), 0.5);
});

check('lower specificity tanks the positive predictive value', () => {
  near(posteriorPositive(0.01, 0.99, 0.95), 0.0099 / (0.0099 + 0.05 * 0.99)); // ~0.1667
  assert.ok(posteriorPositive(0.01, 0.99, 0.95) < 0.17);
});

check('a negative test on a rare disease leaves tiny residual risk', () => {
  const r = posteriorNegative(0.01, 0.99, 0.99);
  near(r, (0.01 * 0.01) / (0.01 * 0.01 + 0.99 * 0.99));
  assert.ok(r < 0.001);
});

check('posteriorPositive is the bayes special case with pE|¬H = 1 − specificity', () => {
  near(posteriorPositive(0.2, 0.8, 0.9), bayes(0.2, 0.8, 0.1));
});

check('posteriorNegative uses (1−sensitivity) and specificity', () => {
  near(posteriorNegative(0.2, 0.8, 0.9), bayes(0.2, 0.2, 0.9));
});

check('prior of 0 stays 0; prior of 1 stays 1', () => {
  near(bayes(0, 0.9, 0.1), 0);
  near(bayes(1, 0.9, 0.1), 1);
});

check('uninformative evidence (P(E|H)=P(E|¬H)) leaves the prior unchanged', () => {
  near(bayes(0.3, 0.5, 0.5), 0.3);
  near(bayes(0.7, 0.2, 0.2), 0.7);
});

check('higher prevalence raises the positive predictive value', () => {
  assert.ok(posteriorPositive(0.1, 0.99, 0.99) > posteriorPositive(0.01, 0.99, 0.99));
});

check('validation: out-of-range probabilities and zero-evidence throw', () => {
  assert.throws(() => bayes(-0.1, 0.9, 0.1), /between 0 and 1/);
  assert.throws(() => bayes(0.5, 1.2, 0.1), /between 0 and 1/);
  assert.throws(() => posteriorPositive(0.01, 0.99, 1.5), /between 0 and 1/);
  assert.throws(() => bayes(0.5, 0, 0), /zero probability/);
});

console.log(`\n${n} checks passed.`);
