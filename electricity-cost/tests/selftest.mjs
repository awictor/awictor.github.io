import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dailyKwh, dailyCost, annualCost, costOverDays } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 1000 W for 24 h is 24 kWh.
check('kwh 24', dailyKwh(1000, 24) === 24);
// 2. 100 W for 10 h is 1 kWh.
check('kwh 1', dailyKwh(100, 10) === 1);
// 3. 24 kWh at 15 cents is $3.60.
check('daily cost', near(dailyCost(24, 0.15), 3.6));
// 4. A dollar a day is $365 a year.
check('annual', annualCost(1) === 365);
// 5. A 1000 W heater 24 h/day for a month at 15c.
check('over days', near(costOverDays(1000, 24, 0.15, 30), 108));
// 6. Energy scales with wattage.
check('watt scaling', dailyKwh(2000, 24) === 2 * dailyKwh(1000, 24));
// 7. costOverDays for one day equals a single day's cost.
check('one day', near(costOverDays(500, 6, 0.2, 1), dailyCost(dailyKwh(500, 6), 0.2)));
// 8. Full chain: 1000 W, 24 h, 15c/kWh over a year.
check('chain', near(annualCost(dailyCost(dailyKwh(1000, 24), 0.15)), 1314));
// 9. Negative wattage rejected.
let w = false; try { dailyKwh(-1, 24); } catch (e) { w = true; }
check('watt guard', w);
// 10. Negative days rejected.
let d = false; try { costOverDays(1000, 24, 0.15, -1); } catch (e) { d = true; }
check('days guard', d);

console.log(passed + ' checks passed.');
