import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { treeLights, strandsNeeded, garlandLights } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. A 7 ft tree at 100/ft wants 700 lights.
check('tree 7', treeLights(7, 100) === 700);
// 2. A 9 ft tree wants 900.
check('tree 9', treeLights(9, 100) === 900);
// 3. 700 lights in 100-count strands is 7 strands.
check('strands', strandsNeeded(700, 100) === 7);
// 4. 650 lights rounds up to 7 strands.
check('strands round', strandsNeeded(650, 100) === 7);
// 5. A taller tree needs more lights.
check('taller more', treeLights(9, 100) > treeLights(7, 100));
// 6. A denser look needs more lights.
check('denser more', treeLights(7, 200) > treeLights(7, 100));
// 7. Garland: 20 ft at 3/ft is 60 lights.
check('garland', garlandLights(20, 3) === 60);
// 8. A non-positive height is rejected.
let a = false; try { treeLights(0, 100); } catch (e) { a = true; }
check('height guard', a);
// 9. A non-positive lights-per-strand is rejected.
let b = false; try { strandsNeeded(700, 0); } catch (e) { b = true; }
check('strand guard', b);
// 10. A negative garland length is rejected.
let c = false; try { garlandLights(-1, 3); } catch (e) { c = true; }
check('garland guard', c);

console.log(passed + ' checks passed.');
