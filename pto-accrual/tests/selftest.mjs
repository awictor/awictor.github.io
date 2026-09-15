import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { accrualPerHour, accruedPto, accrualPerPayPeriod, ptoInDays } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 80 hours over 2080 worked is ~0.03846/hr.
check('per hour', near(accrualPerHour(80, 2080), 80 / 2080));
// 2. Accrued PTO is hours times rate.
check('accrued', accruedPto(1000, 0.04) === 40);
// 3. Working the full year accrues the full allowance.
check('full year', near(accruedPto(2080, accrualPerHour(80, 2080)), 80));
// 4. Per-pay-period accrual.
check('per period', near(accrualPerPayPeriod(80, 26), 80 / 26));
// 5. Pay-period accrual over the year sums to the allowance.
check('period sums', near(accrualPerPayPeriod(80, 26) * 26, 80));
// 6. Hours convert to days.
check('days', ptoInDays(80, 8) === 10);
// 7. More hours worked means more accrued.
check('more hours', accruedPto(2000, 0.04) > accruedPto(1000, 0.04));
// 8. Zero hours worked accrues nothing.
check('zero worked', accruedPto(0, 0.04) === 0);
// 9. Zero work hours per year is rejected.
let w = false; try { accrualPerHour(80, 0); } catch (e) { w = true; }
check('work guard', w);
// 10. Zero hours per day is rejected.
let d = false; try { ptoInDays(80, 0); } catch (e) { d = true; }
check('day guard', d);

console.log(passed + ' checks passed.');
