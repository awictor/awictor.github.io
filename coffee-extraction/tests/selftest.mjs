import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { solublesExtracted, extractionYield, tdsFromExtraction, classifyExtraction } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. 20 g dose, 250 g beverage, 1.35% TDS -> 16.875%.
check('yield', near(extractionYield(20, 250, 1.35), 16.875));
// 2. Solubles extracted.
check('solubles', near(solublesExtracted(250, 1.35), 3.375));
// 3. More beverage means more was extracted.
check('more beverage', extractionYield(20, 300, 1.35) > extractionYield(20, 250, 1.35));
// 4. A bigger dose lowers the yield percentage.
check('bigger dose lower', extractionYield(25, 250, 1.35) < extractionYield(20, 250, 1.35));
// 5. Higher TDS means higher yield.
check('higher tds', extractionYield(20, 250, 1.5) > extractionYield(20, 250, 1.35));
// 6. TDS-from-extraction inverts it.
check('tds inverse', near(tdsFromExtraction(20, 250, extractionYield(20, 250, 1.35)), 1.35));
// 7. Full round trip.
check('round trip', near(extractionYield(18, 300, tdsFromExtraction(18, 300, 20)), 20));
// 8. Classification bands.
check('classify', classifyExtraction(16) === 'Under-extracted' && classifyExtraction(20) === 'Ideal' && classifyExtraction(24) === 'Over-extracted');
// 9. Zero dose is rejected.
let d = false; try { extractionYield(0, 250, 1.35); } catch (e) { d = true; }
check('dose guard', d);
// 10. TDS over 100 is rejected.
let t = false; try { solublesExtracted(250, 120); } catch (e) { t = true; }
check('tds guard', t);

console.log(passed + ' checks passed.');
