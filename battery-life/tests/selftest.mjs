import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { batteryLife, loadForRuntime, wattHours, parallelCapacity } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 2000 mAh at 100 mA, ideal, runs 20 hours.
check('runtime', batteryLife(2000, 100, 1) === 20);
// 2. 85% derating drops it to 17 hours.
check('derated', near(batteryLife(2000, 100, 0.85), 17));
// 3. Load for a 20 h target from 2000 mAh is 100 mA.
check('load solve', loadForRuntime(2000, 20, 1) === 100);
// 4. Round trip load <-> runtime.
check('round trip', near(loadForRuntime(2000, batteryLife(2000, 100, 1), 1), 100));
// 5. A 2000 mAh 3.7V cell is 7.4 Wh.
check('watt-hours', near(wattHours(2000, 3.7), 7.4));
// 6. Three cells in parallel triple the capacity.
check('parallel', parallelCapacity(2000, 3) === 6000);
// 7. Runtime is inversely proportional to load.
check('inverse load', batteryLife(2000, 200, 1) === batteryLife(2000, 100, 1) / 2);
// 8. Runtime scales linearly with capacity.
check('capacity linear', batteryLife(4000, 100, 1) === 2 * batteryLife(2000, 100, 1));
// 9. Zero load rejected.
let l = false; try { batteryLife(2000, 0, 1); } catch (e) { l = true; }
check('load guard', l);
// 10. Efficiency outside (0,1] rejected.
let e = false; try { batteryLife(2000, 100, 1.5); } catch (err) { e = true; }
check('efficiency guard', e);

console.log(passed + ' checks passed.');
