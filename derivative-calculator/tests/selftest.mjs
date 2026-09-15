import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { compile, derivative, secondDerivative, tangentLine } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-4) => Math.abs(a - b) < t;

// 1. d/dx x^2 at 3 = 6.
check('x^2 at 3', near(derivative(compile('x^2'), 3), 6));
// 2. d/dx x^3 at 2 = 12.
check('x^3 at 2', near(derivative(compile('x^3'), 2), 12));
// 3. d/dx sin(x) at 0 = 1.
check('sin at 0', near(derivative(compile('sin(x)'), 0), 1));
// 4. d/dx exp(x) at 0 = 1.
check('exp at 0', near(derivative(compile('exp(x)'), 0), 1));
// 5. d/dx x = 1 everywhere.
check('linear', near(derivative(compile('x'), 5), 1));
// 6. Derivative of a constant is 0.
check('constant', near(derivative(compile('7'), 2), 0));
// 7. Second derivative of x^2 is 2.
check('2nd of x^2', near(secondDerivative(compile('x^2'), 1), 2, 1e-3));
// 8. Second derivative of x^3 at 2 is 6x = 12.
check('2nd of x^3', near(secondDerivative(compile('x^3'), 2), 12, 1e-2));
// 9. Tangent to x^2 at 3: slope 6, intercept -9.
const t = tangentLine('x^2', 3);
check('tangent', near(t.slope, 6) && near(t.intercept, -9, 1e-3));
// 10. d/dx cos(x) at pi/2 = -1.
check('cos at pi/2', near(derivative(compile('cos(x)'), Math.PI / 2), -1));

console.log(passed + ' checks passed.');
