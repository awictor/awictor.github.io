import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { stringFrequency, stringTension, linearDensity, harmonicFrequency } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Reference: L=0.5, T=100, mu=0.01 -> 100 Hz.
check('frequency', near(stringFrequency(0.5, 100, 0.01), 100));
// 2. Reference tension for that note is 100 N.
check('tension', near(stringTension(0.5, 100, 0.01), 100));
// 3. Frequency <-> tension round trip.
check('round trip', near(stringTension(0.5, stringFrequency(0.5, 100, 0.01), 0.01), 100));
// 4. Linear density solves back.
check('density', near(linearDensity(0.5, 100, 100), 0.01));
// 5. A longer string sounds lower.
check('longer lower', stringFrequency(1, 100, 0.01) < stringFrequency(0.5, 100, 0.01));
// 6. More tension raises the pitch.
check('tighter higher', stringFrequency(0.5, 200, 0.01) > stringFrequency(0.5, 100, 0.01));
// 7. Tension scales with the square of frequency (octave up -> 4x).
check('tension square', near(stringTension(0.5, 200, 0.01) / stringTension(0.5, 100, 0.01), 4));
// 8. The second harmonic is twice the fundamental.
check('harmonic', harmonicFrequency(100, 2) === 200);
// 9. Zero length is rejected.
let l = false; try { stringFrequency(0, 100, 0.01); } catch (e) { l = true; }
check('length guard', l);
// 10. A non-integer harmonic is rejected.
let h = false; try { harmonicFrequency(100, 2.5); } catch (e) { h = true; }
check('harmonic guard', h);

console.log(passed + ' checks passed.');
