import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tempRise, requiredBTU, gpmCapacity } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 4 GPM at a 70 F rise needs 140,000 BTU/hr.
check('btu', requiredBTU(4, 70) === 140000);
// 2. 140,000 BTU/hr at a 70 F rise delivers 4 GPM.
check('capacity', gpmCapacity(140000, 70) === 4);
// 3. requiredBTU and gpmCapacity invert each other.
check('roundtrip', near(gpmCapacity(requiredBTU(4, 70), 70), 4));
// 4. Rise is target minus incoming.
check('rise', tempRise(120, 50) === 70);
// 5. A bigger rise needs more BTU.
check('more rise more btu', requiredBTU(4, 80) > requiredBTU(4, 70));
// 6. More flow needs more BTU.
check('more flow more btu', requiredBTU(5, 70) > requiredBTU(4, 70));
// 7. A bigger rise cuts deliverable flow for a fixed BTU.
check('bigger rise less gpm', gpmCapacity(140000, 90) < gpmCapacity(140000, 70));
// 8. A negative flow is rejected.
let a = false; try { requiredBTU(-1, 70); } catch (e) { a = true; }
check('flow guard', a);
// 9. A non-positive rise is rejected by gpmCapacity.
let b = false; try { gpmCapacity(140000, 0); } catch (e) { b = true; }
check('rise guard', b);
// 10. A negative BTU is rejected.
let c = false; try { gpmCapacity(-1, 70); } catch (e) { c = true; }
check('btu guard', c);

console.log(passed + ' checks passed.');
