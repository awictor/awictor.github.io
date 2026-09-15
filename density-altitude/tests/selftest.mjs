import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isaTemperature, pressureAltitude, isaDeviation, densityAltitude } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. ISA temperature at sea level is 15C.
check('isa sea level', isaTemperature(0) === 15);
// 2. ISA drops ~1.98C per 1000 ft.
check('isa 1000ft', near(isaTemperature(1000), 13.02));
// 3. Standard altimeter gives pressure altitude equal to elevation.
check('pa standard', pressureAltitude(5000, 29.92) === 5000);
// 4. One inHg below standard adds 1000 ft.
check('pa low', near(pressureAltitude(5000, 28.92), 6000));
// 5. At ISA temperature, density altitude equals pressure altitude.
check('da at isa', near(densityAltitude(5000, isaTemperature(5000)), 5000));
// 6. Sea-level standard day is 0 density altitude.
check('da sea std', densityAltitude(0, 15) === 0);
// 7. 20C above standard at sea level adds 2400 ft.
check('da hot', densityAltitude(0, 35) === 2400);
// 8. ISA deviation is temperature minus standard.
check('deviation', isaDeviation(0, 25) === 10);
// 9. Hotter air means higher density altitude.
check('hotter higher', densityAltitude(0, 35) > densityAltitude(0, 15));
// 10. Non-positive altimeter setting rejected.
let a = false; try { pressureAltitude(5000, 0); } catch (e) { a = true; }
check('altimeter guard', a);

console.log(passed + ' checks passed.');
