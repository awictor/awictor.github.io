import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parallelCapacitance, seriesCapacitance, seriesPair, energyStored } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Parallel capacitances add.
check('parallel', parallelCapacitance([100, 200, 300]) === 600);
// 2. A single capacitor is itself.
check('single', parallelCapacitance([47]) === 47);
// 3. Two equal in series halve.
check('series pair', seriesPair(100, 100) === 50);
// 4. seriesCapacitance agrees with seriesPair for two.
check('list vs pair', near(seriesCapacitance([100, 200]), seriesPair(100, 200)));
// 5. Three equal in series give C/3.
check('three series', near(seriesCapacitance([100, 100, 100]), 100 / 3));
// 6. Series total is below the smallest.
check('series smaller', seriesCapacitance([100, 200, 300]) < 100);
// 7. Parallel is larger than series for the same set.
check('parallel vs series', parallelCapacitance([100, 200]) > seriesCapacitance([100, 200]));
// 8. Energy is half C V squared.
check('energy', near(energyStored(1e-6, 10), 0.5 * 1e-6 * 100));
// 9. Energy scales with the square of voltage.
check('energy square', near(energyStored(1e-6, 20) / energyStored(1e-6, 10), 4));
// 10. Non-positive capacitance is rejected.
let neg = false; try { seriesCapacitance([100, 0]); } catch (e) { neg = true; }
check('positive guard', neg);

console.log(passed + ' checks passed.');
