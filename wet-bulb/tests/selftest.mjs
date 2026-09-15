import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { wetBulbC, wetBulbF, cToF, fToC, heatRiskC } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 0.01) => Math.abs(a - b) < t;

// 1. Stull reference: 30 C, 50% RH -> ~22.30 C.
check('ref 30/50', near(wetBulbC(30, 50), 22.2968));
// 2. Reference: 20 C, 50% RH -> ~13.70 C.
check('ref 20/50', near(wetBulbC(20, 50), 13.6993));
// 3. At 100% RH wet bulb is close to dry bulb.
check('saturated', near(wetBulbC(25, 100), 25, 0.1));
// 4. Wet bulb is at or below dry bulb.
check('below dry', wetBulbC(30, 50) < 30);
// 5. Drier air lowers the wet bulb.
check('drier lower', wetBulbC(30, 20) < wetBulbC(30, 80));
// 6. Hotter air raises the wet bulb at fixed humidity.
check('hotter higher', wetBulbC(35, 50) > wetBulbC(25, 50));
// 7. Fahrenheit path matches the Celsius result converted.
check('fahrenheit', near(wetBulbF(cToF(30), 50), cToF(wetBulbC(30, 50)), 1e-6));
// 8. Celsius/Fahrenheit conversions round trip.
check('convert round trip', near(fToC(cToF(30)), 30));
// 9. Risk bands escalate with wet-bulb temperature.
check('risk bands', heatRiskC(22) === 'Low' && heatRiskC(33) === 'Danger' && heatRiskC(36) === 'Extreme');
// 10. Out-of-range humidity is rejected.
let bad = false; try { wetBulbC(30, 120); } catch (e) { bad = true; }
check('humidity guard', bad);

console.log(passed + ' checks passed.');
