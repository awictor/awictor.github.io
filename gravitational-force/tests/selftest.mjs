import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gravitationalForce, gravitationalField, G } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const rel = (a, b, t = 1e-9) => Math.abs(a - b) / Math.abs(b) < t;

// 1. Two 1 kg masses 1 m apart feel exactly G newtons.
check('two 1kg', gravitationalForce(1, 1, 1) === G);
// 2. Inverse-square in distance.
check('inverse square', rel(gravitationalForce(1, 1, 2), gravitationalForce(1, 1, 1) / 4));
// 3. Linear in each mass.
check('linear in masses', rel(gravitationalForce(2, 1, 1), 2 * gravitationalForce(1, 1, 1)) && rel(gravitationalForce(1, 3, 1), 3 * gravitationalForce(1, 1, 1)));
// 4. Symmetric in the two masses.
check('symmetric', rel(gravitationalForce(3, 7, 2), gravitationalForce(7, 3, 2)));
// 5. Earth–Moon force ~ 1.98e20 N.
check('earth-moon', rel(gravitationalForce(5.972e24, 7.342e22, 3.844e8), 1.98e20, 2e-2));
// 6. Earth's surface gravity ~ 9.8 m/s².
check('earth gravity', Math.abs(gravitationalField(5.972e24, 6.371e6) - 9.82) < 0.1);
// 7. Field is inverse-square.
check('field inverse square', rel(gravitationalField(1, 2), gravitationalField(1, 1) / 4));
// 8. Distance guard.
let z = false; try { gravitationalForce(1, 1, 0); } catch (e) { z = true; }
check('distance guard', z);
// 9. Field guard.
let z2 = false; try { gravitationalField(1, 0); } catch (e) { z2 = true; }
check('field guard', z2);
// 10. Constant value.
check('G value', G === 6.674e-11);

console.log(passed + ' checks passed.');
