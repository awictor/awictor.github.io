import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { lumensNeeded, bulbsNeeded, footcandlesFromLumens } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. 100 sq ft at 20 fc needs 2000 lumens.
check('living', lumensNeeded(100, 20) === 2000);
// 2. 100 sq ft at 50 fc (kitchen) needs 5000 lumens.
check('kitchen', lumensNeeded(100, 50) === 5000);
// 3. 2000 lumens in 800-lm bulbs rounds up to 3.
check('bulbs', bulbsNeeded(2000, 800) === 3);
// 4. An exact multiple is not padded.
check('bulbs exact', bulbsNeeded(1600, 800) === 2);
// 5. footcandlesFromLumens inverts lumensNeeded.
check('inverse', footcandlesFromLumens(2000, 100) === 20);
// 6. A bigger room needs more lumens.
check('bigger more', lumensNeeded(200, 20) > lumensNeeded(100, 20));
// 7. A non-positive area is rejected.
let a = false; try { lumensNeeded(0, 20); } catch (e) { a = true; }
check('area guard', a);
// 8. Negative footcandles are rejected.
let b = false; try { lumensNeeded(100, -1); } catch (e) { b = true; }
check('fc guard', b);
// 9. A non-positive bulb output is rejected.
let c = false; try { bulbsNeeded(2000, 0); } catch (e) { c = true; }
check('bulb guard', c);
// 10. footcandlesFromLumens rejects a non-positive area.
let d = false; try { footcandlesFromLumens(2000, 0); } catch (e) { d = true; }
check('area guard 2', d);

console.log(passed + ' checks passed.');
