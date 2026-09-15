import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pressure, force, area, paToPsi, paToBar, paToAtm } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. P = F/A.
check('pressure', pressure(100, 2) === 50);
// 2. F = P·A.
check('force', force(50, 2) === 100);
// 3. A = F/P.
check('area', area(100, 50) === 2);
// 4. Round trip.
check('round trip', near(pressure(force(50, 3), 3), 50));
// 5. Smaller area, more pressure.
check('smaller area more pressure', pressure(100, 1) > pressure(100, 2));
// 6. 1 psi ~ 6894.76 Pa.
check('psi', near(paToPsi(6894.757293), 1));
// 7. 1 bar = 100000 Pa.
check('bar', paToBar(1e5) === 1);
// 8. 1 atm = 101325 Pa.
check('atm', paToAtm(101325) === 1);
// 9. Area guard.
let z = false; try { pressure(1, 0); } catch (e) { z = true; }
check('area guard', z);
// 10. Pressure guard on area().
let z2 = false; try { area(1, 0); } catch (e) { z2 = true; }
check('pressure guard', z2);

console.log(passed + ' checks passed.');
