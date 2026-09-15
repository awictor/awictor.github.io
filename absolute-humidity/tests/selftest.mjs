import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { saturationVaporPressure, absoluteHumidity, relativeHumidityFromAH } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 0.01) => Math.abs(a - b) < t;

// 1. Reference: 20 C, 50% RH -> ~8.64 g/m3.
check('ref 20/50', near(absoluteHumidity(20, 50), 8.6391));
// 2. Reference: 30 C, 100% RH -> ~30.35 g/m3.
check('ref 30/100', near(absoluteHumidity(30, 100), 30.3541));
// 3. Absolute humidity is linear in relative humidity.
check('linear in rh', near(absoluteHumidity(20, 100), 2 * absoluteHumidity(20, 50)));
// 4. Zero RH is zero water.
check('zero rh', absoluteHumidity(20, 0) === 0);
// 5. Warmer air at the same RH holds more water.
check('warmer more', absoluteHumidity(30, 50) > absoluteHumidity(20, 50));
// 6. Saturation vapor pressure at 0 C is 6.112 hPa.
check('svp zero', near(saturationVaporPressure(0), 6.112));
// 7. SVP rises with temperature.
check('svp rises', saturationVaporPressure(30) > saturationVaporPressure(20));
// 8. Relative humidity round trips from absolute.
check('rh round trip', near(relativeHumidityFromAH(20, absoluteHumidity(20, 50)), 50));
// 9. RH above 100 is rejected.
let h = false; try { absoluteHumidity(20, 120); } catch (e) { h = true; }
check('rh guard', h);
// 10. Negative RH is rejected.
let n = false; try { absoluteHumidity(20, -5); } catch (e) { n = true; }
check('negative guard', n);

console.log(passed + ' checks passed.');
