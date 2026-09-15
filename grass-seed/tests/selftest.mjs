import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { seedPounds, areaCovered, bagsNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 5000 sq ft at 6 lb/1000 = 30 lb.
check('pounds', seedPounds(5000, 6) === 30);
// 2. 1000 sq ft at 6 lb/1000 = 6 lb.
check('pounds 1000', seedPounds(1000, 6) === 6);
// 3. 30 lb at 6 lb/1000 covers 5000 sq ft.
check('coverage', areaCovered(30, 6) === 5000);
// 4. seedPounds and areaCovered invert each other.
check('roundtrip', near(areaCovered(seedPounds(5000, 6), 6), 5000));
// 5. A bigger lawn needs more seed.
check('bigger more', seedPounds(8000, 6) > seedPounds(5000, 6));
// 6. A higher rate needs more seed.
check('rate more', seedPounds(5000, 8) > seedPounds(5000, 6));
// 7. 30 lb in 25 lb bags rounds up to 2 bags.
check('bags round up', bagsNeeded(30, 25) === 2);
// 8. An exact bag fill is one bag.
check('bags exact', bagsNeeded(25, 25) === 1);
// 9. A negative area is rejected.
let a = false; try { seedPounds(-1, 6); } catch (e) { a = true; }
check('area guard', a);
// 10. A non-positive rate is rejected by areaCovered.
let b = false; try { areaCovered(30, 0); } catch (e) { b = true; }
check('rate guard', b);

console.log(passed + ' checks passed.');
