import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sensorDiagonal, cropFactor, equivalentFocalLength, equivalentAperture } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 0.01) => Math.abs(a - b) < t;

// 1. Full-frame diagonal is about 43.27 mm.
check('ff diagonal', near(sensorDiagonal(36, 24), 43.27));
// 2. Full frame has crop factor 1.
check('ff crop', near(cropFactor(sensorDiagonal(36, 24)), 1));
// 3. APS-C is about 1.53x.
check('apsc crop', near(cropFactor(sensorDiagonal(23.6, 15.7)), 1.526, 0.01));
// 4. Micro 4/3 is about 2x.
check('m43 crop', near(cropFactor(sensorDiagonal(17.3, 13)), 2.0, 0.02));
// 5. Equivalent focal length multiplies by crop factor.
check('equiv focal', equivalentFocalLength(50, 1.5) === 75);
// 6. Equivalent aperture multiplies by crop factor.
check('equiv aperture', near(equivalentAperture(1.8, 1.5), 2.7));
// 7. Full frame leaves focal length unchanged.
check('ff no change', equivalentFocalLength(50, 1) === 50);
// 8. A bigger crop factor gives a longer equivalent.
check('bigger crop longer', equivalentFocalLength(50, 2) > equivalentFocalLength(50, 1.5));
// 9. Zero sensor diagonal is rejected.
let z = false; try { cropFactor(0); } catch (e) { z = true; }
check('diagonal guard', z);
// 10. Non-positive sensor dimensions rejected.
let n = false; try { sensorDiagonal(0, 15.7); } catch (e) { n = true; }
check('dimension guard', n);

console.log(passed + ' checks passed.');
