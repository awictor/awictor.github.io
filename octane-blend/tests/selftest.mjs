import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { blendOctane, mixRatioForTarget, volumeOfHigh } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Equal parts 87 and 93 blend to 90.
check('equal blend', blendOctane(1, 87, 1, 93) === 90);
// 2. 1 part 87 to 3 parts 93 blends to 91.5.
check('weighted blend', blendOctane(1, 87, 3, 93) === 91.5);
// 3. Half high-octane hits the midpoint target.
check('ratio half', mixRatioForTarget(87, 93, 90) === 0.5);
// 4. Target 91 needs two-thirds high-octane.
check('ratio 91', near(mixRatioForTarget(87, 93, 91), 2 / 3));
// 5. 10 units to reach 90 uses 5 units of high-octane.
check('volume', volumeOfHigh(10, 87, 93, 90) === 5);
// 6. More high-octane by volume raises the blend.
check('more high raises', blendOctane(1, 87, 2, 93) > blendOctane(2, 87, 1, 93));
// 7. Zero total volume is rejected.
let a = false; try { blendOctane(0, 87, 0, 93); } catch (e) { a = true; }
check('volume guard', a);
// 8. Two identical octanes can't target a different value.
let b = false; try { mixRatioForTarget(90, 90, 91); } catch (e) { b = true; }
check('equal octane guard', b);
// 9. A negative volume is rejected by the blend.
let c = false; try { blendOctane(-1, 87, 1, 93); } catch (e) { c = true; }
check('neg volume guard', c);
// 10. A negative total is rejected by volumeOfHigh.
let d = false; try { volumeOfHigh(-1, 87, 93, 90); } catch (e) { d = true; }
check('total guard', d);

console.log(passed + ' checks passed.');
