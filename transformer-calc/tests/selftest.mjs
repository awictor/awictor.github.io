import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { turnsRatio, secondaryVoltage, secondaryCurrent, impedanceRatio } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Turns ratio is primary over secondary.
check('ratio', turnsRatio(100, 50) === 2);
// 2. Step-down: more primary turns lowers secondary voltage.
check('step down', secondaryVoltage(120, 100, 50) === 60);
// 3. Step-up: more secondary turns raises voltage.
check('step up', secondaryVoltage(120, 50, 100) === 240);
// 4. Current transforms inversely to voltage.
check('current', secondaryCurrent(1, 100, 50) === 2);
// 5. Impedance transforms with the square of the ratio.
check('impedance', impedanceRatio(100, 50) === 4);
// 6. Power is conserved in an ideal transformer.
check('power', near(secondaryVoltage(120, 100, 50) * secondaryCurrent(1, 100, 50), 120 * 1));
// 7. A 1:1 transformer passes voltage through.
check('unity', secondaryVoltage(120, 100, 100) === 120);
// 8. Zero secondary turns is rejected (division by zero).
let z = false; try { turnsRatio(100, 0); } catch (e) { z = true; }
check('zero turns guard', z);
// 9. Negative turns rejected.
let n = false; try { turnsRatio(-100, 50); } catch (e) { n = true; }
check('negative turns guard', n);
// 10. Negative voltage rejected.
let v = false; try { secondaryVoltage(-120, 100, 50); } catch (e) { v = true; }
check('negative voltage guard', v);

console.log(passed + ' checks passed.');
