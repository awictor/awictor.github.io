import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { expectedScore, ratingChange, newRating, winProbabilityPercent } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Equal ratings expect a 0.5 score.
check('even', expectedScore(1500, 1500) === 0.5);
// 2. A 400-point deficit expects 1/11.
check('400 down', near(expectedScore(1500, 1900), 1 / 11));
// 3. Expected scores of both players sum to 1.
check('sum to 1', near(expectedScore(1500, 1900) + expectedScore(1900, 1500), 1));
// 4. Winning an even matchup at K=32 gains 16.
check('win +16', newRating(1500, 1500, 1, 32) === 1516);
// 5. Losing an even matchup loses 16.
check('loss -16', newRating(1500, 1500, 0, 32) === 1484);
// 6. Drawing even opponents is no change.
check('draw', newRating(1500, 1500, 0.5, 32) === 1500);
// 7. Rating change is K times (actual - expected).
check('change', near(ratingChange(1500, 1500, 1, 32), 16));
// 8. Win probability of even players is 50%.
check('win prob', winProbabilityPercent(1500, 1500) === 50);
// 9. Score outside [0,1] rejected.
let s = false; try { ratingChange(1500, 1500, 2, 32); } catch (e) { s = true; }
check('score guard', s);
// 10. Non-positive K rejected.
let k = false; try { newRating(1500, 1500, 1, 0); } catch (e) { k = true; }
check('K guard', k);

console.log(passed + ' checks passed.');
