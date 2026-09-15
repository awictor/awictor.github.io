import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { singleCylinderCC, displacementCC, ccToLiters, ccToCubicInches } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. One cylinder of 100mm bore x 100mm stroke = pi/4 * 1000 cc.
check('single cylinder', near(singleCylinderCC(100, 100), Math.PI / 4 * 1000));
// 2. Displacement scales linearly with cylinder count.
check('linear cylinders', near(displacementCC(100, 100, 4), 4 * singleCylinderCC(100, 100)));
// 3. cc to liters.
check('cc->liters', ccToLiters(5000) === 5);
// 4. Exactly one cubic inch in cc converts to 1.
check('ci exact', near(ccToCubicInches(16.387064), 1));
// 5. 1000 cc ~= 61.024 cubic inches.
check('cc->ci', near(ccToCubicInches(1000), 1000 / 16.387064));
// 6. Classic small-block V8 (101.6 x 88.4 x 8) is about 350 ci.
check('sbc 350', Math.abs(ccToCubicInches(displacementCC(101.6, 88.4, 8)) - 350) < 1);
// 7. Doubling stroke doubles displacement.
check('stroke scaling', near(displacementCC(90, 160, 4), 2 * displacementCC(90, 80, 4)));
// 8. Quadrupling bore multiplies displacement by 4 (bore squared).
check('bore squared', near(displacementCC(160, 80, 1), 4 * displacementCC(80, 80, 1)));
// 9. Zero cylinders rejected.
let c = false; try { displacementCC(80, 80, 0); } catch (e) { c = true; }
check('cylinder guard', c);
// 10. Non-positive bore rejected.
let b = false; try { singleCylinderCC(0, 80); } catch (e) { b = true; }
check('bore guard', b);

console.log(passed + ' checks passed.');
