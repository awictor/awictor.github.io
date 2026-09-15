import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { force, springConstant, displacement, potentialEnergy, energyFromForce } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. F = kx: 200 N/m stretched 0.1 m -> 20 N.
check('force', near(force(200, 0.1), 20));
// 2. k = F/x: 20 N at 0.1 m -> 200 N/m.
check('spring constant', near(springConstant(20, 0.1), 200));
// 3. x = F/k: 20 N with 200 N/m -> 0.1 m.
check('displacement', near(displacement(20, 200), 0.1));
// 4. Elastic PE E = 1/2 k x^2 = 1 J.
check('potential energy', near(potentialEnergy(200, 0.1), 1));
// 5. E = 1/2 F x is consistent (since F = kx).
check('energy from force', near(energyFromForce(20, 0.1), potentialEnergy(200, 0.1)));
// 6. Force is linear in displacement (double x -> double F).
check('linear', near(force(200, 0.2), 2 * force(200, 0.1)));
// 7. Energy is quadratic in displacement (double x -> 4x energy).
check('quadratic energy', near(potentialEnergy(200, 0.2), 4 * potentialEnergy(200, 0.1)));
// 8. springConstant inverts force.
check('k round trip', near(springConstant(force(350, 0.05), 0.05), 350));
// 9. displacement inverts force.
check('x round trip', near(displacement(force(200, 0.1), 200), 0.1));
// 10. Zero displacement guard throws.
let threw = false;
try { springConstant(20, 0); } catch (e) { threw = true; }
check('zero displacement guard', threw);

console.log(passed + ' checks passed.');
