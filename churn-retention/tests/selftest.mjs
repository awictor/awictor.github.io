import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { churnRate, retentionRate, avgLifetime, annualChurn, monthlyChurn } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

check('churn rate from counts', () => {
  near(churnRate(1000, 50), 0.05);
  near(churnRate(200, 40), 0.2);
});

check('zero lost is zero churn', () => {
  assert.equal(churnRate(500, 0), 0);
});

check('retention = 1 - churn', () => {
  near(retentionRate(0.05), 0.95);
  near(retentionRate(0.2), 0.8);
});

check('average lifetime = 1 / churn', () => {
  near(avgLifetime(0.05), 20);
  near(avgLifetime(0.1), 10);
  assert.equal(avgLifetime(0), Infinity);
});

check('annual churn compounds a monthly rate', () => {
  near(annualChurn(0.05), 1 - Math.pow(0.95, 12)); // ~0.4596
  assert.equal(annualChurn(0), 0);
});

check('annual churn exceeds the monthly rate', () => {
  assert.ok(annualChurn(0.05) > 0.05);
  assert.ok(annualChurn(0.1) > 0.1);
});

check('monthly and annual churn round-trip', () => {
  near(monthlyChurn(annualChurn(0.05)), 0.05);
  near(annualChurn(monthlyChurn(0.3)), 0.3);
});

check('higher churn means shorter lifetime and lower retention', () => {
  assert.ok(avgLifetime(0.1) < avgLifetime(0.05));
  assert.ok(retentionRate(0.1) < retentionRate(0.05));
});

check('a specific annual figure: ~46% annual from 5% monthly', () => {
  const a = annualChurn(0.05);
  assert.ok(a > 0.45 && a < 0.46);
});

check('validation: bad counts and out-of-range rates throw', () => {
  assert.throws(() => churnRate(0, 5), /starting customers must be positive/);
  assert.throws(() => churnRate(100, 150), /more customers than you started/);
  assert.throws(() => retentionRate(1), /between 0 and 1/);
  assert.throws(() => annualChurn(-0.1), /between 0 and 1/);
});

console.log(`\n${n} checks passed.`);
