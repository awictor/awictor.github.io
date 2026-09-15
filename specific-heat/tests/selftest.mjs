import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { heat, specificHeat, massFromHeat, deltaTfromHeat } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Heating 1 kg of water by 10 K needs 41860 J.
check('water', heat(1, 4186, 10) === 41860);
// 2. Another material.
check('generic', heat(2, 900, 5) === 9000);
// 3. Solve for specific heat.
check('solve c', specificHeat(41860, 1, 10) === 4186);
// 4. Solve for mass.
check('solve m', massFromHeat(41860, 4186, 10) === 1);
// 5. Solve for temperature change.
check('solve dT', deltaTfromHeat(41860, 1, 4186) === 10);
// 6. Round trip.
check('round trip', near(specificHeat(heat(3, 450, 8), 3, 8), 450));
// 7. Linear in mass.
check('linear mass', heat(2, 4186, 10) === 2 * heat(1, 4186, 10));
// 8. Cooling gives negative Q.
check('cooling negative', heat(1, 4186, -10) === -41860);
// 9. Zero mass guard.
let z = false; try { specificHeat(100, 0, 10); } catch (e) { z = true; }
check('zero guard', z);
// 10. ΔT scales the heat.
check('dT scaling', deltaTfromHeat(2 * 41860, 1, 4186) === 20);

console.log(passed + ' checks passed.');
