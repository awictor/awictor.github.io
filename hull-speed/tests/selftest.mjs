import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hullSpeed, speedLengthRatio, knotsToMph } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 36 ft waterline: 1.34 * 6 = 8.04 knots.
check('hs 36', near(hullSpeed(36), 8.04));
// 2. 25 ft waterline: 1.34 * 5 = 6.7 knots.
check('hs 25', near(hullSpeed(25), 6.7));
// 3. A longer waterline is faster.
check('longer faster', hullSpeed(49) > hullSpeed(36));
// 4. A custom coefficient scales the result.
check('coefficient', near(hullSpeed(36, 1.5), 1.5 * 6));
// 5. Speed-length ratio of hull speed itself is the coefficient 1.34.
check('slr = coef', near(speedLengthRatio(hullSpeed(36), 36), 1.34));
// 6. Speed-length ratio: 7 kn over 36 ft = 7/6.
check('slr 7kn', near(speedLengthRatio(7, 36), 7 / 6));
// 7. One knot is 1.15078 mph.
check('kn to mph', near(knotsToMph(1), 1.15078));
// 8. A non-positive waterline is rejected.
let a = false; try { hullSpeed(0); } catch (e) { a = true; }
check('lwl guard', a);
// 9. Speed-length ratio rejects a non-positive waterline.
let b = false; try { speedLengthRatio(7, 0); } catch (e) { b = true; }
check('slr guard', b);
// 10. A negative speed to mph is rejected.
let c = false; try { knotsToMph(-1); } catch (e) { c = true; }
check('mph guard', c);

console.log(passed + ' checks passed.');
