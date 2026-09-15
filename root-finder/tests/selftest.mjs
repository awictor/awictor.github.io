import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { compile, bisection, newton } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. Bisection root of x^2-2 in [1,2] = sqrt(2).
check('bisect sqrt2', near(bisection(compile('x^2-2'), 1, 2), Math.SQRT2));
// 2. Wider bracket still finds it.
check('bisect wide', near(bisection(compile('x^2-2'), 0, 2), Math.SQRT2));
// 3. cos(x) root in [0,2] = pi/2.
check('bisect cos', near(bisection(compile('cos(x)'), 0, 2), Math.PI / 2));
// 4. x^3-x-2 root in [1,2] ~ 1.5213797.
check('bisect cubic', near(bisection(compile('x^3-x-2'), 1, 2), 1.5213797, 1e-5));
// 5. Bisection throws without a sign change.
let noSign = false; try { bisection(compile('x^2+1'), 0, 1); } catch (e) { noSign = true; }
check('no bracket throws', noSign);
// 6. Newton finds sqrt(2) from x0=2.
check('newton sqrt2', near(newton(compile('x^2-2'), 2), Math.SQRT2));
// 7. Newton finds the negative root from x0=-2.
check('newton -sqrt2', near(newton(compile('x^2-2'), -2), -Math.SQRT2));
// 8. Newton on cos from 1.5 -> pi/2.
check('newton cos', near(newton(compile('cos(x)'), 1.5), Math.PI / 2));
// 9. Linear equation 2x-4 -> root 2.
check('linear root', near(bisection(compile('2*x - 4'), 0, 10), 2));
// 10. Residual at the found root is tiny.
const f = compile('x^3-x-2'); const r = bisection(f, 1, 2);
check('small residual', Math.abs(f(r)) < 1e-6);

console.log(passed + ' checks passed.');
