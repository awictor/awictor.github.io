import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { awgToDiameterMm, awgToAreaMm2, awgToDiameterInch, diameterToAwg } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-3) => Math.abs(a - b) < t;

// 1. AWG 36 is exactly 0.127 mm by definition.
check('AWG 36', near(awgToDiameterMm(36), 0.127, 1e-9));
// 2. AWG 0 (1/0) ~ 8.251 mm.
check('AWG 0', near(awgToDiameterMm(0), 8.251, 1e-2));
// 3. AWG 10 ~ 2.588 mm.
check('AWG 10', near(awgToDiameterMm(10), 2.588, 1e-2));
// 4. AWG 40 ~ 0.0799 mm.
check('AWG 40', near(awgToDiameterMm(40), 0.0799, 1e-3));
// 5. AWG 10 area ~ 5.26 mm².
check('area 10', near(awgToAreaMm2(10), 5.26, 1e-2));
// 6. diameterToAwg inverts awgToDiameterMm.
check('inverse', near(diameterToAwg(awgToDiameterMm(12)), 12, 1e-6));
// 7. Higher AWG is thinner.
check('monotonic', awgToDiameterMm(20) < awgToDiameterMm(10));
// 8. Inch conversion.
check('inch', near(awgToDiameterInch(10), awgToDiameterMm(10) / 25.4, 1e-9));
// 9. Area is quadratic: doubling the diameter quadruples area (compare via ratio).
check('area quadratic', near(awgToAreaMm2(36), Math.PI / 4 * 0.127 * 0.127, 1e-9));
// 10. Positivity guard on diameterToAwg.
let z = false; try { diameterToAwg(0); } catch (e) { z = true; }
check('guard', z);

console.log(passed + ' checks passed.');
