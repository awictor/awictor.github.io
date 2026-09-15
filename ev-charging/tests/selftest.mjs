import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { energyToAdd, chargeTimeHours, chargeTimeFromTo, costToCharge } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 60 kWh from 20% to 80% adds 36 kWh.
check('energy', energyToAdd(60, 20, 80) === 36);
// 2. 60 kWh at 7 kW, ideal, is 60/7 hours.
check('time ideal', near(chargeTimeHours(60, 7, 1), 60 / 7));
// 3. 90% efficiency stretches it.
check('time eff', near(chargeTimeHours(60, 7, 0.9), 60 / 6.3));
// 4. 20-80% charge time at 7 kW.
check('from-to', near(chargeTimeFromTo(60, 20, 80, 7, 1), 36 / 7));
// 5. Cost of 36 kWh at 15 cents.
check('cost', near(costToCharge(36, 0.15), 5.4));
// 6. Double the charger, half the time.
check('charger inverse', chargeTimeHours(60, 14, 1) === chargeTimeHours(60, 7, 1) / 2);
// 7. A full charge adds the whole battery.
check('full', energyToAdd(60, 0, 100) === 60);
// 8. From 0-100% matches charging the whole battery.
check('consistency', chargeTimeFromTo(60, 0, 100, 7, 1) === chargeTimeHours(60, 7, 1));
// 9. Zero charger power rejected.
let c = false; try { chargeTimeHours(60, 0, 1); } catch (e) { c = true; }
check('charger guard', c);
// 10. Efficiency above 1 rejected.
let e = false; try { chargeTimeHours(60, 7, 1.5); } catch (err) { e = true; }
check('efficiency guard', e);

console.log(passed + ' checks passed.');
