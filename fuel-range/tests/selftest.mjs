import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { rangeOnTank, distanceToEmpty, gallonsForDistance, reserveRange } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 15 gal at 30 MPG goes 450 miles.
check('range', rangeOnTank(15, 30) === 450);
// 2. 5 gal left at 30 MPG is 150 miles to empty.
check('dte', distanceToEmpty(5, 30) === 150);
// 3. A 300 mile trip at 30 MPG needs 10 gal.
check('need', gallonsForDistance(300, 30) === 10);
// 4. Range keeping a 10% reserve.
check('reserve', reserveRange(15, 0.1, 30) === 405);
// 5. Range scales with MPG.
check('range scaling', rangeOnTank(15, 60) === 2 * rangeOnTank(15, 30));
// 6. A full tank's distance to empty equals its range.
check('full tank', distanceToEmpty(15, 30) === rangeOnTank(15, 30));
// 7. Fuel needed is inversely proportional to MPG.
check('need inverse', gallonsForDistance(300, 60) === gallonsForDistance(300, 30) / 2);
// 8. Zero reserve equals the full range.
check('no reserve', reserveRange(15, 0, 30) === rangeOnTank(15, 30));
// 9. Zero MPG rejected.
let m = false; try { rangeOnTank(15, 0); } catch (e) { m = true; }
check('mpg guard', m);
// 10. Reserve of 100% or more rejected.
let r = false; try { reserveRange(15, 1, 30); } catch (e) { r = true; }
check('reserve guard', r);

console.log(passed + ' checks passed.');
