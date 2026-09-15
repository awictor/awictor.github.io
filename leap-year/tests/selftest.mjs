import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isLeapYear, daysInYear, daysInFebruary, nextLeapYear, previousLeapYear, leapYearsInRange } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. Divisible by 400 is a leap year.
check('2000 leap', isLeapYear(2000) === true);
// 2. Century not divisible by 400 is not.
check('1900 not leap', isLeapYear(1900) === false);
// 3. Ordinary divisible-by-4.
check('2024 leap', isLeapYear(2024) === true);
// 4. Not divisible by 4.
check('2023 not leap', isLeapYear(2023) === false);
// 5. Days in year.
check('days in year', daysInYear(2024) === 366 && daysInYear(2023) === 365);
// 6. Days in February.
check('feb days', daysInFebruary(2000) === 29 && daysInFebruary(1900) === 28);
// 7. Next leap year.
check('next leap', nextLeapYear(2023) === 2024 && nextLeapYear(2024) === 2028);
// 8. Next leap year skips a non-leap century.
check('next skips 1900', nextLeapYear(1896) === 1904);
// 9. Previous leap year skips a non-leap century.
check('prev skips 1900', previousLeapYear(1904) === 1896);
// 10. Count over a range (inclusive).
check('range count', leapYearsInRange(2000, 2020) === 6 && leapYearsInRange(1900, 1900) === 0 && leapYearsInRange(1896, 1904) === 2);

console.log(passed + ' checks passed.');
