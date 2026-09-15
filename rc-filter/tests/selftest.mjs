import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { rcCutoff, timeConstant, resistorForCutoff, capacitorForCutoff, lcResonance } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const rel = (a, b, t = 1e-9) => Math.abs(a - b) / Math.abs(b) < t;

// 1. 1kOhm + 1uF -> ~159.155 Hz.
check('RC cutoff 1k/1uF', rel(rcCutoff(1000, 1e-6), 1 / (2 * Math.PI * 1e-3)));
// 2. That cutoff is ~159.155 Hz numerically.
check('cutoff numeric', Math.abs(rcCutoff(1000, 1e-6) - 159.15494) < 1e-3);
// 3. Time constant tau = RC = 1ms.
check('time constant', rel(timeConstant(1000, 1e-6), 1e-3));
// 4. resistorForCutoff inverts rcCutoff.
check('solve R round trip', rel(resistorForCutoff(rcCutoff(1000, 1e-6), 1e-6), 1000));
// 5. capacitorForCutoff inverts rcCutoff.
check('solve C round trip', rel(capacitorForCutoff(rcCutoff(1000, 1e-6), 1000), 1e-6));
// 6. Larger RC product -> lower cutoff.
check('bigger RC lower fc', rcCutoff(2000, 1e-6) < rcCutoff(1000, 1e-6));
// 7. Doubling R halves the cutoff.
check('double R halves fc', rel(rcCutoff(2000, 1e-6), rcCutoff(1000, 1e-6) / 2));
// 8. LC resonance 1mH + 1nF -> ~159154.9 Hz.
check('LC resonance', rel(lcResonance(1e-3, 1e-9), 1 / (2 * Math.PI * 1e-6)));
// 9. LC resonance is symmetric in L and C.
check('LC symmetric', rel(lcResonance(1e-3, 1e-9), lcResonance(1e-9, 1e-3)));
// 10. Quadrupling LC halves the resonant frequency.
check('4x LC halves resonance', rel(lcResonance(4e-3, 1e-9), lcResonance(1e-3, 1e-9) / 2));

console.log(passed + ' checks passed.');
