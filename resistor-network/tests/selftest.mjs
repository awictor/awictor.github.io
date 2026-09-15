import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { seriesResistance, parallelResistance, parallelPair } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Series resistances add up.
check('series', seriesResistance([100, 200, 300]) === 600);
// 2. A single resistor in series is itself.
check('series single', seriesResistance([470]) === 470);
// 3. Two equal in parallel halve.
check('parallel pair', parallelPair(100, 100) === 50);
// 4. parallelResistance agrees with parallelPair for two.
check('list vs pair', near(parallelResistance([100, 200]), parallelPair(100, 200)));
// 5. Three equal in parallel give R/3.
check('three parallel', near(parallelResistance([100, 100, 100]), 100 / 3));
// 6. Parallel total is below the smallest resistor.
check('parallel smaller', parallelResistance([100, 200, 300]) < 100);
// 7. Two equal in parallel equal R/2.
check('half', parallelResistance([60, 60]) === 30);
// 8. Series is always larger than parallel for the same set.
check('series vs parallel', seriesResistance([100, 200]) > parallelResistance([100, 200]));
// 9. Empty list is rejected.
let e0 = false; try { seriesResistance([]); } catch (e) { e0 = true; }
check('empty guard', e0);
// 10. Non-positive resistance is rejected.
let neg = false; try { parallelResistance([100, 0]); } catch (e) { neg = true; }
check('positive guard', neg);

console.log(passed + ' checks passed.');
