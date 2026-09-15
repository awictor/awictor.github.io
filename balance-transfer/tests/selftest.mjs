import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { transferFee, interestOverMonths, transferCost, savingsFromTransfer } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. A 3% fee on $5000 is $150.
check('fee', transferFee(5000, 3) === 150);
// 2. Interest: $5000 at 24% for 12 months is $1200 (simple).
check('interest', near(interestOverMonths(5000, 24, 12), 1200));
// 3. Transfer cost with 0% intro is just the fee.
check('cost zero intro', near(transferCost(5000, 3, 0, 12), 150));
// 4. Net savings = stay interest minus transfer cost.
check('savings', near(savingsFromTransfer(5000, 24, 3, 0, 12), 1200 - 150));
// 5. A higher fee reduces savings.
check('higher fee less', savingsFromTransfer(5000, 24, 5, 0, 12) < savingsFromTransfer(5000, 24, 3, 0, 12));
// 6. A 0% intro beats the current APR.
check('intro cheaper', transferCost(5000, 3, 0, 12) < interestOverMonths(5000, 24, 12));
// 7. If intro equals current APR, the fee makes transfer cost more.
check('no benefit', savingsFromTransfer(5000, 24, 3, 24, 12) < 0);
// 8. Zero interest at 0% APR.
check('zero apr', interestOverMonths(5000, 0, 12) === 0);
// 9. Negative balance is rejected.
let b = false; try { transferFee(-100, 3); } catch (e) { b = true; }
check('balance guard', b);
// 10. Negative months rejected.
let m = false; try { interestOverMonths(5000, 24, -1); } catch (e) { m = true; }
check('months guard', m);

console.log(passed + ' checks passed.');
