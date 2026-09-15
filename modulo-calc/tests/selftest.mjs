import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { truncatedMod, flooredMod, euclideanMod, truncatedQuotient, flooredQuotient } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. Truncated -7 mod 3 = -1 (C/JS behaviour).
check('trunc -7,3', truncatedMod(-7, 3) === -1);
// 2. Floored -7 mod 3 = 2 (Python behaviour).
check('floor -7,3', flooredMod(-7, 3) === 2);
// 3. Euclidean -7 mod 3 = 2.
check('eucl -7,3', euclideanMod(-7, 3) === 2);
// 4. Truncated 7 mod -3 = 1.
check('trunc 7,-3', truncatedMod(7, -3) === 1);
// 5. Floored 7 mod -3 = -2.
check('floor 7,-3', flooredMod(7, -3) === -2);
// 6. Euclidean 7 mod -3 = 1 (always uses |n|).
check('eucl 7,-3', euclideanMod(7, -3) === 1);
// 7. For positive operands all three agree.
check('positives agree', truncatedMod(7, 3) === 1 && flooredMod(7, 3) === 1 && euclideanMod(7, 3) === 1);
// 8. Euclidean result is always non-negative.
check('euclidean non-negative', euclideanMod(-1, 3) === 2 && euclideanMod(-100, 7) >= 0);
// 9. Quotient conventions: truncated rounds toward zero, floored rounds down.
check('quotients', truncatedQuotient(-7, 3) === -2 && flooredQuotient(-7, 3) === -3);
// 10. Division by zero throws.
let z = false; try { truncatedMod(5, 0); } catch (e) { z = true; }
check('zero divisor guard', z);

console.log(passed + ' checks passed.');
