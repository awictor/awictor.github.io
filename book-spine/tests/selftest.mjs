import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { spineInches, spineMm, pagesForSpine } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 444 pages at 444 PPI is a 1 inch spine.
check('one inch', spineInches(444, 444) === 1);
// 2. Half the pages, half the spine.
check('half', spineInches(222, 444) === 0.5);
// 3. One inch is 25.4 mm.
check('mm', near(spineMm(444, 444), 25.4));
// 4. pagesForSpine inverts spineInches.
check('inverse', pagesForSpine(1, 444) === 444);
// 5. Round-trip.
check('roundtrip', near(pagesForSpine(spineInches(300, 444), 444), 300));
// 6. More pages, thicker spine.
check('more pages', spineInches(500, 444) > spineInches(300, 444));
// 7. Thicker paper (lower PPI) makes a thicker spine.
check('thicker paper', spineInches(444, 350) > spineInches(444, 444));
// 8. A negative page count is rejected.
let a = false; try { spineInches(-1, 444); } catch (e) { a = true; }
check('pages guard', a);
// 9. A non-positive PPI is rejected.
let b = false; try { spineInches(300, 0); } catch (e) { b = true; }
check('ppi guard', b);
// 10. pagesForSpine rejects a non-positive PPI.
let c = false; try { pagesForSpine(1, 0); } catch (e) { c = true; }
check('ppi guard 2', c);

console.log(passed + ' checks passed.');
