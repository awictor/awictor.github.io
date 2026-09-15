import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { centripetalAcceleration, centripetalForce, angularVelocity, period, forceFromAngular } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. a = v^2/r: 10 m/s at r=5 -> 20 m/s^2.
check('acceleration', near(centripetalAcceleration(10, 5), 20));
// 2. F = m*a: m=2 -> 40 N.
check('force', near(centripetalForce(2, 10, 5), 40));
// 3. Angular velocity omega = v/r = 2 rad/s.
check('angular velocity', near(angularVelocity(10, 5), 2));
// 4. Period T = 2*pi*r/v = pi seconds for r=5, v=10.
check('period', near(period(10, 5), Math.PI));
// 5. F = m*omega^2*r is consistent with mv^2/r (v = omega*r).
check('angular force consistency', near(forceFromAngular(2, 2, 5), centripetalForce(2, 10, 5)));
// 6. Doubling speed quadruples the force.
check('double v quadruples F', near(centripetalForce(2, 20, 5), 4 * centripetalForce(2, 10, 5)));
// 7. Doubling radius at fixed speed halves the force.
check('double r halves F', near(centripetalForce(2, 10, 10), centripetalForce(2, 10, 5) / 2));
// 8. Zero speed gives zero force.
check('zero speed zero force', centripetalForce(2, 0, 5) === 0);
// 9. forceFromAngular scales with omega squared.
check('omega squared', near(forceFromAngular(3, 4, 2), 3 * 16 * 2));
// 10. Non-positive radius throws.
let threw = false;
try { centripetalAcceleration(10, 0); } catch (e) { threw = true; }
check('radius guard', threw);

console.log(passed + ' checks passed.');
