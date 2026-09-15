import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { firedSize, wetSizeForFired, shrinkagePercent } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 100 units at 12% shrink fires to 88.
check('fired', firedSize(100, 12) === 88);
// 2. To fire at 88 with 12% shrink, build it 100 wet.
check('wet for fired', near(wetSizeForFired(88, 12), 100));
// 3. 100 wet -> 88 fired is 12% shrinkage.
check('rate', shrinkagePercent(100, 88) === 12);
// 4. More shrinkage means a smaller fired size.
check('more shrink smaller', firedSize(100, 15) < firedSize(100, 12));
// 5. firedSize and wetSizeForFired invert each other.
check('roundtrip', near(firedSize(wetSizeForFired(88, 12), 12), 88));
// 6. Rate is scale-independent: 200 -> 176 is also 12%.
check('rate 200', shrinkagePercent(200, 176) === 12);
// 7. Shrinkage of 100% or more is rejected.
let a = false; try { firedSize(100, 100); } catch (e) { a = true; }
check('shrink max guard', a);
// 8. Negative shrinkage is rejected.
let b = false; try { firedSize(100, -1); } catch (e) { b = true; }
check('shrink neg guard', b);
// 9. A non-positive wet size is rejected by the rate.
let c = false; try { shrinkagePercent(0, 0); } catch (e) { c = true; }
check('wet guard', c);
// 10. wetSizeForFired rejects shrinkage of 100%.
let d = false; try { wetSizeForFired(88, 100); } catch (e) { d = true; }
check('wetfor guard', d);

console.log(passed + ' checks passed.');
