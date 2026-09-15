import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parseFormula, molarMass } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 0.01) => Math.abs(a - b) < t;

// 1. Water.
check('water', near(molarMass('H2O'), 18.015));
// 2. Carbon dioxide.
check('co2', near(molarMass('CO2'), 44.009));
// 3. Glucose.
check('glucose', near(molarMass('C6H12O6'), 180.156));
// 4. Two-letter element symbol (iron).
check('iron', near(molarMass('Fe'), 55.845));
// 5. Parentheses group: calcium hydroxide.
check('hydroxide', near(molarMass('Ca(OH)2'), 74.092));
// 6. Repeated group: aluminium sulfate.
check('sulfate', near(molarMass('Al2(SO4)3'), 342.13, 0.05));
// 7. Element counts are parsed correctly.
check('counts', parseFormula('H2O').H === 2 && parseFormula('H2O').O === 1);
// 8. A group multiplier multiplies inner counts.
check('group counts', parseFormula('Ca(OH)2').O === 2 && parseFormula('Ca(OH)2').H === 2);
// 9. Unknown element is rejected.
let u = false; try { molarMass('Xx2'); } catch (e) { u = true; }
check('unknown guard', u);
// 10. Unbalanced parentheses rejected.
let p = false; try { molarMass('Ca(OH2'); } catch (e) { p = true; }
check('paren guard', p);

console.log(passed + ' checks passed.');
