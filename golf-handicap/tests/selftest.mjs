import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { scoreDifferential, handicapIndex, courseHandicap, netScore } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. On a neutral 113 slope the differential is just score minus rating.
check('neutral slope', scoreDifferential(90, 72, 113) === 18);
// 2. Slope scales the differential.
check('slope scaling', near(scoreDifferential(85, 70, 130), 15 * 113 / 130));
// 3. Doubling slope halves the differential.
check('slope inverse', near(scoreDifferential(90, 72, 226), 9));
// 4. Handicap index averages the best 8 of many.
check('best 8', handicapIndex([10, 12, 14, 16, 18, 20, 22, 24, 26, 28]) === 17);
// 5. With fewer than 8, average them all.
check('few diffs', handicapIndex([20, 10]) === 15);
// 6. A single differential is its own index.
check('single', handicapIndex([12]) === 12);
// 7. Course handicap on a neutral slope equals the index.
check('course neutral', courseHandicap(18, 113) === 18);
// 8. Course handicap rounds on a steeper slope.
check('course rounded', courseHandicap(18, 130) === 21);
// 9. Net score subtracts the course handicap.
check('net', netScore(90, 18) === 72);
// 10. Empty differential list rejected.
let e = false; try { handicapIndex([]); } catch (err) { e = true; }
check('empty guard', e);

console.log(passed + ' checks passed.');
