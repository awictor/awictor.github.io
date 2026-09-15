import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { monthlyCashFlow, annualCashFlow, totalCashInvested, cashOnCashReturn } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Monthly cash flow is rent minus costs.
check('monthly', monthlyCashFlow(2000, 500, 900) === 600);
// 2. Annual is twelve months.
check('annual', annualCashFlow(2000, 500, 900) === 7200);
// 3. Monthly times 12 equals annual.
check('consistency', monthlyCashFlow(2000, 500, 900) * 12 === annualCashFlow(2000, 500, 900));
// 4. Total cash invested sums the three.
check('invested', totalCashInvested(50000, 5000, 10000) === 65000);
// 5. Cash-on-cash return ratio.
check('coc', near(cashOnCashReturn(7200, 65000), 7200 / 65000));
// 6. Cash flow can go negative.
check('negative', annualCashFlow(1000, 600, 900) === -6000);
// 7. Round trip through the full chain.
check('round trip', near(cashOnCashReturn(annualCashFlow(2000, 500, 900), totalCashInvested(50000, 5000, 10000)), 7200 / 65000));
// 8. Higher rent gives a higher return.
check('monotonic', cashOnCashReturn(annualCashFlow(2500, 500, 900), 65000) > cashOnCashReturn(annualCashFlow(2000, 500, 900), 65000));
// 9. Zero cash invested is rejected.
let z = false; try { cashOnCashReturn(7200, 0); } catch (e) { z = true; }
check('invested guard', z);
// 10. Negative input rejected.
let n = false; try { monthlyCashFlow(-100, 500, 900); } catch (e) { n = true; }
check('input guard', n);

console.log(passed + ' checks passed.');
