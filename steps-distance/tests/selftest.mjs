import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { strideLengthFromHeight, distanceKm, stepsForDistance, caloriesWalked } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Stride is 0.415 of height.
check('stride', near(strideLengthFromHeight(170), 170 * 0.415));
// 2. 10000 steps at 70 cm stride is 7 km.
check('distance', near(distanceKm(10000, 70), 7));
// 3. Steps-for-distance inverts it.
check('steps inverse', near(stepsForDistance(7, 70), 10000));
// 4. Round trip.
check('round trip', near(distanceKm(stepsForDistance(5, 68), 68), 5));
// 5. A longer stride covers more distance.
check('longer more', distanceKm(10000, 80) > distanceKm(10000, 70));
// 6. Calories walked.
check('calories', near(caloriesWalked(5, 70), 5 * 70 * 0.57));
// 7. A heavier person burns more.
check('heavier more', caloriesWalked(5, 90) > caloriesWalked(5, 70));
// 8. Zero steps is zero distance.
check('zero steps', distanceKm(0, 70) === 0);
// 9. Zero stride is rejected for steps-for-distance.
let s = false; try { stepsForDistance(5, 0); } catch (e) { s = true; }
check('stride guard', s);
// 10. Negative steps are rejected.
let n = false; try { distanceKm(-100, 70); } catch (e) { n = true; }
check('steps guard', n);

console.log(passed + ' checks passed.');
