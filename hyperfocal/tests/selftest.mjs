import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hyperfocal, nearLimit, farLimit, depthOfField } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

const f = 50, N = 8, c = 0.03; // mm
const H = hyperfocal(f, N, c);

// 1. Hyperfocal H = f^2/(Nc) + f = 2500/0.24 + 50 = 10466.6667 mm.
check('hyperfocal value', near(H, 2500 / 0.24 + 50, 1e-3));
// 2. Focusing at H makes the far limit infinite.
check('far infinite at H', farLimit(f, H, H) === Infinity);
// 3. Focusing at H, near limit is H/2.
check('near = H/2 at H', near(nearLimit(f, H, H), H / 2, 1e-6));
// 4. Longer focal length increases hyperfocal distance.
check('longer f bigger H', hyperfocal(100, N, c) > hyperfocal(50, N, c));
// 5. Larger aperture number (smaller opening) decreases H.
check('bigger N smaller H', hyperfocal(f, 16, c) < hyperfocal(f, 8, c));
// 6. Smaller circle of confusion increases H.
check('smaller coc bigger H', hyperfocal(f, N, 0.015) > hyperfocal(f, N, 0.03));
// 7. For focus closer than H, the far limit is finite.
check('finite far below H', isFinite(farLimit(f, 3000, H)));
// 8. Near limit < focus distance < far limit for s < H.
check('focus within DOF', nearLimit(f, 3000, H) < 3000 && 3000 < farLimit(f, 3000, H));
// 9. DOF is infinite when focused at or beyond H.
check('infinite DOF beyond H', depthOfField(f, H + 1000, H) === Infinity);
// 10. Known near/far at s=3000mm match the closed-form values.
check('near/far explicit', near(nearLimit(f, 3000, H), 3000 * (H - f) / (H + 3000 - 2 * f)) &&
                            near(farLimit(f, 3000, H), 3000 * (H - f) / (H - 3000)));

console.log(passed + ' checks passed.');
