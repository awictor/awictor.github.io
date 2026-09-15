import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parseMatrix, transpose, multiply, determinant, inverse, identity } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);
const nearM = (A, B, e = 1e-9) => { assert.equal(A.length, B.length); A.forEach((row, i) => row.forEach((x, j) => near(x, B[i][j], e))); };

check('determinant 2×2 and 3×3', () => {
  assert.equal(determinant([[1, 2], [3, 4]]), -2);
  assert.equal(determinant([[6, 1, 1], [4, -2, 5], [2, 8, 7]]), -306);
  assert.equal(determinant([[5]]), 5);
});

check('multiplication', () => {
  assert.deepEqual(multiply([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
});

check('transpose', () => {
  assert.deepEqual(transpose([[1, 2, 3], [4, 5, 6]]), [[1, 4], [2, 5], [3, 6]]);
});

check('inverse of a 2×2', () => {
  nearM(inverse([[4, 7], [2, 6]]), [[0.6, -0.7], [-0.2, 0.4]]);
});

check('A · A⁻¹ = I', () => {
  const A = [[6, 1, 1], [4, -2, 5], [2, 8, 7]];
  nearM(multiply(A, inverse(A)), identity(3), 1e-9);
});

check('identity is neutral for multiplication', () => {
  const A = [[2, 3], [5, 7]];
  assert.deepEqual(multiply(A, identity(2)), A);
  assert.deepEqual(multiply(identity(2), A), A);
});

check('det(identity) = 1 and det(A·B) = det(A)·det(B)', () => {
  assert.equal(determinant(identity(4)), 1);
  const A = [[1, 2], [3, 4]], B = [[2, 0], [1, 2]];
  near(determinant(multiply(A, B)), determinant(A) * determinant(B));
});

check('(Aᵀ)ᵀ = A and det(Aᵀ) = det(A)', () => {
  const A = [[1, 2, 3], [4, 5, 6], [7, 8, 10]];
  assert.deepEqual(transpose(transpose(A)), A);
  near(determinant(transpose(A)), determinant(A));
});

check('parseMatrix reads rows and rejects ragged input', () => {
  assert.deepEqual(parseMatrix('1 2\n3 4'), [[1, 2], [3, 4]]);
  assert.deepEqual(parseMatrix('1,2,3'), [[1, 2, 3]]);
  assert.throws(() => parseMatrix('1 2\n3'), /same length/);
});

check('validation: singular inverse, non-square det, mismatched multiply throw', () => {
  assert.throws(() => inverse([[1, 2], [2, 4]]), /singular/);
  assert.throws(() => determinant([[1, 2, 3], [4, 5, 6]]), /square/);
  assert.throws(() => multiply([[1, 2, 3]], [[1, 2]]), /must equal/);
});

console.log(`\n${n} checks passed.`);
