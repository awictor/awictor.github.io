import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { speedOfSound, axialMode, axialModes } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. First axial mode of a 3.43 m wall (c=343) is 50 Hz.
check('mode n1', axialMode(3.43, 1) === 50);
// 2. The second harmonic is twice the fundamental.
check('mode n2', axialMode(3.43, 2) === 100);
// 3. A wider room has a lower fundamental.
check('bigger lower', axialMode(6.86, 1) === 25);
// 4. Longer dimension => lower frequency.
check('monotonic', axialMode(6.86, 1) < axialMode(3.43, 1));
// 5. Speed of sound at 0 °C is 331.3 m/s.
check('sos 0', speedOfSound(0) === 331.3);
// 6. Speed of sound at 20 °C ≈ 343.42 m/s.
check('sos 20', near(speedOfSound(20), 343.42));
// 7. axialModes lists count modes per axis (3 axes x 3 = 9).
check('count', axialModes(5, 4, 2.6, 3).length === 9);
// 8. The returned modes are sorted ascending by frequency.
check('sorted', (function () {
  const m = axialModes(5, 4, 2.6, 3);
  for (let i = 1; i < m.length; i++) if (m[i].freq < m[i - 1].freq) return false;
  return true;
})());
// 9. A non-positive dimension is rejected.
let a = false; try { axialMode(0, 1); } catch (e) { a = true; }
check('dimension guard', a);
// 10. A mode number below 1 is rejected.
let b = false; try { axialMode(5, 0); } catch (e) { b = true; }
check('mode guard', b);

console.log(passed + ' checks passed.');
