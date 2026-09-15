import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { evaluate, factorial } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Multiplication binds tighter than addition.
check('precedence', evaluate('2 + 3 * 4') === 14);
// 2. Parentheses override precedence.
check('parentheses', evaluate('(2 + 3) * 4') === 20);
// 3. Exponentiation is right-associative: 2^(3^2) = 512.
check('right-assoc power', evaluate('2^3^2') === 512);
// 4. Unary minus binds looser than power: -2^2 = -4.
check('unary vs power', evaluate('-2^2') === -4);
// 5. Modulo.
check('modulo', evaluate('10 % 3') === 1);
// 6. Functions and nesting.
check('sqrt', evaluate('sqrt(16)') === 4 && near(evaluate('cos(0)'), 1) && near(evaluate('sin(0)'), 0));
// 7. Constants.
check('constants', near(evaluate('2 * pi'), 2 * Math.PI) && near(evaluate('ln(e)'), 1));
// 8. Factorial (postfix) and helper.
check('factorial', evaluate('5!') === 120 && factorial(0) === 1);
// 9. log is base-10, division works.
check('log and division', near(evaluate('log(1000)'), 3) && evaluate('1/2 + 1/4') === 0.75);
// 10. Malformed input throws.
let threw = false;
try { evaluate('2 +'); } catch (e) { threw = true; }
check('error on malformed', threw);

console.log(passed + ' checks passed.');
