import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { combinations, lotteryOdds, lotteryOddsWithBonus, jackpotProbability } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-12) => Math.abs(a - b) < t;

// 1. Basic combination.
check('combo', combinations(5, 2) === 10);
// 2. The classic 6/49 count.
check('6/49', combinations(49, 6) === 13983816);
// 3. Choosing none or all is one way.
check('edges', combinations(9, 0) === 1 && combinations(9, 9) === 1);
// 4. Combinations are symmetric.
check('symmetry', combinations(49, 6) === combinations(49, 43));
// 5. Lottery odds match the combination.
check('odds', lotteryOdds(49, 6) === 13983816);
// 6. Powerball odds with the bonus ball.
check('powerball', lotteryOddsWithBonus(69, 5, 26) === 292201338);
// 7. No bonus leaves the base odds unchanged.
check('no bonus', lotteryOddsWithBonus(49, 6, 0) === lotteryOdds(49, 6));
// 8. Probability is the reciprocal of the odds.
check('probability', near(jackpotProbability(lotteryOdds(49, 6)), 1 / 13983816));
// 9. Picking more than the pool has zero combinations and is rejected as odds.
let z = false; try { lotteryOdds(5, 6); } catch (e) { z = true; }
check('overpick guard', z);
// 10. Negative inputs are rejected.
let n = false; try { combinations(-1, 2); } catch (e) { n = true; }
check('negative guard', n);

console.log(passed + ' checks passed.');
