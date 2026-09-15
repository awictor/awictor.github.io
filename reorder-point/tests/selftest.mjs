import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { demandDuringLeadTime, safetyStock, reorderPoint } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Demand during lead time is demand times days.
check('dllt', demandDuringLeadTime(20, 4) === 80);
// 2. Safety stock = Z * sigma * sqrt(lead). 1.65*10*2 = 33.
check('safety', near(safetyStock(1.65, 10, 4), 33));
// 3. Reorder point sums lead-time demand and safety stock.
check('rop', reorderPoint(20, 4, 33) === 113);
// 4. Higher service factor gives more safety stock.
check('service', safetyStock(2.33, 10, 4) > safetyStock(1.65, 10, 4));
// 5. Safety stock scales with sqrt of lead time (4x lead = 2x stock).
check('sqrt scaling', near(safetyStock(1.65, 10, 16), 2 * safetyStock(1.65, 10, 4)));
// 6. Zero demand variability means zero safety stock.
check('no variability', safetyStock(1.65, 0, 4) === 0);
// 7. With no safety stock, reorder point is just lead-time demand.
check('no buffer', reorderPoint(20, 4, 0) === 80);
// 8. Full chain round trip.
check('round trip', near(reorderPoint(20, 4, safetyStock(1.65, 10, 4)), 113));
// 9. Negative lead time rejected.
let l = false; try { safetyStock(1.65, 10, -1); } catch (e) { l = true; }
check('lead guard', l);
// 10. Negative demand rejected.
let d = false; try { demandDuringLeadTime(-20, 4); } catch (e) { d = true; }
check('demand guard', d);

console.log(passed + ' checks passed.');
