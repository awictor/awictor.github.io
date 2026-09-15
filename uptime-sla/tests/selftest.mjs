import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { allowedDowntimeMinutes, downtimePerYear, downtimePerMonth, downtimePerDay, achievedUptime } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 0.01) => Math.abs(a - b) < t;

// 1. 99.9% is 525.6 minutes (8.76 h) per year.
check('three nines year', near(downtimePerYear(99.9), 525.6));
// 2. 99.99% is ~52.56 minutes per year.
check('four nines year', near(downtimePerYear(99.99), 52.56));
// 3. 100% uptime allows zero downtime.
check('perfect', downtimePerYear(100) === 0);
// 4. 99% of a day is 14.4 minutes.
check('day', near(downtimePerDay(99), 14.4));
// 5. Lower uptime means more downtime.
check('lower more', downtimePerYear(99) > downtimePerYear(99.9));
// 6. Achieved uptime inverts it.
check('achieved', near(achievedUptime(downtimePerYear(99.9), 365 * 1440), 99.9));
// 7. Monthly downtime for 99.9%.
check('month', near(downtimePerMonth(99.9), (1 - 0.999) * 30 * 1440));
// 8. Zero uptime means the whole period is down.
check('zero uptime', downtimePerDay(0) === 1440);
// 9. Uptime over 100 is rejected.
let u = false; try { downtimePerYear(101); } catch (e) { u = true; }
check('uptime guard', u);
// 10. Zero period is rejected for achieved uptime.
let p = false; try { achievedUptime(10, 0); } catch (e) { p = true; }
check('period guard', p);

console.log(passed + ' checks passed.');
