import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { totalAssets, totalLiabilities, netWorth, debtToAssetRatio } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Assets sum up.
check('assets', totalAssets([1000, 2000, 500]) === 3500);
// 2. Liabilities sum up.
check('liabilities', totalLiabilities([500, 1500]) === 2000);
// 3. Net worth is assets minus liabilities.
check('net worth', netWorth(3500, 2000) === 1500);
// 4. Net worth can be negative.
check('negative', netWorth(1000, 3000) === -2000);
// 5. Debt-to-asset ratio.
check('dta', debtToAssetRatio(2000, 4000) === 0.5);
// 6. Full chain from lists.
check('chain', netWorth(totalAssets([250000, 40000]), totalLiabilities([180000, 12000])) === 98000);
// 7. More liabilities lower net worth.
check('more debt lower', netWorth(3500, 3000) < netWorth(3500, 2000));
// 8. No liabilities means zero ratio.
check('zero debt', debtToAssetRatio(0, 4000) === 0);
// 9. Zero assets is rejected for the ratio.
let z = false; try { debtToAssetRatio(2000, 0); } catch (e) { z = true; }
check('assets guard', z);
// 10. Negative amounts are rejected.
let n = false; try { totalAssets([1000, -5]); } catch (e) { n = true; }
check('negative guard', n);

console.log(passed + ' checks passed.');
