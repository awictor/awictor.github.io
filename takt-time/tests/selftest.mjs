import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { taktTime, requiredUnitsPerHour, unitsInShift, meetsDemand } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 450 min for 90 units is 5 min/unit.
check('takt', taktTime(450, 90) === 5);
// 2. 5 min takt is 12 units per hour.
check('rate', requiredUnitsPerHour(5) === 12);
// 3. Units producible in a shift (floored).
check('units', unitsInShift(450, 4) === 112);
// 4. Cycle under takt keeps up.
check('keeps up', meetsDemand(4, 5) === true);
// 5. Cycle over takt is a bottleneck.
check('bottleneck', meetsDemand(6, 5) === false);
// 6. Higher demand shortens takt.
check('higher demand', taktTime(450, 100) < taktTime(450, 90));
// 7. More available time lengthens takt.
check('more time', taktTime(480, 90) > taktTime(450, 90));
// 8. Required rate is the inverse relationship.
check('rate inverse', near(requiredUnitsPerHour(taktTime(450, 90)), 12));
// 9. Zero demand is rejected.
let d = false; try { taktTime(450, 0); } catch (e) { d = true; }
check('demand guard', d);
// 10. Zero cycle time is rejected.
let c = false; try { unitsInShift(450, 0); } catch (e) { c = true; }
check('cycle guard', c);

console.log(passed + ' checks passed.');
