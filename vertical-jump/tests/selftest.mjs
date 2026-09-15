import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hangTime, jumpHeightFromHangTime, takeoffVelocity, G } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Hang time for a 0.5 m jump.
check('hang time', near(hangTime(0.5), 2 * Math.sqrt(2 * 0.5 / G)));
// 2. Height from hang time inverts it.
check('height inverse', near(jumpHeightFromHangTime(hangTime(0.5)), 0.5));
// 3. h = g*t^2/8 reference.
check('formula', near(jumpHeightFromHangTime(1), G / 8));
// 4. Takeoff velocity = sqrt(2gh).
check('velocity', near(takeoffVelocity(0.5), Math.sqrt(2 * G * 0.5)));
// 5. A higher jump has longer hang time.
check('higher longer', hangTime(0.6) > hangTime(0.5));
// 6. Full round trip.
check('round trip', near(hangTime(jumpHeightFromHangTime(0.7)), 0.7));
// 7. Higher jump needs more takeoff speed.
check('faster takeoff', takeoffVelocity(0.6) > takeoffVelocity(0.5));
// 8. Zero jump is zero hang time.
check('zero', hangTime(0) === 0);
// 9. Negative height is rejected.
let h = false; try { hangTime(-0.5); } catch (e) { h = true; }
check('height guard', h);
// 10. Negative hang time is rejected.
let t = false; try { jumpHeightFromHangTime(-1); } catch (e) { t = true; }
check('time guard', t);

console.log(passed + ' checks passed.');
