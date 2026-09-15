import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { magnification, focalRatio, exitPupil, maxUsefulMagnification } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 2000mm scope with a 20mm eyepiece gives 100x.
check('mag 100', magnification(2000, 20) === 100);
// 2. Magnification scales with telescope focal length.
check('mag scaling', magnification(4000, 20) === 2 * magnification(2000, 20));
// 3. 2000mm over 200mm aperture is f/10.
check('f/10', focalRatio(2000, 200) === 10);
// 4. 1200mm over 100mm is f/12.
check('f/12', focalRatio(1200, 100) === 12);
// 5. 200mm aperture at 100x gives a 2mm exit pupil.
check('exit pupil', exitPupil(200, 100) === 2);
// 6. Exit pupil is aperture over magnification.
check('exit pupil 1mm', exitPupil(100, magnification(2000, 20)) === 1);
// 7. Max useful magnification is 2x the aperture in mm.
check('max useful', maxUsefulMagnification(100) === 200);
// 8. Exit pupil shrinks as magnification rises.
check('exit pupil monotonic', exitPupil(200, 200) < exitPupil(200, 100));
// 9. Zero eyepiece rejected.
let e = false; try { magnification(2000, 0); } catch (err) { e = true; }
check('eyepiece guard', e);
// 10. Zero aperture rejected in focal ratio.
let a = false; try { focalRatio(2000, 0); } catch (err) { a = true; }
check('aperture guard', a);

console.log(passed + ' checks passed.');
