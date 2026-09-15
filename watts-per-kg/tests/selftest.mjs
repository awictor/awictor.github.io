import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { lbsToKg, wattsPerKg, wattsForTarget, classifyFTP } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. 300 W at 75 kg is 4 W/kg.
check('wkg', wattsPerKg(300, 75) === 4);
// 2. Pounds to kilograms.
check('lb->kg', near(lbsToKg(100), 45.359237));
// 3. 220.462 lb is about 100 kg.
check('lb->kg 100', near(lbsToKg(220.462), 100, 1e-2));
// 4. Watts needed for a target W/kg.
check('target', wattsForTarget(4, 75) === 300);
// 5. Round trip target <-> wkg.
check('round trip', near(wattsPerKg(wattsForTarget(4, 75), 75), 4));
// 6. W/kg is inversely proportional to weight.
check('inverse weight', wattsPerKg(300, 150) === wattsPerKg(300, 75) / 2);
// 7. Elite category above 5 W/kg.
check('world class', classifyFTP(5.5) === 'World Class');
// 8. Category boundaries.
check('categories', classifyFTP(4.2) === 'Excellent' && classifyFTP(3.1) === 'Good' && classifyFTP(2.5) === 'Fair' && classifyFTP(1) === 'Untrained');
// 9. Exact boundaries are inclusive.
check('boundaries', classifyFTP(5.0) === 'World Class' && classifyFTP(4.0) === 'Excellent');
// 10. Non-positive weight rejected.
let g = false; try { wattsPerKg(300, 0); } catch (e) { g = true; }
check('weight guard', g);

console.log(passed + ' checks passed.');
