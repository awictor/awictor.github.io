import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sharpe, annualize, mean, stdDev, downsideDev, sharpeFromReturns, sortinoFromReturns } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('Sharpe = (Rp − Rf) / σ', () => {
  near(sharpe(10, 2, 15), 8 / 15); // 0.53333
  near(sharpe(0.10, 0.02, 0.15), (0.10 - 0.02) / 0.15);
});

check('Sharpe is negative when the portfolio underperforms cash', () => {
  assert.ok(sharpe(1, 3, 10) < 0);
});

check('annualize multiplies by sqrt(periods)', () => {
  near(annualize(0.2, 12), 0.2 * Math.sqrt(12));
  near(annualize(0.1, 252), 0.1 * Math.sqrt(252));
  near(annualize(0.5, 1), 0.5);
});

check('mean of a return series', () => {
  near(mean([1, 2, 3]), 2);
  near(mean([1.2, -0.5, 2.1, 0.8, -1.3, 1.9, 0.4, 2.5]), 7.1 / 8);
});

check('sample standard deviation uses n-1', () => {
  near(stdDev([1, 2, 3]), 1);
  near(stdDev([2, 4, 4, 4, 5, 5, 7, 9]), Math.sqrt(32 / 7)); // 2.13809
});

check('downside deviation only counts returns below the target', () => {
  near(downsideDev([-2, 1, 3], 0), Math.sqrt(4 / 2)); // 1.41421
});

check('downside deviation is zero when nothing is below target', () => {
  near(downsideDev([1, 2, 3], 0), 0);
});

check('sharpeFromReturns composes mean and stdDev', () => {
  near(sharpeFromReturns([1, 2, 3], 0), 2); // mean 2 / sd 1
  const arr = [1.2, -0.5, 2.1, 0.8, -1.3, 1.9, 0.4, 2.5];
  near(sharpeFromReturns(arr, 0.2), (mean(arr) - 0.2) / stdDev(arr));
});

check('sortinoFromReturns uses downside deviation', () => {
  near(sortinoFromReturns([-2, 1, 3], 0), (2 / 3) / Math.sqrt(2)); // 0.4714
});

check('validation: bad volatility, series length, and values throw', () => {
  assert.throws(() => sharpe(10, 2, 0), /volatility must be positive/);
  assert.throws(() => sharpe(10, 2, -1), /volatility must be positive/);
  assert.throws(() => annualize(0.2, 0), /periods per year/);
  assert.throws(() => mean([]), /at least one/);
  assert.throws(() => stdDev([5]), /at least two/);
  assert.throws(() => mean([1, NaN]), /finite number/);
});

console.log(`\n${n} checks passed.`);
