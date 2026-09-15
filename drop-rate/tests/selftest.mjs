import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { atLeastOnce, triesForChance, expectedTries } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. One try at 50% is 50%.
check('once', atLeastOnce(0.5, 1) === 0.5);
// 2. Two tries at 50% is 75%.
check('two', atLeastOnce(0.5, 2) === 0.75);
// 3. A 1% drop over 100 tries is ~65.1%, not 100%.
check('1pct 100', near(atLeastOnce(0.1, 10), 0.6513215599, 1e-6));
// 4. More tries raise the cumulative chance.
check('more tries', atLeastOnce(0.1, 20) > atLeastOnce(0.1, 10));
// 5. Average tries at 50% is 2.
check('avg 50', expectedTries(0.5) === 2);
// 6. Average tries at 1% is 100.
check('avg 1pct', near(expectedTries(0.01), 100));
// 7. Tries for 50% at p=0.1 is 7.
check('tries for 50', triesForChance(0.1, 0.5) === 7);
// 8. A probability outside 0-1 is rejected.
let a = false; try { atLeastOnce(1.5, 10); } catch (e) { a = true; }
check('p guard', a);
// 9. Negative tries are rejected.
let b = false; try { atLeastOnce(0.1, -1); } catch (e) { b = true; }
check('tries guard', b);
// 10. A target of 1 (100%) is rejected — never reachable.
let c = false; try { triesForChance(0.1, 1); } catch (e) { c = true; }
check('target guard', c);

console.log(passed + ' checks passed.');
