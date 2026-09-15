import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { filamentCost, printElectricityCost, totalPrintCost, filamentLengthMeters } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. 50 g off a $25/1kg spool costs $1.25.
check('filament cost', near(filamentCost(50, 25, 1000), 1.25));
// 2. A whole spool costs the spool price.
check('whole spool', filamentCost(1000, 25, 1000) === 25);
// 3. 10 h at 200 W and 15c/kWh is $0.30.
check('electricity', near(printElectricityCost(10, 200, 0.15), 0.3));
// 4. Total is filament plus electricity.
check('total', near(totalPrintCost(50, 25, 1000, 10, 200, 0.15), 1.55));
// 5. Filament cost scales linearly with grams.
check('linear grams', near(filamentCost(100, 25, 1000), 2 * filamentCost(50, 25, 1000)));
// 6. Total equals the sum of its parts.
check('sum', near(totalPrintCost(50, 25, 1000, 10, 200, 0.15), filamentCost(50, 25, 1000) + printElectricityCost(10, 200, 0.15)));
// 7. Length doubles with mass.
check('length linear', near(filamentLengthMeters(2000, 1.75, 1.24), 2 * filamentLengthMeters(1000, 1.75, 1.24)));
// 8. 1 kg of 1.75 mm PLA is roughly 330-340 m.
check('length spot', filamentLengthMeters(1000, 1.75, 1.24) > 330 && filamentLengthMeters(1000, 1.75, 1.24) < 340);
// 9. Zero spool weight rejected.
let s = false; try { filamentCost(50, 25, 0); } catch (e) { s = true; }
check('spool guard', s);
// 10. Zero density rejected.
let d = false; try { filamentLengthMeters(1000, 1.75, 0); } catch (e) { d = true; }
check('density guard', d);

console.log(passed + ' checks passed.');
