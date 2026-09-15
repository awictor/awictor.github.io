import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tireDiameterInches, actualSpeed, indicatedForActual, errorPercent } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. Taller tires mean you're actually going faster.
check('actual', near(actualSpeed(60, 28, 30), 60 * 30 / 28));
// 2. Same diameter means no change.
check('no change', actualSpeed(60, 28, 28) === 60);
// 3. Error percent from the diameters.
check('error', near(errorPercent(28, 30), 2 / 28 * 100));
// 4. Identical tires have zero error.
check('zero error', errorPercent(28, 28) === 0);
// 5. Tire diameter from a size code.
check('diameter', near(tireDiameterInches(225, 45, 17), 17 + 2 * (225 * 0.45) / 25.4));
// 6. Round trip actual -> indicated.
check('round trip', near(indicatedForActual(actualSpeed(60, 28, 30), 28, 30), 60));
// 7. A bigger new tire reads slow (actual exceeds indicated).
check('reads slow', actualSpeed(60, 28, 30) > 60);
// 8. A 225/45R17 is roughly 25 inches.
check('spot', tireDiameterInches(225, 45, 17) > 24.5 && tireDiameterInches(225, 45, 17) < 25.5);
// 9. Zero original diameter rejected.
let d = false; try { actualSpeed(60, 0, 30); } catch (e) { d = true; }
check('diameter guard', d);
// 10. Zero tire width rejected.
let w = false; try { tireDiameterInches(0, 45, 17); } catch (e) { w = true; }
check('width guard', w);

console.log(passed + ' checks passed.');
