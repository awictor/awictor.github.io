import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { shutterSpeed, shutterSpeedDenominator, shutterAngle } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. The 180-degree rule at 24 fps is 1/48 s.
check('180 rule', near(shutterSpeed(24, 180), 1 / 48));
// 2. Denominator form of the same.
check('denominator', near(shutterSpeedDenominator(24, 180), 48));
// 3. 180 degrees always gives a denominator of twice the frame rate.
check('twice fps', near(shutterSpeedDenominator(30, 180), 60));
// 4. A 360-degree shutter exposes for the full frame (1/fps).
check('full frame', near(shutterSpeed(24, 360), 1 / 24));
// 5. Angle round trips from shutter speed.
check('round trip', near(shutterAngle(24, shutterSpeed(24, 180)), 180));
// 6. A wider angle means a longer exposure.
check('wider longer', shutterSpeed(24, 270) > shutterSpeed(24, 180));
// 7. A higher frame rate shortens exposure at the same angle.
check('faster shorter', shutterSpeed(48, 180) < shutterSpeed(24, 180));
// 8. 90 degrees at 30 fps gives 1/120 s.
check('ninety', near(shutterSpeedDenominator(30, 90), 120));
// 9. Zero frame rate is rejected.
let f = false; try { shutterSpeed(0, 180); } catch (e) { f = true; }
check('fps guard', f);
// 10. An angle above 360 is rejected.
let a = false; try { shutterSpeed(24, 400); } catch (e) { a = true; }
check('angle guard', a);

console.log(passed + ' checks passed.');
