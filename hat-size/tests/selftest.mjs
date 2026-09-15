import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cmToInches, inchesToCm, usHatSize, euHatSize, nearestEighth } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. US size is circumference (inches) over pi.
check('us size', near(usHatSize(7 * Math.PI), 7));
// 2. It scales linearly.
check('us scales', near(usHatSize(8 * Math.PI), 8));
// 3. EU size is circumference in cm, rounded.
check('eu size', euHatSize(57) === 57);
// 4. EU rounds to the nearest cm.
check('eu rounds', euHatSize(57.4) === 57);
// 5. cm to inches.
check('cm to in', near(cmToInches(2.54), 1));
// 6. inches to cm.
check('in to cm', near(inchesToCm(1), 2.54));
// 7. Unit conversions round trip.
check('round trip', near(cmToInches(inchesToCm(10)), 10));
// 8. Nearest eighth rounds correctly.
check('eighth', nearestEighth(7.16) === 7.125);
// 9. A bigger head gives a bigger US size.
check('bigger', usHatSize(23) > usHatSize(22));
// 10. Non-positive circumference is rejected.
let z = false; try { usHatSize(0); } catch (e) { z = true; }
check('guard', z);

console.log(passed + ' checks passed.');
