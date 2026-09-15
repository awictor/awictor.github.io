import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { annualRentFromMonthly, grossYield, netYield, rentForYield } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Annualize monthly rent.
check('annualize', annualRentFromMonthly(1000) === 12000);
// 2. Gross yield is rent over value.
check('gross', grossYield(12000, 200000) === 0.06);
// 3. Net yield subtracts expenses.
check('net', near(netYield(12000, 3000, 200000), 0.045));
// 4. Net is below gross when there are costs.
check('net below gross', netYield(12000, 3000, 200000) < grossYield(12000, 200000));
// 5. With no expenses, net equals gross.
check('no expenses', netYield(12000, 0, 200000) === grossYield(12000, 200000));
// 6. Rent needed for a target yield.
check('rent for yield', rentForYield(0.06, 200000) === 12000);
// 7. Round trip yield -> rent -> yield.
check('round trip', near(grossYield(rentForYield(0.05, 200000), 200000), 0.05));
// 8. A pricier property yields less at the same rent.
check('pricier lower', grossYield(12000, 400000) < grossYield(12000, 200000));
// 9. Zero property value is rejected.
let z = false; try { grossYield(12000, 0); } catch (e) { z = true; }
check('value guard', z);
// 10. Negative rent is rejected.
let n = false; try { annualRentFromMonthly(-100); } catch (e) { n = true; }
check('rent guard', n);

console.log(passed + ' checks passed.');
