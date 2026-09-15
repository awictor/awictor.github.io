import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { fractionRemaining, remainingCaffeine, metabolizedMg, hoursToReach } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. One half-life leaves half the dose.
check('one half-life', remainingCaffeine(200, 5, 5) === 100);
// 2. Two half-lives leave a quarter.
check('two half-lives', remainingCaffeine(200, 10, 5) === 50);
// 3. At zero hours the full dose remains.
check('zero hours', remainingCaffeine(200, 0, 5) === 200);
// 4. Time to reach half is exactly one half-life.
check('reach half', hoursToReach(200, 100, 5) === 5);
// 5. Time to reach a quarter is two half-lives.
check('reach quarter', near(hoursToReach(200, 50, 5), 10));
// 6. Metabolized is dose minus remaining.
check('metabolized', metabolizedMg(200, 5, 5) === 100);
// 7. Fraction remaining at one half-life is 0.5.
check('fraction', near(fractionRemaining(5, 5), 0.5));
// 8. Remaining caffeine decreases over time.
check('monotonic', remainingCaffeine(200, 6, 5) < remainingCaffeine(200, 5, 5));
// 9. Non-positive half-life rejected.
let h = false; try { remainingCaffeine(200, 5, 0); } catch (e) { h = true; }
check('half-life guard', h);
// 10. Non-positive target rejected.
let t = false; try { hoursToReach(200, 0, 5); } catch (e) { t = true; }
check('target guard', t);

console.log(passed + ' checks passed.');
