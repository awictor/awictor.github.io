import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dipoleLengthFeet, dipoleLegFeet, quarterWaveVerticalFeet, feetToMeters } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 468 MHz gives a 1-foot dipole by definition of the rule.
check('468 rule', dipoleLengthFeet(468) === 1);
// 2. A 40m dipole near 7.1 MHz is 468/7.1 ft.
check('40m band', near(dipoleLengthFeet(7.1), 468 / 7.1));
// 3. Each leg is 234/f.
check('leg', dipoleLegFeet(234) === 1);
// 4. Total dipole is twice a leg.
check('total = 2 legs', near(dipoleLengthFeet(14), 2 * dipoleLegFeet(14)));
// 5. A quarter-wave vertical equals one dipole leg.
check('quarter = leg', quarterWaveVerticalFeet(7.1) === dipoleLegFeet(7.1));
// 6. 234 MHz quarter-wave is 1 foot.
check('quarter foot', quarterWaveVerticalFeet(234) === 1);
// 7. Feet to meters conversion.
check('feet->meters', near(feetToMeters(1), 0.3048));
// 8. Length is inversely proportional to frequency.
check('inverse f', near(dipoleLengthFeet(14), dipoleLengthFeet(7) / 2));
// 9. Non-positive frequency rejected (dipole).
let d = false; try { dipoleLengthFeet(0); } catch (e) { d = true; }
check('freq guard', d);
// 10. Non-positive frequency rejected (leg).
let l = false; try { dipoleLegFeet(-1); } catch (e) { l = true; }
check('leg guard', l);

console.log(passed + ' checks passed.');
