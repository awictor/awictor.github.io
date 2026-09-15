import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { columnVolumeCuFt, cubicYards, bagsForColumn } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. A 12" x 48" column is exactly pi cubic feet.
check('12x48', near(columnVolumeCuFt(12, 48), Math.PI, 1e-9));
// 2. Half the height is half the volume.
check('12x24', near(columnVolumeCuFt(12, 24), Math.PI / 2, 1e-9));
// 3. A wider tube holds more.
check('wider more', columnVolumeCuFt(16, 48) > columnVolumeCuFt(12, 48));
// 4. A taller column holds more.
check('taller more', columnVolumeCuFt(12, 60) > columnVolumeCuFt(12, 48));
// 5. 27 cubic feet is 1 cubic yard.
check('yards', cubicYards(27) === 1);
// 6. 54 cubic feet is 2 cubic yards.
check('yards 54', cubicYards(54) === 2);
// 7. pi cu ft at 0.6/bag rounds up to 6 bags.
check('bags', bagsForColumn(Math.PI, 0.6) === 6);
// 8. A non-positive diameter is rejected.
let a = false; try { columnVolumeCuFt(0, 48); } catch (e) { a = true; }
check('dia guard', a);
// 9. A non-positive height is rejected.
let b = false; try { columnVolumeCuFt(12, 0); } catch (e) { b = true; }
check('height guard', b);
// 10. A non-positive bag yield is rejected.
let c = false; try { bagsForColumn(Math.PI, 0); } catch (e) { c = true; }
check('bag guard', c);

console.log(passed + ' checks passed.');
