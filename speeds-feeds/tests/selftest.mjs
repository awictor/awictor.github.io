import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { spindleRPM, cuttingSpeedSFM, feedRate } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 0.01) => Math.abs(a - b) < t;

// 1. RPM from SFM and diameter (100 SFM, 0.5 in -> ~763.9).
check('rpm', near(spindleRPM(100, 0.5), (100 * 12) / (Math.PI * 0.5)));
// 2. Cutting speed inverts it.
check('sfm round trip', near(cuttingSpeedSFM(spindleRPM(100, 0.5), 0.5), 100));
// 3. Feed rate = RPM x chip load x flutes.
check('feed', near(feedRate(1000, 0.002, 2), 4));
// 4. More flutes means faster feed.
check('more flutes', feedRate(1000, 0.002, 4) > feedRate(1000, 0.002, 2));
// 5. A bigger tool spins slower at the same SFM.
check('bigger slower', spindleRPM(100, 1) < spindleRPM(100, 0.5));
// 6. Higher SFM means higher RPM.
check('higher sfm', spindleRPM(200, 0.5) > spindleRPM(100, 0.5));
// 7. Feed rate is linear in RPM.
check('feed linear', near(feedRate(2000, 0.002, 2), 2 * feedRate(1000, 0.002, 2)));
// 8. Zero chip load gives zero feed.
check('zero chip', feedRate(1000, 0, 2) === 0);
// 9. Zero diameter is rejected.
let d = false; try { spindleRPM(100, 0); } catch (e) { d = true; }
check('diameter guard', d);
// 10. Negative SFM is rejected.
let s = false; try { spindleRPM(-100, 0.5); } catch (e) { s = true; }
check('sfm guard', s);

console.log(passed + ' checks passed.');
