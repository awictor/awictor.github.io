import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { rodeNeeded, actualScope, classify } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 7:1 scope in 20 ft over a 4 ft bow needs 7*24 = 168 ft of rode.
check('rode needed', rodeNeeded(20, 4, 7) === 168);
// 2. 168 ft of rode over 24 ft vertical is exactly 7:1.
check('actual scope', actualScope(168, 20, 4) === 7);
// 3. rodeNeeded and actualScope invert each other.
check('roundtrip', near(actualScope(rodeNeeded(20, 4, 7), 20, 4), 7));
// 4. More scope needs more rode.
check('more scope more rode', rodeNeeded(20, 4, 7) > rodeNeeded(20, 4, 5));
// 5. Deeper water needs more rode.
check('deeper more rode', rodeNeeded(30, 4, 7) > rodeNeeded(20, 4, 7));
// 6. A 6:1 scope is good.
check('good', classify(6) === 'good');
// 7. Below 5:1 is marginal.
check('marginal', classify(4) === 'marginal');
// 8. Above 7:1 is generous.
check('generous', classify(9) === 'generous');
// 9. The 5:1 and 7:1 boundaries are both good.
check('boundaries', classify(5) === 'good' && classify(7) === 'good');
// 10. Zero depth and zero bow height is rejected (can't divide).
let a = false; try { actualScope(100, 0, 0); } catch (e) { a = true; }
check('vertical guard', a);

console.log(passed + ' checks passed.');
