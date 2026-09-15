import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dehumidPints, recommendUnit, pintsToGallons } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. Moderate damp, 500 sq ft = base 10 pints.
check('moderate 500', dehumidPints(500, 'moderate') === 10);
// 2. Moderate damp, 2000 sq ft = 10 + 4*3 = 22 pints.
check('moderate 2000', dehumidPints(2000, 'moderate') === 22);
// 3. Very damp, 500 sq ft = base 12.
check('damp 500', dehumidPints(500, 'damp') === 12);
// 4. Wet, 1500 sq ft = 14 + 6*2 = 26.
check('wet 1500', dehumidPints(1500, 'wet') === 26);
// 5. Extremely wet, 500 sq ft = base 16.
check('saturated 500', dehumidPints(500, 'saturated') === 16);
// 6. Wetter conditions remove more water for the same area.
check('wetter more', dehumidPints(1000, 'saturated') > dehumidPints(1000, 'moderate'));
// 7. Recommended unit rounds up to nearest standard size.
check('unit 22', recommendUnit(22) === 30);
// 8. A small need still maps to the smallest common unit.
check('unit 10', recommendUnit(10) === 20);
// 9. An unknown dampness level is rejected.
let d = false; try { dehumidPints(1000, 'nope'); } catch (e) { d = true; }
check('condition guard', d);
// 10. Eight pints make one gallon.
check('gallons', pintsToGallons(16) === 2);

console.log(passed + ' checks passed.');
