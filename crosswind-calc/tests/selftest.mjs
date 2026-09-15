import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { runwayToHeading, windAngle, crosswindComponent, headwindComponent } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. A 90-degree wind is pure crosswind.
check('pure cross', near(crosswindComponent(20, 90), 20));
// 2. A head-on wind has no crosswind.
check('no cross', near(crosswindComponent(20, 0), 0));
// 3. A head-on wind is all headwind.
check('full head', near(headwindComponent(20, 0), 20));
// 4. A 90-degree wind has no headwind.
check('no head', near(headwindComponent(20, 90), 0));
// 5. At 30 degrees the crosswind is half the wind speed.
check('30 deg', near(crosswindComponent(20, 30), 10));
// 6. A wind from directly behind is a tailwind (negative headwind).
check('tailwind', near(headwindComponent(20, 180), -20));
// 7. Components satisfy Pythagoras: cross^2 + head^2 = speed^2.
check('pythagoras', near(Math.pow(crosswindComponent(20, 30), 2) + Math.pow(headwindComponent(20, 30), 2), 400));
// 8. Wind angle wraps correctly around the compass.
check('angle', windAngle(90, 90) === 0 && windAngle(90, 180) === 90 && windAngle(10, 350) === 20);
// 9. Runway 27 points to 270 degrees.
check('runway', runwayToHeading(27) === 270 && runwayToHeading(9) === 90);
// 10. Negative wind speed rejected.
let s = false; try { crosswindComponent(-5, 90); } catch (e) { s = true; }
check('speed guard', s);

console.log(passed + ' checks passed.');
