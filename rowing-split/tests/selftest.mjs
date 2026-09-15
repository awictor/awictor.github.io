import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { split500, paceToWatts, wattsToSplit, caloriesPerHour } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. A 2k in 8:00 is a 2:00 (120 s) split.
check('split 2k', split500(2000, 480) === 120);
// 2. A 2:00 split is ~202.5 watts.
check('pace to watts', near(paceToWatts(120), 2.80 / Math.pow(0.24, 3)));
// 3. Watts back to split round-trips.
check('round trip 1', near(wattsToSplit(paceToWatts(120)), 120));
// 4. Split back to watts round-trips.
check('round trip 2', near(paceToWatts(wattsToSplit(200)), 200));
// 5. A faster (lower) split means more watts.
check('faster more watts', paceToWatts(110) > paceToWatts(120));
// 6. Split scales with time over distance.
check('split scaling', split500(1000, 240) === 120);
// 7. Same pace gives the same split at any distance.
check('pace invariant', split500(2000, 480) === split500(4000, 960));
// 8. Concept2 calorie formula.
check('calories', near(caloriesPerHour(200), 4 * 200 * 0.8604 + 300));
// 9. Zero split rejected.
let s = false; try { paceToWatts(0); } catch (e) { s = true; }
check('split guard', s);
// 10. Zero watts rejected.
let w = false; try { wattsToSplit(0); } catch (e) { w = true; }
check('watts guard', w);

console.log(passed + ' checks passed.');
