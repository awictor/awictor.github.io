import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { billableHoursPerYear, requiredHourlyRate, annualIncomeFromRate, effectiveHourlyRate } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Billable hours are weekly hours times weeks.
check('billable', billableHoursPerYear(30, 48) === 1440);
// 2. Required rate covers income plus expenses.
check('rate', requiredHourlyRate(80000, 20000, 1000) === 100);
// 3. Income from that rate round trips.
check('round trip', annualIncomeFromRate(100, 1000, 20000) === 80000);
// 4. Higher expenses raise the required rate.
check('expenses raise', requiredHourlyRate(80000, 30000, 1000) > requiredHourlyRate(80000, 20000, 1000));
// 5. Fewer billable hours raise the required rate.
check('fewer hours raise', requiredHourlyRate(80000, 20000, 800) > requiredHourlyRate(80000, 20000, 1000));
// 6. Effective rate spreads income over all hours worked.
check('effective', effectiveHourlyRate(80000, 2000) === 40);
// 7. Effective rate is below the billed rate when time is non-billable.
check('effective below billed', effectiveHourlyRate(80000, 2000) < requiredHourlyRate(80000, 20000, 1000));
// 8. Zero billable hours is rejected.
let b = false; try { requiredHourlyRate(80000, 20000, 0); } catch (e) { b = true; }
check('billable guard', b);
// 9. Zero total hours is rejected for effective rate.
let t0 = false; try { effectiveHourlyRate(80000, 0); } catch (e) { t0 = true; }
check('total hours guard', t0);
// 10. Negative weekly hours are rejected.
let n = false; try { billableHoursPerYear(-5, 48); } catch (e) { n = true; }
check('negative guard', n);

console.log(passed + ' checks passed.');
