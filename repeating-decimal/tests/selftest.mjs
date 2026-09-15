import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { fractionToDecimal, format, repeatingToFraction, parseRepeating } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. 1/3 repeats "3".
const a = fractionToDecimal(1, 3);
check('1/3', a.repeating === '3' && a.nonRepeating === '' && a.integerPart === 0);
// 2. 1/7 repeats "142857".
check('1/7', fractionToDecimal(1, 7).repeating === '142857');
// 3. 1/6 = 0.1(6).
const b = fractionToDecimal(1, 6);
check('1/6', b.nonRepeating === '1' && b.repeating === '6');
// 4. 1/2 terminates at 0.5.
const c = fractionToDecimal(1, 2);
check('1/2', c.nonRepeating === '5' && c.repeating === '');
// 5. 1/4 = 0.25 terminating.
check('1/4', format(fractionToDecimal(1, 4)) === '0.25');
// 6. 22/7 = 3.(142857).
check('22/7', format(fractionToDecimal(22, 7)) === '3.(142857)');
// 7. Whole number.
check('5/1', format(fractionToDecimal(5, 1)) === '5');
// 8. Reverse: 0.(3) = 1/3.
check('0.(3) -> 1/3', JSON.stringify(repeatingToFraction(0, '', '3')) === JSON.stringify([1, 3]));
// 9. Reverse: 0.1(6) = 1/6.
check('0.1(6) -> 1/6', JSON.stringify(repeatingToFraction(0, '1', '6')) === JSON.stringify([1, 6]));
// 10. Parse & reverse: 0.(142857) = 1/7; terminating 0.25 = 1/4.
check('parse', JSON.stringify(parseRepeating('0.(142857)')) === JSON.stringify([1, 7]) && JSON.stringify(parseRepeating('0.25')) === JSON.stringify([1, 4]));

console.log(passed + ' checks passed.');
