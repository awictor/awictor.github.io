import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { coverageVolumeMl, resinAmount, hardenerAmount, totalFromResin } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. 1000 cm2 at 3 mm is 300 mL.
check('coverage', coverageVolumeMl(1000, 3) === 300);
// 2. 2:1 mix of 300 mL is 200 mL resin.
check('resin', resinAmount(300, 2, 1) === 200);
// 3. ...and 100 mL hardener.
check('hardener', hardenerAmount(300, 2, 1) === 100);
// 4. Resin plus hardener equals the total.
check('sum', resinAmount(300, 2, 1) + hardenerAmount(300, 2, 1) === 300);
// 5. Total from a known resin amount.
check('from resin', totalFromResin(200, 2, 1) === 300);
// 6. A 1:1 mix is equal parts.
check('one to one', resinAmount(300, 1, 1) === 150);
// 7. Resin scales with total.
check('resin scaling', resinAmount(600, 2, 1) === 2 * resinAmount(300, 2, 1));
// 8. Coverage scales with thickness.
check('thickness scaling', coverageVolumeMl(1000, 6) === 2 * coverageVolumeMl(1000, 3));
// 9. Zero resin parts rejected.
let p = false; try { resinAmount(300, 0, 1); } catch (e) { p = true; }
check('parts guard', p);
// 10. Negative thickness rejected.
let t = false; try { coverageVolumeMl(1000, -1); } catch (e) { t = true; }
check('thickness guard', t);

console.log(passed + ' checks passed.');
