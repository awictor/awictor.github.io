import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { alveolarPO2, aaGradient, expectedGradient, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

check('alveolar gas equation on room air', () => {
  near(alveolarPO2(0.21, 40), 0.21 * 713 - 50); // 99.73
});

check('A-a gradient = PAO2 - PaO2', () => {
  near(aaGradient(0.21, 40, 95), 0.21 * 713 - 50 - 95); // ~4.73
});

check('100% oxygen raises alveolar PO2', () => {
  near(alveolarPO2(1.0, 40), 713 - 50); // 663
});

check('expected gradient = age/4 + 4', () => {
  near(expectedGradient(40), 14);
  near(expectedGradient(20), 9);
  near(expectedGradient(80), 24);
});

check('higher PaCO2 lowers alveolar PO2', () => {
  assert.ok(alveolarPO2(0.21, 60) < alveolarPO2(0.21, 40));
});

check('altitude (lower Patm) lowers alveolar PO2', () => {
  near(alveolarPO2(0.21, 40, { patm: 630 }), 0.21 * (630 - 47) - 50);
  assert.ok(alveolarPO2(0.21, 40, { patm: 630 }) < alveolarPO2(0.21, 40));
});

check('custom respiratory quotient', () => {
  near(alveolarPO2(0.21, 40, { r: 1.0 }), 0.21 * 713 - 40);
});

check('analyze flags an elevated gradient', () => {
  const r = analyze(0.21, 40, 70, 30); // big gradient
  assert.ok(r.aaGradient > r.expectedGradient);
  assert.equal(r.elevated, true);
});

check('analyze passes a normal gradient', () => {
  const r = analyze(0.21, 40, 95, 40);
  assert.equal(r.elevated, false);
  near(r.expectedGradient, 14);
});

check('validation: FiO2 range, positives, and age', () => {
  assert.throws(() => alveolarPO2(0, 40), /FiO2 must be between 0 and 1/);
  assert.throws(() => alveolarPO2(1.2, 40), /FiO2 must be between 0 and 1/);
  assert.throws(() => aaGradient(0.21, 40, 0), /PaO2 must be a positive/);
  assert.throws(() => expectedGradient(-1), /age must be zero or more/);
});

console.log(`\n${n} checks passed.`);
