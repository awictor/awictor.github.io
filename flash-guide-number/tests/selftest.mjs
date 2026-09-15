import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { flashDistance, requiredAperture, adjustGuideNumber } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. GN 56 at f/8 reaches 7 units.
check('distance', flashDistance(56, 8) === 7);
// 2. GN 56 over 7 units needs f/8.
check('aperture', requiredAperture(56, 7) === 8);
// 3. Distance and aperture invert each other.
check('roundtrip', near(requiredAperture(56, flashDistance(56, 8)), 8));
// 4. Two stops of ISO (100 -> 400) doubles the guide number.
check('iso 400', near(adjustGuideNumber(56, 400), 112));
// 5. At the base ISO the guide number is unchanged.
check('iso base', adjustGuideNumber(56, 100) === 56);
// 6. Higher ISO gives a larger guide number.
check('higher iso more', adjustGuideNumber(56, 800) > adjustGuideNumber(56, 400));
// 7. A smaller aperture (bigger f-number) shortens reach.
check('smaller aperture closer', flashDistance(56, 16) < flashDistance(56, 8));
// 8. A non-positive aperture is rejected.
let a = false; try { flashDistance(56, 0); } catch (e) { a = true; }
check('aperture guard', a);
// 9. A non-positive distance is rejected.
let b = false; try { requiredAperture(56, 0); } catch (e) { b = true; }
check('distance guard', b);
// 10. A non-positive ISO is rejected.
let c = false; try { adjustGuideNumber(56, 0); } catch (e) { c = true; }
check('iso guard', c);

console.log(passed + ' checks passed.');
