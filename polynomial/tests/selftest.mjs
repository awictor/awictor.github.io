import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { evaluate, add, multiply, derivative, integrate } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const eq = (a, b) => a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) < 1e-12);

// 1. Evaluate 1 + 2x + 3x² at x=2 = 17.
check('evaluate', evaluate([1, 2, 3], 2) === 17);
// 2. Constant polynomial.
check('constant', evaluate([7], 100) === 7);
// 3. Addition aligns by power.
check('add', eq(add([1, 2], [3, 4, 5]), [4, 6, 5]));
// 4. (x+1)² = x² + 2x + 1.
check('multiply square', eq(multiply([1, 1], [1, 1]), [1, 2, 1]));
// 5. Scalar × polynomial.
check('multiply scalar', eq(multiply([2], [3, 4]), [6, 8]));
// 6. Derivative of 5 + 3x + 2x² = 3 + 4x.
check('derivative', eq(derivative([5, 3, 2]), [3, 4]));
// 7. Derivative of a constant is 0.
check('derivative const', eq(derivative([9]), [0]));
// 8. Integral of 3 + 4x with C=5 = 5 + 3x + 2x².
check('integrate', eq(integrate([3, 4], 5), [5, 3, 2]));
// 9. d/dx of the integral recovers the original.
check('round trip', eq(derivative(integrate([3, 4, 6], 5)), [3, 4, 6]));
// 10. Horner matches the naive sum for 1 - 3x + 2x³ at x=2.
check('horner', evaluate([1, -3, 0, 2], 2) === 1 - 3 * 2 + 2 * 8);

console.log(passed + ' checks passed.');
