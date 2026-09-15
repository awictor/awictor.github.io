import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { solenoidInductanceUH, turnsForInductance, inductiveReactance, microToHenry } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. Wheeler's formula: 1" dia, 1" long, 10 turns -> 100/58 uH.
check('wheeler', near(solenoidInductanceUH(1, 1, 10), 100 / 58));
// 2. Another point: 2" dia, 4" long, 100 turns.
check('wheeler 2', near(solenoidInductanceUH(2, 4, 100), 40000 / 196));
// 3. Turns needed round-trips back to 10.
check('round trip', near(turnsForInductance(solenoidInductanceUH(1, 1, 10), 1, 1), 10));
// 4. Inductance grows with the square of the turns.
check('N squared', near(solenoidInductanceUH(1, 1, 20), 4 * solenoidInductanceUH(1, 1, 10)));
// 5. Reactance of 1 mH at 1000/(2pi) Hz is... use XL = 2*pi*f*L: 1e-3 H at 1000 Hz.
check('reactance', near(inductiveReactance(1e-3, 1000), 2 * Math.PI));
// 6. Reactance scales with frequency.
check('reactance scaling', near(inductiveReactance(1, 2), 2 * inductiveReactance(1, 1)));
// 7. Microhenries to henries.
check('uH->H', near(microToHenry(1), 1e-6));
// 8. 1000 uH is 1 mH.
check('1000uH', microToHenry(1000) === 1e-3);
// 9. Non-positive diameter rejected.
let d = false; try { solenoidInductanceUH(0, 1, 10); } catch (e) { d = true; }
check('diameter guard', d);
// 10. Non-positive turns rejected.
let t = false; try { solenoidInductanceUH(1, 1, 0); } catch (e) { t = true; }
check('turns guard', t);

console.log(passed + ' checks passed.');
