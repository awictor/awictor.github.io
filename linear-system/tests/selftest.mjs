import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { solve, determinant } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const vecNear = (a, b, t = 1e-9) => a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) < t);

// 1. 2x2 system.
check('2x2', vecNear(solve([[2, 1], [1, 3]], [5, 10]), [1, 3]));
// 2. Identity returns b.
check('identity', vecNear(solve([[1, 0, 0], [0, 1, 0], [0, 0, 1]], [4, 5, 6]), [4, 5, 6]));
// 3. 1x1.
check('1x1', vecNear(solve([[5]], [10]), [2]));
// 4. Classic 3x3.
check('3x3', vecNear(solve([[1, 1, 1], [0, 2, 5], [2, 5, -1]], [6, -4, 27]), [5, 3, -2]));
// 5. Residual A x - b ~ 0.
const A = [[3, 2, -1], [2, -2, 4], [-1, 0.5, -1]], b = [1, -2, 0];
const x = solve(A, b);
let resOk = true;
for (let i = 0; i < 3; i++) { let s = 0; for (let j = 0; j < 3; j++) s += A[i][j] * x[j]; if (Math.abs(s - b[i]) > 1e-9) resOk = false; }
check('residual ~ 0', resOk);
// 6. Singular system throws.
let sing = false; try { solve([[1, 2], [2, 4]], [3, 6]); } catch (e) { sing = true; }
check('singular throws', sing);
// 7. Determinant of a 2x2.
check('det 2x2', determinant([[2, 1], [1, 3]]) === 5);
// 8. Determinant of identity is 1.
check('det identity', determinant([[1, 0, 0], [0, 1, 0], [0, 0, 1]]) === 1);
// 9. Needs partial pivoting (zero leading coefficient).
check('pivoting', vecNear(solve([[0, 1], [1, 0]], [2, 3]), [3, 2]));
// 10. Singular matrix has determinant 0.
check('det singular', determinant([[1, 2], [2, 4]]) === 0);

console.log(passed + ' checks passed.');
