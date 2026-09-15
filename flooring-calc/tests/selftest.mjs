import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { roomArea, areaWithWaste, boxesNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Floor area is length times width.
check('area', roomArea(12, 10) === 120);
// 2. Waste factor pads the area.
check('waste', near(areaWithWaste(100, 10), 110));
// 3. Boxes round up.
check('boxes', boxesNeeded(110, 20) === 6);
// 4. An exact multiple needs no rounding up.
check('exact', boxesNeeded(100, 20) === 5);
// 5. Zero waste leaves area unchanged.
check('zero waste', areaWithWaste(100, 0) === 100);
// 6. More waste never needs fewer boxes.
check('more waste', boxesNeeded(areaWithWaste(100, 15), 20) >= boxesNeeded(areaWithWaste(100, 5), 20));
// 7. A bigger room has more area.
check('bigger', roomArea(20, 10) > roomArea(12, 10));
// 8. Full chain: 15x12 at 10% waste, 20 sqft boxes.
check('chain', boxesNeeded(areaWithWaste(roomArea(15, 12), 10), 20) === 10);
// 9. Zero box coverage is rejected.
let z = false; try { boxesNeeded(100, 0); } catch (e) { z = true; }
check('coverage guard', z);
// 10. Negative dimensions rejected.
let n = false; try { roomArea(-12, 10); } catch (e) { n = true; }
check('dimension guard', n);

console.log(passed + ' checks passed.');
