import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { snowLoadPsf, totalRoofLoad, waterEquivalentInches, depthForLoad } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. 12 in (1 ft) of 15 lb/ft3 snow is 15 psf.
check('load', snowLoadPsf(12, 15) === 15);
// 2. Double the depth doubles the load.
check('double', snowLoadPsf(24, 15) === 30);
// 3. Total load over an area.
check('total', totalRoofLoad(15, 1000) === 15000);
// 4. Water equivalent from density ratio.
check('swe', near(waterEquivalentInches(12, 6.24), 1.2));
// 5. Depth needed for a target load.
check('depth for load', depthForLoad(30, 15) === 24);
// 6. Round trip load -> depth.
check('round trip', near(depthForLoad(snowLoadPsf(24, 15), 15), 24));
// 7. Load scales with depth.
check('depth scaling', snowLoadPsf(24, 15) === 2 * snowLoadPsf(12, 15));
// 8. Denser snow means more load.
check('denser', snowLoadPsf(12, 30) > snowLoadPsf(12, 15));
// 9. Zero density rejected in depth-for-load.
let d = false; try { depthForLoad(30, 0); } catch (e) { d = true; }
check('density guard', d);
// 10. Negative depth rejected.
let n = false; try { snowLoadPsf(-1, 15); } catch (e) { n = true; }
check('depth guard', n);

console.log(passed + ' checks passed.');
