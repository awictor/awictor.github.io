import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { roomVolume, cfmForAch, achFromCfm, minutesPerAirChange } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Room volume is length x width x height.
check('volume', roomVolume(10, 10, 8) === 800);
// 2. CFM for a target ACH.
check('cfm', cfmForAch(800, 6) === 80);
// 3. ACH from a fan's CFM.
check('ach', achFromCfm(80, 800) === 6);
// 4. CFM <-> ACH round trip.
check('round trip', near(achFromCfm(cfmForAch(800, 6), 800), 6));
// 5. Minutes for one full air change.
check('minutes', minutesPerAirChange(800, 80) === 10);
// 6. One air change per hour takes 60 minutes.
check('one ach', near(minutesPerAirChange(800, cfmForAch(800, 1)), 60));
// 7. A higher target needs more airflow.
check('more ach more cfm', cfmForAch(800, 8) > cfmForAch(800, 6));
// 8. A bigger room needs more airflow.
check('bigger more cfm', cfmForAch(1600, 6) > cfmForAch(800, 6));
// 9. Zero volume is rejected for ACH.
let z = false; try { achFromCfm(80, 0); } catch (e) { z = true; }
check('volume guard', z);
// 10. Negative dimensions rejected.
let n = false; try { roomVolume(-10, 10, 8); } catch (e) { n = true; }
check('negative guard', n);

console.log(passed + ' checks passed.');
