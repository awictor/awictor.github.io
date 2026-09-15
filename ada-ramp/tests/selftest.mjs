import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { rampRun, rampLength, isADACompliant, minRampLengthADA } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. A 30" rise at 1:12 needs a 360" (30 ft) run.
check('run 30in', rampRun(30, 12) === 360);
// 2. Run scales linearly with rise.
check('run scaling', rampRun(60, 12) === 2 * rampRun(30, 12));
// 3. Ramp length is the hypotenuse (3-4-5 triangle).
check('ramp 3-4-5', rampLength(3, 4) === 5);
// 4. Minimum ADA ramp length for a 30" rise.
check('min length', near(minRampLengthADA(30), Math.sqrt(30 * 30 + 360 * 360)));
// 5. Exactly 1:12 is compliant.
check('exactly 1:12', isADACompliant(1, 12) === true);
// 6. 1:10 is too steep.
check('1:10 fails', isADACompliant(1, 10) === false);
// 7. 1:20 is well within spec.
check('1:20 ok', isADACompliant(1, 20) === true);
// 8. The minimum ADA ramp uses a run of 12x the rise.
check('min uses 1:12', near(minRampLengthADA(12), rampLength(12, 144)));
// 9. Non-positive rise rejected.
let a = false; try { rampRun(0, 12); } catch (e) { a = true; }
check('rise guard', a);
// 10. Non-positive run rejected in compliance check.
let b = false; try { isADACompliant(10, 0); } catch (e) { b = true; }
check('run guard', b);

console.log(passed + ' checks passed.');
