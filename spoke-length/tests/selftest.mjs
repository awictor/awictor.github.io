import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { crossAngle, spokeLength } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. A radial (0-cross) build has zero crossing angle.
check('radial angle', crossAngle(32, 0) === 0);
// 2. Crossing angle = 4*pi*crosses/spokes.
check('angle 32x3', near(crossAngle(32, 3), 4 * Math.PI * 3 / 32));
// 3. Known 3-cross spoke: ERD 600, flange 45, offset 35, 32 spokes ≈ 292.92 mm.
check('spoke 3x', near(spokeLength(600, 45, 35, 32, 3), 292.9193461740259, 1e-6));
// 4. Radial spoke reduces to sqrt((r-f)^2 + h^2) - hole/2.
check('spoke radial', near(spokeLength(600, 45, 35, 32, 0), Math.sqrt((300 - 22.5) ** 2 + 35 ** 2) - 1.3, 1e-6));
// 5. More crosses lengthen the spoke.
check('more crosses longer', spokeLength(600, 45, 35, 32, 3) > spokeLength(600, 45, 35, 32, 0));
// 6. A larger rim needs a longer spoke.
check('larger rim longer', spokeLength(620, 45, 35, 32, 3) > spokeLength(600, 45, 35, 32, 3));
// 7. A larger spoke-hole diameter shortens the length.
check('bigger hole shorter', spokeLength(600, 45, 35, 32, 3, 4) < spokeLength(600, 45, 35, 32, 3, 2));
// 8. A non-positive spoke count is rejected.
let a = false; try { crossAngle(0, 3); } catch (e) { a = true; }
check('spoke-count guard', a);
// 9. Negative crosses are rejected.
let b = false; try { crossAngle(32, -1); } catch (e) { b = true; }
check('crosses guard', b);
// 10. A non-positive ERD is rejected.
let c = false; try { spokeLength(0, 45, 35, 32, 3); } catch (e) { c = true; }
check('erd guard', c);

console.log(passed + ' checks passed.');
