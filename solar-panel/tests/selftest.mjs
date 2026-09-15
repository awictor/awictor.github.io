import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { arrayWattsNeeded, panelCount, dailyOutputKwh, batteryBankAh } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. 10 kWh over 5 ideal sun hours needs a 2000 W array.
check('array ideal', arrayWattsNeeded(10, 5, 1) === 2000);
// 2. 80% system efficiency raises the requirement to 2500 W.
check('array losses', arrayWattsNeeded(10, 5, 0.8) === 2500);
// 3. 2000 W of 400 W panels is 5 panels.
check('panels', panelCount(2000, 400) === 5);
// 4. Any remainder rounds up a panel.
check('panels ceil', panelCount(2001, 400) === 6);
// 5. A 2000 W array over 5 ideal hours makes 10 kWh.
check('output', dailyOutputKwh(2000, 5, 1) === 10);
// 6. Sizing then generating round-trips back to the daily need.
check('round trip', near(dailyOutputKwh(arrayWattsNeeded(10, 5, 0.8), 5, 0.8), 10));
// 7. A 12V bank for 10 kWh is ~833 Ah.
check('battery 12v', near(batteryBankAh(10, 12, 1), 10000 / 12));
// 8. 48V at 50% depth of discharge needs ~417 Ah.
check('battery 48v', near(batteryBankAh(10, 48, 0.5), 10000 / 24));
// 9. Zero sun hours rejected.
let s = false; try { arrayWattsNeeded(10, 0, 0.8); } catch (e) { s = true; }
check('sun guard', s);
// 10. Efficiency above 1 rejected.
let e = false; try { arrayWattsNeeded(10, 5, 1.5); } catch (err) { e = true; }
check('efficiency guard', e);

console.log(passed + ' checks passed.');
