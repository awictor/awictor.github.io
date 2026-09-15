import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { requiredWidth, panelsNeeded, actualFullness } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. A 50" window at 2x fullness needs 100" of fabric.
check('required', requiredWidth(50, 2) === 100);
// 2. 100" in 25" panels is 4 panels.
check('panels', panelsNeeded(100, 25) === 4);
// 3. Four 25" panels over a 50" window is 2x fullness.
check('actual', actualFullness(100, 50) === 2);
// 4. The functions round-trip.
check('roundtrip', near(actualFullness(requiredWidth(50, 2), 50), 2));
// 5. More fullness needs more fabric.
check('more fullness', requiredWidth(50, 3) > requiredWidth(50, 2));
// 6. A wider window needs more panels.
check('wider more panels', panelsNeeded(requiredWidth(80, 2), 25) > panelsNeeded(requiredWidth(50, 2), 25));
// 7. A non-positive window width is rejected.
let a = false; try { requiredWidth(0, 2); } catch (e) { a = true; }
check('window guard', a);
// 8. A non-positive fullness is rejected.
let b = false; try { requiredWidth(50, 0); } catch (e) { b = true; }
check('fullness guard', b);
// 9. A non-positive panel width is rejected.
let c = false; try { panelsNeeded(100, 0); } catch (e) { c = true; }
check('panel guard', c);
// 10. actualFullness rejects a non-positive window width.
let d = false; try { actualFullness(100, 0); } catch (e) { d = true; }
check('actual guard', d);

console.log(passed + ' checks passed.');
