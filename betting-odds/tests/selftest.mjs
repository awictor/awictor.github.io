import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { americanToDecimal, decimalToAmerican, decimalToImpliedProb, impliedProbToDecimal, fractionalToDecimal, decimalToFractional } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. +150 American = 2.5 decimal.
check('+150 -> 2.5', near(americanToDecimal(150), 2.5));
// 2. -200 American = 1.5 decimal.
check('-200 -> 1.5', near(americanToDecimal(-200), 1.5));
// 3. 2.5 decimal -> +150 American.
check('2.5 -> +150', near(decimalToAmerican(2.5), 150));
// 4. 1.5 decimal -> -200 American.
check('1.5 -> -200', near(decimalToAmerican(1.5), -200));
// 5. Even money: 2.0 decimal = +100 American.
check('2.0 -> +100', near(decimalToAmerican(2.0), 100));
// 6. Implied probability of 2.5 = 40%.
check('2.5 -> 0.4', near(decimalToImpliedProb(2.5), 0.4));
// 7. impliedProbToDecimal inverts.
check('prob round trip', near(impliedProbToDecimal(decimalToImpliedProb(3.3)), 3.3));
// 8. Fractional 5/1 = 6.0 decimal.
check('5/1 -> 6.0', near(fractionalToDecimal(5, 1), 6.0));
// 9. Decimal 2.5 -> fractional 3/2.
const fr = decimalToFractional(2.5);
check('2.5 -> 3/2', fr.num === 3 && fr.den === 2);
// 10. American round trip: +150 -> decimal -> +150.
check('american round trip', near(decimalToAmerican(americanToDecimal(150)), 150) && near(decimalToAmerican(americanToDecimal(-350)), -350));

console.log(passed + ' checks passed.');
