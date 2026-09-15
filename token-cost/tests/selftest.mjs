import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tokenCost, callCost, monthlyCost, tokensFromWords } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 1M tokens at $3/M costs $3.
check('token cost', tokenCost(1e6, 3) === 3);
// 2. Half a million is half the cost.
check('half', tokenCost(500000, 3) === 1.5);
// 3. Call cost sums input and output.
check('call cost', near(callCost(1e6, 3, 1e6, 15), 18));
// 4. Monthly cost over 30 days.
check('monthly', near(monthlyCost(0.02, 100), 60));
// 5. More tokens cost more.
check('more tokens', tokenCost(2e6, 3) > tokenCost(1e6, 3));
// 6. Output priced higher raises the call cost.
check('output pricier', callCost(1000, 3, 1000, 15) > callCost(1000, 3, 1000, 3));
// 7. Word-to-token estimate.
check('words', near(tokensFromWords(750), 1000));
// 8. Zero tokens cost nothing.
check('zero', tokenCost(0, 3) === 0);
// 9. Negative tokens rejected.
let t = false; try { tokenCost(-1000, 3); } catch (e) { t = true; }
check('token guard', t);
// 10. Negative price rejected.
let p = false; try { tokenCost(1000, -3); } catch (e) { p = true; }
check('price guard', p);

console.log(passed + ' checks passed.');
