import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { avgDepthFromSlope, rectPoolGallons, roundPoolGallons, gallonsToLiters } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;
const rel = (a, b, t = 1e-9) => Math.abs(a - b) <= t * Math.max(1, Math.abs(a), Math.abs(b));

// 1. One cubic foot of water is about 7.4805 US gallons.
check('cubic foot', near(rectPoolGallons(1, 1, 1), 7.480519480519481));
// 2. A 40x20 pool at 5 ft average depth = 4000 cu ft of gallons.
check('rect pool', rel(rectPoolGallons(40, 20, 5), 4000 * 7.480519480519481));
// 3. Round pool is pi*r^2*depth in gallons.
check('round pool', rel(roundPoolGallons(24, 5), Math.PI * 144 * 5 * 7.480519480519481));
// 4. Average depth of a sloped bottom.
check('avg depth', avgDepthFromSlope(3, 9) === 6);
// 5. Gallons to liters.
check('gal->liters', near(gallonsToLiters(1), 3.785411784));
// 6. Volume scales linearly with depth.
check('depth scaling', rel(rectPoolGallons(10, 10, 10), 2 * rectPoolGallons(10, 10, 5)));
// 7. A round pool of diameter D holds pi/4 of the square pool DxD.
check('round vs square', rel(roundPoolGallons(20, 5), (Math.PI / 4) * rectPoolGallons(20, 20, 5)));
// 8. 100 gallons is 378.54 liters.
check('100 gal', near(gallonsToLiters(100), 378.5411784));
// 9. Non-positive dimension rejected (rectangular).
let r = false; try { rectPoolGallons(10, 10, 0); } catch (e) { r = true; }
check('rect guard', r);
// 10. Non-positive diameter rejected (round).
let d = false; try { roundPoolGallons(0, 5); } catch (e) { d = true; }
check('round guard', d);

console.log(passed + ' checks passed.');
