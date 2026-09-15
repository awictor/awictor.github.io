import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { beltLength, pulleyRatio, outputRPM, beltSpeed } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. Equal pulleys: length is 2C + pi*D (no diameter-difference term).
check('equal pulleys', near(beltLength(10, 4, 4), 20 + Math.PI * 4));
// 2. Unequal pulleys use the full open-belt formula.
check('unequal', near(beltLength(10, 6, 2), 20 + (Math.PI / 2) * 8 + 16 / 40));
// 3. Ratio is driven over driver.
check('ratio 2:1', pulleyRatio(3, 6) === 2);
// 4. Equal diameters give 1:1.
check('ratio 1:1', pulleyRatio(5, 5) === 1);
// 5. A 2:1 step-up slows the output to half input speed.
check('output half', outputRPM(1000, 2, 4) === 500);
// 6. Swapping pulleys doubles the output speed.
check('output double', outputRPM(1000, 4, 2) === 2000);
// 7. Belt surface speed is pi*D*rpm.
check('belt speed', near(beltSpeed(4, 100), Math.PI * 400));
// 8. Output RPM equals input divided by the ratio.
check('rpm vs ratio', near(outputRPM(1750, 3, 6), 1750 / pulleyRatio(3, 6)));
// 9. Non-positive center distance rejected.
let c = false; try { beltLength(0, 4, 4); } catch (e) { c = true; }
check('center guard', c);
// 10. Non-positive diameter rejected in ratio.
let r = false; try { pulleyRatio(0, 6); } catch (e) { r = true; }
check('ratio guard', r);

console.log(passed + ' checks passed.');
