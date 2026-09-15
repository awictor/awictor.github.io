import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { rugSide, rugArea, nearestStandard } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. 14 ft room with a 2 ft border gives a 10 ft rug side.
check('side 14', rugSide(14, 2) === 10);
// 2. 12 ft room with a 2 ft border gives 8 ft.
check('side 12', rugSide(12, 2) === 8);
// 3. Rug area is length x width.
check('area', rugArea(10, 8) === 80);
// 4. A bigger border leaves a smaller rug.
check('bigger border smaller', rugSide(14, 3) < rugSide(14, 2));
// 5. A 10x8 rug maps to the standard 10x8.
check('standard', nearestStandard(10, 8)[1] === 10 && nearestStandard(10, 8)[0] === 8);
// 6. A ~9x12 room rug maps to 9x12 standard.
check('standard 12', nearestStandard(12, 9)[1] === 12);
// 7. A border too large for the room is rejected.
let a = false; try { rugSide(4, 2); } catch (e) { a = true; }
check('border guard', a);
// 8. A non-positive room dimension is rejected.
let b = false; try { rugSide(0, 1); } catch (e) { b = true; }
check('room guard', b);
// 9. A negative border is rejected.
let c = false; try { rugSide(14, -1); } catch (e) { c = true; }
check('neg border guard', c);
// 10. A negative area is rejected.
let d = false; try { rugArea(-1, 8); } catch (e) { d = true; }
check('area guard', d);

console.log(passed + ' checks passed.');
