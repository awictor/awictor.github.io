import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { brixToSG, sgToBrix, potentialAlcohol } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 0.01) => Math.abs(a - b) < t;

// 1. Zero Brix is water (SG 1).
check('zero brix', brixToSG(0) === 1);
// 2. 20 Brix is about 1.083 SG.
check('20 brix', near(brixToSG(20), 1.083, 0.001));
// 3. SG rises with Brix.
check('monotonic', brixToSG(24) > brixToSG(20));
// 4. SG of 1 is about 0 Brix.
check('sg one', Math.abs(sgToBrix(1)) < 0.05);
// 5. Brix <-> SG round trip.
check('round trip', near(sgToBrix(brixToSG(22)), 22, 0.2));
// 6. Potential alcohol from Brix.
check('potential', near(potentialAlcohol(24), 24 * 0.55));
// 7. More Brix means more SG.
check('more brix more sg', brixToSG(25) > brixToSG(10));
// 8. More Brix means more potential alcohol.
check('more brix more pa', potentialAlcohol(24) > potentialAlcohol(12));
// 9. Negative Brix is rejected.
let b = false; try { brixToSG(-5); } catch (e) { b = true; }
check('brix guard', b);
// 10. Non-positive SG is rejected.
let s = false; try { sgToBrix(0); } catch (e) { s = true; }
check('sg guard', s);

console.log(passed + ' checks passed.');
