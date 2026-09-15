import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { roomPerimeter, trimLength, sticksNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. A 12x10 room has a 44 ft perimeter.
check('perimeter', roomPerimeter(12, 10) === 44);
// 2. 44 ft minus a 3 ft doorway, no waste, is 41 ft.
check('trim base', trimLength(44, 3, 0) === 41);
// 3. A 10% waste allowance gives 45.1 ft.
check('trim waste', near(trimLength(44, 3, 10), 45.1));
// 4. 45.1 ft in 16 ft sticks rounds up to 3 sticks.
check('sticks', sticksNeeded(45.1, 16) === 3);
// 5. A bigger room has a bigger perimeter.
check('bigger perim', roomPerimeter(20, 10) > roomPerimeter(12, 10));
// 6. More doorway width leaves less trim.
check('more doors less', trimLength(44, 6, 0) < trimLength(44, 3, 0));
// 7. A negative dimension is rejected.
let a = false; try { roomPerimeter(-1, 10); } catch (e) { a = true; }
check('dim guard', a);
// 8. Doorways wider than the perimeter are rejected.
let b = false; try { trimLength(44, 50, 0); } catch (e) { b = true; }
check('door guard', b);
// 9. A non-positive stick length is rejected.
let c = false; try { sticksNeeded(45, 0); } catch (e) { c = true; }
check('stick guard', c);
// 10. A negative waste is rejected.
let d = false; try { trimLength(44, 3, -1); } catch (e) { d = true; }
check('waste guard', d);

console.log(passed + ' checks passed.');
