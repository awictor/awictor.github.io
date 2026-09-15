import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { stripWatts, stripAmps, psuWatts } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 5 m of 14.4 W/m is 72 W.
check('watts', stripWatts(14.4, 5) === 72);
// 2. 72 W at 12 V is 6 A.
check('amps', stripAmps(72, 12) === 6);
// 3. 20% headroom gives 86.4 W.
check('psu', near(psuWatts(72, 20), 86.4));
// 4. Watts -> amps round trip.
check('round trip', stripAmps(stripWatts(14.4, 5), 12) === 6);
// 5. A longer strip draws more.
check('longer more', stripWatts(14.4, 10) > stripWatts(14.4, 5));
// 6. Higher voltage means lower current at the same power.
check('higher v lower a', stripAmps(72, 24) < stripAmps(72, 12));
// 7. More headroom means a bigger supply.
check('more headroom', psuWatts(72, 30) > psuWatts(72, 20));
// 8. Zero headroom equals the load.
check('zero headroom', psuWatts(72, 0) === 72);
// 9. Zero voltage is rejected.
let v = false; try { stripAmps(72, 0); } catch (e) { v = true; }
check('voltage guard', v);
// 10. Negative length is rejected.
let n = false; try { stripWatts(14.4, -5); } catch (e) { n = true; }
check('length guard', n);

console.log(passed + ' checks passed.');
