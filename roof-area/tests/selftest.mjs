import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { slopeMultiplier, roofArea, roofingSquares } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. A flat 0:12 roof has a slope multiplier of 1.
check('flat', slopeMultiplier(0) === 1);
// 2. A 12:12 (45 deg) roof multiplier is sqrt(2).
check('12:12', near(slopeMultiplier(12), Math.SQRT2));
// 3. A 6:12 roof multiplier is ~1.118.
check('6:12', near(slopeMultiplier(6), 1.118033988749895, 1e-9));
// 4. A flat roof's area equals its footprint.
check('flat area', roofArea(1000, 0) === 1000);
// 5. A 12:12 roof over 1000 sq ft is ~1414 sq ft.
check('area 12', near(roofArea(1000, 12), 1414.2135623730949, 1e-6));
// 6. A steeper pitch gives more area.
check('steeper more', roofArea(1000, 12) > roofArea(1000, 6));
// 7. 1000 sq ft, no waste, is 10 squares.
check('squares', near(roofingSquares(1000, 0), 10));
// 8. 10% waste on 1000 sq ft is 11 squares.
check('squares waste', near(roofingSquares(1000, 10), 11));
// 9. A negative footprint is rejected.
let a = false; try { roofArea(-1, 6); } catch (e) { a = true; }
check('foot guard', a);
// 10. A negative pitch is rejected.
let b = false; try { slopeMultiplier(-1); } catch (e) { b = true; }
check('pitch guard', b);

console.log(passed + ' checks passed.');
