import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { orbitalPeriod, orbitalVelocityCircular, semiMajorAxisFromPeriod } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const rel = (a, b, t = 0.01) => Math.abs(a - b) / Math.abs(b) < t;

const AU = 1.496e11;      // Earth's semi-major axis (m)
const M_SUN = 1.989e30;   // solar mass (kg)
const YEAR = 3.156e7;     // seconds in a year (approx)

// 1. Earth's orbit is about one year.
check('earth year', rel(orbitalPeriod(AU, M_SUN), YEAR, 0.01));
// 2. Earth's circular velocity is ~29.8 km/s.
check('earth velocity', rel(orbitalVelocityCircular(AU, M_SUN), 29780, 0.01));
// 3. Semi-major axis round trips from the period.
check('axis round trip', rel(semiMajorAxisFromPeriod(orbitalPeriod(AU, M_SUN), M_SUN), AU, 1e-6));
// 4. Kepler's third law: T squared scales as a cubed (doubling a -> 8x T squared).
check('keplers law', rel(Math.pow(orbitalPeriod(2 * AU, M_SUN) / orbitalPeriod(AU, M_SUN), 2), 8, 1e-6));
// 5. Bigger orbits take longer.
check('bigger slower', orbitalPeriod(2 * AU, M_SUN) > orbitalPeriod(AU, M_SUN));
// 6. A heavier central body shortens the period.
check('heavier faster', orbitalPeriod(AU, 2 * M_SUN) < orbitalPeriod(AU, M_SUN));
// 7. Velocity falls off with radius.
check('velocity falls', orbitalVelocityCircular(2 * AU, M_SUN) < orbitalVelocityCircular(AU, M_SUN));
// 8. For a circular orbit, v = 2*pi*r / T.
check('v equals circumference over period', rel(orbitalVelocityCircular(AU, M_SUN), 2 * Math.PI * AU / orbitalPeriod(AU, M_SUN), 1e-6));
// 9. Non-positive mass is rejected.
let m = false; try { orbitalPeriod(AU, 0); } catch (e) { m = true; }
check('mass guard', m);
// 10. Non-positive axis is rejected.
let a = false; try { orbitalPeriod(0, M_SUN); } catch (e) { a = true; }
check('axis guard', a);

console.log(passed + ' checks passed.');
