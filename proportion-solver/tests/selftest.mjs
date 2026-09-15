import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { solveForA, solveForB, solveForC, solveForD, isProportion } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 1/2 = c/10 -> c = 5.
check('solve c', near(solveForC(1, 2, 10), 5));
// 2. 3/4 = 9/d -> d = 12.
check('solve d', near(solveForD(3, 4, 9), 12));
// 3. 2/b = 6/9 -> b = 3.
check('solve b', near(solveForB(2, 6, 9), 3));
// 4. a/5 = 8/10 -> a = 4.
check('solve a', near(solveForA(5, 8, 10), 4));
// 5. Aspect scaling: 16/9 = c/1080 -> c = 1920.
check('16:9 scaling', near(solveForC(16, 9, 1080), 1920));
// 6. A true proportion is recognized.
check('is proportion true', isProportion(1, 2, 5, 10));
// 7. A false one is rejected.
check('is proportion false', !isProportion(1, 2, 3, 10));
// 8. Solving then plugging back in yields a valid proportion.
check('round trip proportion', isProportion(3, 4, solveForC(3, 4, 20), 20));
// 9. Cross products are equal for a solved value.
const c = solveForC(7, 3, 21);
check('cross product equal', near(7 * 21, 3 * c));
// 10. Division-by-zero guard.
let threw = false;
try { solveForC(1, 0, 10); } catch (e) { threw = true; }
check('zero guard', threw);

console.log(passed + ' checks passed.');
