import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { weightedAverage, mean } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Equal weights reduce to the plain mean.
check('equal weights = mean', weightedAverage([80, 90, 100], [1, 1, 1]) === 90);
// 2. Known weighted value.
check('weighted 3:1', weightedAverage([90, 80], [3, 1]) === 87.5);
// 3. Fractional weights summing to 1.
check('fractional weights', near(weightedAverage([4, 3, 2], [0.5, 0.3, 0.2]), 3.3));
// 4. Single value returns itself.
check('single', weightedAverage([42], [1]) === 42);
// 5. Scaling all weights leaves the result unchanged.
check('weight scale invariant', weightedAverage([2, 8], [1, 3]) === weightedAverage([2, 8], [10, 30]));
// 6. Weights need not sum to 1.
check('weights not normalized', weightedAverage([10, 20], [2, 2]) === 15);
// 7. Negative values allowed.
check('negatives', weightedAverage([-5, 5], [1, 1]) === 0);
// 8. All weight on one item.
check('all weight on one', weightedAverage([10, 20, 30], [0, 1, 0]) === 20);
// 9. Zero total weight throws.
let z = false; try { weightedAverage([1, 2], [0, 0]); } catch (e) { z = true; }
check('zero weight guard', z);
// 10. Length mismatch throws; plain mean helper works.
let m = false; try { weightedAverage([1, 2, 3], [1, 1]); } catch (e) { m = true; }
check('length guard + mean', m && mean([2, 4, 6]) === 4);

console.log(passed + ' checks passed.');
