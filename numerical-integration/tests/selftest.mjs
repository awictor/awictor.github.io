import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { compile, simpson, integrate } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. Simpson is exact for x^2: integral 0..1 = 1/3.
check('x^2 0..1', near(integrate('x^2', 0, 1), 1 / 3, 1e-9));
// 2. Exact for cubics: x^3 0..2 = 4.
check('x^3 0..2', near(integrate('x^3', 0, 2), 4, 1e-9));
// 3. sin(x) 0..pi = 2.
check('sin 0..pi', near(integrate('sin(x)', 0, Math.PI), 2));
// 4. Constant 1 over [0,5] = 5.
check('const', near(integrate('1', 0, 5), 5, 1e-9));
// 5. Linear x over [0,10] = 50.
check('linear', near(integrate('x', 0, 10), 50, 1e-9));
// 6. exp(x) 0..1 = e - 1.
check('exp', near(integrate('exp(x)', 0, 1), Math.E - 1));
// 7. Reversing limits negates the result.
check('reverse limits', near(integrate('x^2', 2, 0), -integrate('x^2', 0, 2), 1e-9));
// 8. 2*x over [0,3] = 9.
check('2x', near(integrate('2*x', 0, 3), 9, 1e-9));
// 9. compile builds a usable function of x.
const f = compile('x^2 + 1');
check('compile', f(3) === 10 && f(0) === 1);
// 10. simpson forces an even interval count (odd n still works).
check('odd n handled', near(simpson(x => x * x, 0, 1, 101), 1 / 3, 1e-6));

console.log(passed + ' checks passed.');
