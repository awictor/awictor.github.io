import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { futureValue, presentValue, rate, periods } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('future value grows PV by (1+r)^n', () => {
  near(futureValue(1000, 0.05, 10), 1000 * Math.pow(1.05, 10)); // 1628.894...
  near(futureValue(1000, 0.05, 10), 1628.894627, 1e-4);
});

check('present value discounts FV back', () => {
  near(presentValue(1628.894627, 0.05, 10), 1000, 1e-3);
});

check('PV and FV are exact inverses', () => {
  near(presentValue(futureValue(500, 0.08, 7), 0.08, 7), 500);
});

check('zero periods leaves the value unchanged', () => {
  near(futureValue(1234, 0.1, 0), 1234);
  near(presentValue(1234, 0.1, 0), 1234);
});

check('implied rate: doubling in 10 periods ≈ 7.18%', () => {
  near(rate(1000, 2000, 10), Math.pow(2, 1 / 10) - 1);
  assert.ok(Math.abs(rate(1000, 2000, 10) - 0.0717735) < 1e-5);
});

check('rate inverts futureValue', () => {
  const fv = futureValue(1000, 0.06, 12);
  near(rate(1000, fv, 12), 0.06);
});

check('periods to double at 7.2% ≈ 9.97', () => {
  near(periods(1000, 2000, 0.072), Math.log(2) / Math.log(1.072));
  assert.ok(Math.abs(periods(1000, 2000, 0.072) - 9.9697) < 1e-2);
});

check('periods inverts futureValue', () => {
  const fv = futureValue(2500, 0.04, 18);
  near(periods(2500, fv, 0.04), 18);
});

check('Rule of 72 sanity: rate × doubling-periods ≈ 72', () => {
  const r = 0.06;
  const n2 = periods(1, 2, r);
  assert.ok(Math.abs(r * 100 * n2 - 72) < 2); // within a couple points
});

check('validation: non-positive values and degenerate cases throw', () => {
  assert.throws(() => futureValue(0, 0.05, 10), /present value must be positive/);
  assert.throws(() => futureValue(1000, -1.5, 10), /greater than -100%/);
  assert.throws(() => rate(1000, 2000, 0), /periods must be positive/);
  assert.throws(() => periods(1000, 2000, 0), /rate cannot be zero/);
});

console.log(`\n${n} checks passed.`);
