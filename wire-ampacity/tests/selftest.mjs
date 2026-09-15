import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ampacity, isAdequate, deratedAmpacity } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 14 AWG copper is 20 A (75C).
check('awg14', ampacity(14) === 20);
// 2. 12 AWG is 25 A.
check('awg12', ampacity(12) === 25);
// 3. 10 AWG is 35 A.
check('awg10', ampacity(10) === 35);
// 4. Thicker wire (lower AWG number) carries more.
check('thicker more', ampacity(10) > ampacity(14));
// 5. 12 AWG handles a 20 A load.
check('adequate', isAdequate(12, 20) === true);
// 6. 14 AWG cannot handle 25 A.
check('inadequate', isAdequate(14, 25) === false);
// 7. Derating 10 AWG by 0.8 gives 28 A.
check('derate', near(deratedAmpacity(10, 0.8), 28));
// 8. An unsupported gauge is rejected.
let a = false; try { ampacity(22); } catch (e) { a = true; }
check('gauge guard', a);
// 9. A negative load is rejected.
let b = false; try { isAdequate(12, -1); } catch (e) { b = true; }
check('load guard', b);
// 10. A derate factor above 1 is rejected.
let c = false; try { deratedAmpacity(12, 1.5); } catch (e) { c = true; }
check('factor guard', c);

console.log(passed + ' checks passed.');
