import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { mean, regression, predict, parsePoints } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('a perfect positive line: y = 2x + 1', () => {
  const f = regression([[0, 1], [1, 3], [2, 5], [3, 7]]);
  near(f.slope, 2); near(f.intercept, 1); near(f.r, 1); near(f.r2, 1);
});

check('through the origin: y = 2x', () => {
  const f = regression([[1, 2], [2, 4], [3, 6]]);
  near(f.slope, 2); near(f.intercept, 0); near(f.r, 1);
});

check('a perfect negative line gives r = −1', () => {
  const f = regression([[1, 10], [2, 8], [3, 6]]);
  near(f.slope, -2); near(f.intercept, 12); near(f.r, -1);
});

check('noisy data: known least-squares fit y = 0.8x + 1.8', () => {
  const f = regression([[1, 2], [2, 4], [3, 5], [4, 4], [5, 6]]);
  near(f.slope, 0.8); near(f.intercept, 1.8);
  near(f.r, 8 / Math.sqrt(88)); near(f.r2, 64 / 88);
});

check('intercept satisfies b = ȳ − m·x̄', () => {
  const pts = [[1, 2], [2, 4], [3, 5], [4, 4], [5, 6]];
  const f = regression(pts);
  const mx = mean(pts.map(p => p[0])), my = mean(pts.map(p => p[1]));
  near(f.intercept, my - f.slope * mx);
});

check('r ∈ [−1, 1] and R² ∈ [0, 1]', () => {
  for (const set of [[[1, 3], [2, 1], [3, 8], [4, 2], [5, 9]], [[0, 0], [1, 1], [2, 1], [3, 4]]]) {
    const f = regression(set);
    assert.ok(f.r >= -1 - 1e-12 && f.r <= 1 + 1e-12);
    assert.ok(f.r2 >= 0 && f.r2 <= 1 + 1e-12);
    near(f.r2, f.r * f.r);
  }
});

check('predict works from a fit and directly from points', () => {
  const pts = [[0, 1], [1, 3], [2, 5], [3, 7]];
  near(predict(regression(pts), 6), 13); // 2*6+1
  near(predict(pts, 10), 21);
});

check('a horizontal line: slope 0, r 0, predicts the constant', () => {
  const f = regression([[1, 5], [2, 5], [3, 5]]);
  near(f.slope, 0); near(f.intercept, 5); near(f.r, 0);
  near(predict(f, 99), 5);
});

check('parsePoints reads comma- and space-separated lines', () => {
  assert.deepEqual(parsePoints('1, 2\n3 4\n5,6'), [[1, 2], [3, 4], [5, 6]]);
  assert.deepEqual(parsePoints('  \n10 20\n'), [[10, 20]]);
});

check('validation: too few points, identical x, bad pairs throw', () => {
  assert.throws(() => regression([[1, 2]]), /at least two/);
  assert.throws(() => regression([[2, 1], [2, 5]]), /identical/);
  assert.throws(() => regression([[1, 2], [3, NaN]]), /finite \[x, y\] pair/);
  assert.throws(() => predict(regression([[0, 1], [1, 2]]), NaN), /finite number/);
});

console.log(`\n${n} checks passed.`);
