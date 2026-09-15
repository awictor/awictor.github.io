import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { wallArea, unitsForWall, mortarBags } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. A 20x8 wall is 160 sq ft.
check('area', wallArea(20, 8) === 160);
// 2. 100 sq ft at 1 unit/sq ft, no waste, is 100 units.
check('units base', unitsForWall(100, 1, 0) === 100);
// 3. A 10% waste allowance adds 10 units.
check('units waste', unitsForWall(100, 1, 10) === 110);
// 4. Bricks at 6.86/sq ft over 100 sq ft = 686 (no waste).
check('bricks', unitsForWall(100, 6.86, 0) === 686);
// 5. More waste means more units.
check('more waste more', unitsForWall(100, 1, 15) > unitsForWall(100, 1, 5));
// 6. 686 bricks at 120 per bag rounds up to 6 bags.
check('mortar', mortarBags(686, 120) === 6);
// 7. An exact bag count is not padded.
check('mortar exact', mortarBags(120, 120) === 1);
// 8. A negative area is rejected.
let a = false; try { unitsForWall(-1, 6.86, 10); } catch (e) { a = true; }
check('area guard', a);
// 9. A non-positive units-per-sq-ft is rejected.
let b = false; try { unitsForWall(100, 0, 10); } catch (e) { b = true; }
check('rate guard', b);
// 10. A non-positive units-per-bag is rejected.
let c = false; try { mortarBags(686, 0); } catch (e) { c = true; }
check('bag guard', c);

console.log(passed + ' checks passed.');
