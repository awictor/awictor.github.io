import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { futureValue, presentValue, requiredRate, periodsToReach } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. Future value compounds: 1000 at 5% for 10 periods.
check('fv', near(futureValue(1000, 0.05, 10), 1000 * Math.pow(1.05, 10)));
// 2. Present value discounts back.
check('pv', near(presentValue(1000 * Math.pow(1.05, 10), 0.05, 10), 1000));
// 3. PV and FV are inverses (round trip).
check('round trip', near(presentValue(futureValue(1000, 0.05, 10), 0.05, 10), 1000));
// 4. Required rate to double in 10 periods.
check('rate', near(requiredRate(1000, 2000, 10), Math.pow(2, 0.1) - 1));
// 5. Applying that rate actually doubles the money.
check('rate applies', near(futureValue(1000, requiredRate(1000, 2000, 10), 10), 2000));
// 6. Periods to double at 5% is ln2/ln1.05.
check('periods', near(periodsToReach(1000, 2000, 0.05), Math.log(2) / Math.log(1.05)));
// 7. A zero rate leaves the value unchanged.
check('zero rate', futureValue(1000, 0, 10) === 1000);
// 8. Solving periods then applying reproduces the target.
check('periods round trip', near(futureValue(1000, 0.05, periodsToReach(1000, 2000, 0.05)), 2000));
// 9. Rate of -100% or worse is rejected.
let r = false; try { presentValue(1000, -1, 10); } catch (e) { r = true; }
check('rate guard', r);
// 10. Non-positive present value is rejected when solving for rate.
let p = false; try { requiredRate(0, 2000, 10); } catch (e) { p = true; }
check('pv guard', p);

console.log(passed + ' checks passed.');
