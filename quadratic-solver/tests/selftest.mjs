import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { discriminant, vertexX, solve } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);

check('discriminant', () => {
  assert.equal(discriminant(1, -5, 6), 1);
  assert.equal(discriminant(1, -4, 4), 0);
  assert.equal(discriminant(1, 0, 1), -4);
});

check('two real roots: x^2 - 5x + 6 = 0 -> 2, 3', () => {
  const r = solve(1, -5, 6);
  assert.equal(r.nature, 'two real roots');
  assert.deepEqual(r.roots.slice().sort((a, b) => a - b), [2, 3]);
});

check('repeated root: x^2 - 4x + 4 = 0 -> 2', () => {
  const r = solve(1, -4, 4);
  assert.equal(r.nature, 'one repeated real root');
  assert.deepEqual(r.roots, [2]);
});

check('complex roots: x^2 + 1 = 0 -> ±i', () => {
  const r = solve(1, 0, 1);
  assert.equal(r.nature, 'two complex roots');
  near(r.roots[0].re, 0); near(r.roots[0].im, 1);
  near(r.roots[1].re, 0); near(r.roots[1].im, -1);
});

check('irrational roots: x^2 - 2 = 0 -> ±√2', () => {
  const r = solve(1, 0, -2);
  const rs = r.roots.slice().sort((a, b) => a - b);
  near(rs[0], -Math.SQRT2); near(rs[1], Math.SQRT2);
});

check('leading coefficient scales but keeps roots: 2x^2+4x+2 -> -1 (double)', () => {
  const r = solve(2, 4, 2);
  assert.equal(r.nature, 'one repeated real root');
  near(r.roots[0], -1);
});

check('roots satisfy the equation', () => {
  const cases = [[1, -5, 6], [3, -2, -5], [1, 0, -9]];
  for (const [a, b, c] of cases) {
    for (const x of solve(a, b, c).roots) {
      if (typeof x === 'number') near(a * x * x + b * x + c, 0);
    }
  }
});

check('vertex x = -b/2a', () => {
  near(vertexX(1, -5), 2.5);
  near(vertexX(2, 4), -1);
});

check('sum and product of roots match Vieta', () => {
  const r = solve(1, -5, 6); // sum = 5, product = 6
  near(r.roots[0] + r.roots[1], 5);
  near(r.roots[0] * r.roots[1], 6);
});

check('validation: a must be non-zero and inputs finite', () => {
  assert.throws(() => solve(0, 2, 1), /a must be non-zero/);
  assert.throws(() => solve(1, 2, NaN), /must be a finite number/);
  assert.throws(() => vertexX(0, 2), /a must be non-zero/);
});

console.log(`\n${n} checks passed.`);
