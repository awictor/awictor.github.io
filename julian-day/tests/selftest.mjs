import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gregorianToJDN, jdnToGregorian, weekdayFromJDN, dayOfYear } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const sameDate = (g, y, m, d) => g.year === y && g.month === m && g.day === d;

// 1. J2000.0 epoch: 2000-01-01 -> JDN 2451545.
check('J2000', gregorianToJDN(2000, 1, 1) === 2451545);
// 2. Unix epoch: 1970-01-01 -> JDN 2440588.
check('Unix epoch', gregorianToJDN(1970, 1, 1) === 2440588);
// 3. MJD epoch: 1858-11-17 -> JDN 2400001.
check('MJD epoch', gregorianToJDN(1858, 11, 17) === 2400001);
// 4. Reverse of J2000 gives the date back.
check('reverse J2000', sameDate(jdnToGregorian(2451545), 2000, 1, 1));
// 5. Round trip for an arbitrary date.
check('round trip', sameDate(jdnToGregorian(gregorianToJDN(2026, 9, 11)), 2026, 9, 11));
// 6. Consecutive days differ by exactly 1.
check('consecutive', gregorianToJDN(2000, 1, 2) - gregorianToJDN(2000, 1, 1) === 1);
// 7. 2000-01-01 was a Saturday.
check('weekday J2000', weekdayFromJDN(gregorianToJDN(2000, 1, 1)) === 'Saturday');
// 8. 1970-01-01 was a Thursday.
check('weekday Unix', weekdayFromJDN(gregorianToJDN(1970, 1, 1)) === 'Thursday');
// 9. 2000 was a leap year: 366 days between Jan 1 2000 and Jan 1 2001.
check('leap year span', gregorianToJDN(2001, 1, 1) - gregorianToJDN(2000, 1, 1) === 366);
// 10. Day of year for March 1 in a leap year is 61.
check('day of year', dayOfYear(2000, 3, 1) === 61 && dayOfYear(2001, 1, 1) === 1);

console.log(passed + ' checks passed.');
