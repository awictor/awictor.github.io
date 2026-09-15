import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { whFromMah, mahFromWh, packVoltage, packCapacityMah, packEnergyWh } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 1000 mAh at 3.7 V is 3.7 Wh.
check('wh', near(whFromMah(1000, 3.7), 3.7));
// 2. Inverse: 3.7 Wh at 3.7 V is 1000 mAh.
check('mah', near(mahFromWh(3.7, 3.7), 1000));
// 3. Wh <-> mAh round trip.
check('round trip', near(mahFromWh(whFromMah(2500, 3.6), 3.6), 2500));
// 4. Series multiplies voltage.
check('series voltage', near(packVoltage(3.7, 3), 11.1));
// 5. Parallel multiplies capacity.
check('parallel capacity', packCapacityMah(2500, 4) === 10000);
// 6. Full pack energy.
check('pack energy', near(packEnergyWh(3500, 3.7, 3, 2), 3500 * 2 * 3.7 * 3 / 1000));
// 7. More parallel cells store more energy.
check('more parallel', packEnergyWh(3500, 3.7, 3, 3) > packEnergyWh(3500, 3.7, 3, 2));
// 8. More series cells store more energy.
check('more series', packEnergyWh(3500, 3.7, 4, 2) > packEnergyWh(3500, 3.7, 3, 2));
// 9. Zero voltage rejected when solving mAh.
let z = false; try { mahFromWh(10, 0); } catch (e) { z = true; }
check('voltage guard', z);
// 10. Negative capacity rejected.
let n = false; try { whFromMah(-100, 3.7); } catch (e) { n = true; }
check('negative guard', n);

console.log(passed + ' checks passed.');
