import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { equivalentFocalLength, maxShutter, earthRotationArcsec } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Crop factor multiplies focal length.
check('equiv', equivalentFocalLength(20, 1.5) === 30);
// 2. Full-frame 20 mm at 500 rule allows 25 s.
check('shutter ff', maxShutter(20, 1) === 25);
// 3. On APS-C the same lens allows a shorter 16.67 s.
check('shutter apsc', near(maxShutter(20, 1.5), 500 / 30));
// 4. A 50 mm full-frame lens allows 10 s.
check('shutter 50', maxShutter(50, 1) === 10);
// 5. A longer lens needs a shorter exposure.
check('longer shorter', maxShutter(50, 1) < maxShutter(20, 1));
// 6. The stricter 300 rule gives a shorter exposure.
check('strict shorter', maxShutter(20, 1, 300) < maxShutter(20, 1, 500));
// 7. The sky drifts ~15.041 arcsec in one second.
check('drift 1s', earthRotationArcsec(1) === 15.041);
// 8. Drift scales with time.
check('drift 2s', near(earthRotationArcsec(2), 30.082));
// 9. A non-positive focal length is rejected.
let a = false; try { maxShutter(0, 1); } catch (e) { a = true; }
check('focal guard', a);
// 10. A non-positive crop factor is rejected.
let b = false; try { equivalentFocalLength(20, 0); } catch (e) { b = true; }
check('crop guard', b);

console.log(passed + ' checks passed.');
