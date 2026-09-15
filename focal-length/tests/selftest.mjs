import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { fieldOfView, focalFromFov, diagonal, cropFactor, equivalentFocalLength, FF_DIAG } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Full-frame 36mm wide, 50mm lens -> 2*atan(0.36) in degrees.
check('FOV(36,50)', near(fieldOfView(36, 50), 2 * Math.atan(0.36) * 180 / Math.PI));
// 2. d == f gives 2*atan(0.5) = 53.13 degrees.
check('FOV(36,36) = 53.13', near(fieldOfView(36, 36), 2 * Math.atan(0.5) * 180 / Math.PI));
// 3. focalFromFov inverts fieldOfView.
check('focal/fov round trip', near(focalFromFov(36, fieldOfView(36, 50)), 50, 1e-9));
// 4. Longer focal length -> narrower field of view.
check('longer focal narrower', fieldOfView(36, 100) < fieldOfView(36, 50));
// 5. Larger sensor -> wider field of view at same focal.
check('larger sensor wider', fieldOfView(36, 50) > fieldOfView(23.6, 50));
// 6. Full-frame diagonal ~ 43.2666.
check('FF diagonal', near(FF_DIAG, Math.sqrt(36 * 36 + 24 * 24)));
// 7. Crop factor of full frame is exactly 1.
check('crop factor full frame = 1', near(cropFactor(36, 24), 1));
// 8. APS-C (Nikon 23.6x15.7) crop factor ~ 1.526.
check('APS-C crop ~1.526', Math.abs(cropFactor(23.6, 15.7) - 1.5263) < 1e-3);
// 9. Equivalent focal length: 35mm on 1.5x crop = 52.5mm (using a 1.5x sensor).
check('equivalent focal', near(equivalentFocalLength(35, 36, 24), 35));
// 10. diagonal(3,4) = 5 (Pythagorean sanity).
check('diagonal 3,4,5', near(diagonal(3, 4), 5));

console.log(passed + ' checks passed.');
