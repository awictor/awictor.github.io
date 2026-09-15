import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { work, power, powerFromForceVelocity, toHorsepower } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. W = F·d at 0°.
check('work 0deg', work(10, 5) === 50);
// 2. 60° halves the work (cos60 = 0.5).
check('work 60deg', near(work(10, 5, 60), 25));
// 3. 90° does no work.
check('work 90deg', near(work(10, 5, 90), 0));
// 4. 180° (opposing) is negative.
check('work 180deg', near(work(10, 5, 180), -50));
// 5. Power = W/t.
check('power', power(100, 10) === 10);
// 6. Power from force and velocity.
check('P = Fv', powerFromForceVelocity(20, 5) === 100);
// 7. Consistency: P = W/t equals F·v when t = d/v.
check('consistency', near(power(work(30, 12), 12 / 4), powerFromForceVelocity(30, 4)));
// 8. Work is linear in distance.
check('linear', work(10, 10) === 2 * work(10, 5));
// 9. Time guard.
let z = false; try { power(100, 0); } catch (e) { z = true; }
check('time guard', z);
// 10. Horsepower conversion.
check('horsepower', near(toHorsepower(745.699872), 1));

console.log(passed + ' checks passed.');
