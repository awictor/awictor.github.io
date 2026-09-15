import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hourlyFromSalary, meetingCost, costPerMinute, annualCost } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 5 people, $50/h, 1 hour = $250.
check('base cost', meetingCost(5, 50, 1) === 250);
// 2. Half-hour meeting.
check('half hour', meetingCost(8, 75, 0.5) === 300);
// 3. Cost per minute.
check('per minute', costPerMinute(5, 60) === 5);
// 4. Salary -> hourly (2080 h/yr).
check('salary to hourly', hourlyFromSalary(104000) === 50);
// 5. Exactly 2080 salary -> $1/h.
check('unit salary', hourlyFromSalary(2080) === 1);
// 6. Annual cost of a weekly meeting.
check('annual weekly', annualCost(250, 1) === 13000);
// 7. Annual with explicit frequency and weeks.
check('annual explicit', annualCost(250, 5, 52) === 65000);
// 8. Linear in attendees.
check('linear people', meetingCost(10, 50, 1) === 2 * meetingCost(5, 50, 1));
// 9. Per-minute × 60 equals a one-hour cost.
check('per-min consistency', near(costPerMinute(6, 90) * 60, meetingCost(6, 90, 1)));
// 10. Custom hours-per-year basis.
check('custom hours', hourlyFromSalary(100000, 2000) === 50);

console.log(passed + ' checks passed.');
