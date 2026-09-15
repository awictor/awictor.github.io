import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { resistorValue, powerDissipated, ledPower, nearestE12 } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 5V, 2V LED, 20mA -> 150 ohm.
check('R 5/2/20', resistorValue(5, 2, 20) === 150);
// 2. Power in the resistor.
check('power', near(powerDissipated(5, 2, 20), 0.06));
// 3. 12V, 3.2V, 20mA -> 440 ohm.
check('R 12/3.2/20', near(resistorValue(12, 3.2, 20), 440));
// 4. Nearest E12 of 440 is 470.
check('E12 440', nearestE12(440) === 470);
// 5. Exact E12 value passes through.
check('E12 150', nearestE12(150) === 150);
// 6. E12 handles small values via the -1 decade.
check('E12 1', nearestE12(1) === 1);
// 7. LED power.
check('led power', near(ledPower(2, 20), 0.04));
// 8. Supply must exceed forward voltage.
let g = false; try { resistorValue(2, 3, 20); } catch (e) { g = true; }
check('voltage guard', g);
// 9. Higher current -> lower resistance.
check('higher current lower R', resistorValue(5, 2, 40) < resistorValue(5, 2, 20));
// 10. E12 of 1000 is 1000.
check('E12 1000', nearestE12(1000) === 1000);

console.log(passed + ' checks passed.');
