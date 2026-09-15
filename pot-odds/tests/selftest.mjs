import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { requiredEquityPercent, potOddsRatio, equityFromOuts, isCallProfitable } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Calling 50 into a 100 pot needs 33.3% equity.
check('required equity', near(requiredEquityPercent(100, 50), 100 / 3));
// 2. When the call equals the pot you need 50%.
check('half', requiredEquityPercent(100, 100) === 50);
// 3. 100 pot, 50 call is 2-to-1.
check('2 to 1', potOddsRatio(100, 50) === 2);
// 4. 150 pot, 50 call is 3-to-1.
check('3 to 1', potOddsRatio(150, 50) === 3);
// 5. Rule of 4: 9 outs, two cards = 36%.
check('rule of 4', equityFromOuts(9, 2) === 36);
// 6. Rule of 2: 9 outs, one card = 18%.
check('rule of 2', equityFromOuts(9, 1) === 18);
// 7. A flush draw on the flop beats 2-to-1 pot odds.
check('profitable', isCallProfitable(9, 2, 100, 50) === true);
// 8. A weak draw against a big call is a fold.
check('fold', isCallProfitable(4, 1, 100, 50) === false);
// 9. Zero call amount rejected.
let c = false; try { requiredEquityPercent(100, 0); } catch (e) { c = true; }
check('call guard', c);
// 10. Negative outs rejected.
let o = false; try { equityFromOuts(-1, 2); } catch (e) { o = true; }
check('outs guard', o);

console.log(passed + ' checks passed.');
