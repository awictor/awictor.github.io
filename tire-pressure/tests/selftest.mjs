import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { fToRankine, psiToKpa, adjustedPressure, pressureChange } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;
const ATM = 14.6959;

// 1. No temperature change means no pressure change.
check('no change', near(adjustedPressure(32, 70, 70), 32));
// 2. Cooling matches the Gay-Lussac ratio.
check('cooling', near(adjustedPressure(32, 70, 60), (32 + ATM) * ((60 - -459.67) / (70 - -459.67)) - ATM));
// 3. Fahrenheit to Rankine at zero.
check('rankine 0', fToRankine(0) === 459.67);
// 4. Fahrenheit to Rankine at 70.
check('rankine 70', near(fToRankine(70), 529.67));
// 5. PSI to kPa.
check('kpa', near(psiToKpa(1), 6.894757));
// 6. kPa scales linearly.
check('kpa scaling', near(psiToKpa(32), 32 * 6.894757));
// 7. Colder means lower pressure.
check('colder lower', adjustedPressure(32, 70, 50) < 32);
// 8. Round trip back to the original temperature.
check('round trip', near(adjustedPressure(adjustedPressure(32, 70, 50), 50, 70), 32));
// 9. Pressure below absolute vacuum rejected.
let v = false; try { adjustedPressure(-20, 70, 60); } catch (e) { v = true; }
check('vacuum guard', v);
// 10. Temperature below absolute zero rejected.
let z = false; try { adjustedPressure(32, -500, 60); } catch (e) { z = true; }
check('abs zero guard', z);

console.log(passed + ' checks passed.');
