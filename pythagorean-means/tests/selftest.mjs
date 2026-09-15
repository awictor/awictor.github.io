import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { arithmeticMean, geometricMean, harmonicMean, rootMeanSquare } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. AM of [1,2,4] = 7/3.
check('AM', near(arithmeticMean([1, 2, 4]), 7 / 3));
// 2. GM of [1,2,4] = cube root of 8 = 2.
check('GM', near(geometricMean([1, 2, 4]), 2));
// 3. HM of [1,2,4] = 3 / (1 + 1/2 + 1/4) = 12/7.
check('HM', near(harmonicMean([1, 2, 4]), 12 / 7));
// 4. RMS of [1,2,4] = sqrt(7).
check('RMS', near(rootMeanSquare([1, 2, 4]), Math.sqrt(7)));
// 5. All means of equal values equal that value.
check('equal values', arithmeticMean([4, 4, 4]) === 4 && geometricMean([4, 4, 4]) === 4 && near(harmonicMean([4, 4, 4]), 4) && rootMeanSquare([4, 4, 4]) === 4);
// 6. Ordering HM <= GM <= AM <= RMS for positive data.
const d = [3, 4, 5, 6];
check('ordering', harmonicMean(d) <= geometricMean(d) && geometricMean(d) <= arithmeticMean(d) && arithmeticMean(d) <= rootMeanSquare(d));
// 7. GM of [2,8] = 4.
check('GM 2,8', near(geometricMean([2, 8]), 4));
// 8. HM of round-trip speeds 60 and 40 = 48.
check('HM speeds', near(harmonicMean([60, 40]), 48));
// 9. GM rejects non-positive values.
let g = false; try { geometricMean([1, -2]); } catch (e) { g = true; }
check('GM guard', g);
// 10. HM rejects zero.
let h = false; try { harmonicMean([1, 0]); } catch (e) { h = true; }
check('HM guard', h);

console.log(passed + ' checks passed.');
