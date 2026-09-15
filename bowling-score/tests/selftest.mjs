import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isStrike, isSpare, maxGameScore, scoreGame } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const fill = (v, n) => Array.from({ length: n }, () => v);

// 1. A gutter game scores zero.
check('gutter', scoreGame(fill(0, 20)) === 0);
// 2. A perfect game (12 strikes) scores 300.
check('perfect', scoreGame(fill(10, 12)) === 300);
// 3. All 5/5 spares plus a fill 5 scores 150.
check('all spares', scoreGame(fill(5, 21)) === 150);
// 4. Nine pins then a miss each frame scores 90.
check('nine each', scoreGame([9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0]) === 90);
// 5. One spare (5/5) with a 3 next, rest gutters: 13 + 3 = 16.
check('one spare', scoreGame([5, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) === 16);
// 6. A ten-pin roll is a strike.
check('is strike', isStrike(10) === true && isStrike(9) === false);
// 7. Two rolls summing to ten (not a strike) is a spare.
check('is spare', isSpare(5, 5) === true && isSpare(10, 0) === false && isSpare(3, 4) === false);
// 8. Maximum game score is 300.
check('max', maxGameScore() === 300);
// 9. Non-array input rejected.
let a = false; try { scoreGame('300'); } catch (e) { a = true; }
check('array guard', a);
// 10. Pin counts above 10 rejected.
let p = false; try { scoreGame([11, 0]); } catch (e) { p = true; }
check('pin guard', p);

console.log(passed + ' checks passed.');
