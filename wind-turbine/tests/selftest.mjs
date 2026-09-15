import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sweptArea, turbinePower, annualEnergyKWh } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Swept area of a 2 m rotor is pi.
check('area', near(sweptArea(2), Math.PI));
// 2. Known power: d=2, v=10, Cp=0.4 => ~769.69 W.
check('power', near(turbinePower(2, 10, 0.4), 769.6902001294994, 1e-6));
// 3. Power scales with the cube of wind speed (2x wind = 8x power).
check('cubic', near(turbinePower(2, 20, 0.4), turbinePower(2, 10, 0.4) * 8, 1e-6));
// 4. Power scales with swept area (2x diameter = 4x power).
check('area scale', near(turbinePower(4, 10, 0.4), turbinePower(2, 10, 0.4) * 4, 1e-6));
// 5. Zero wind yields zero power.
check('zero wind', turbinePower(2, 0, 0.4) === 0);
// 6. Cp above the Betz limit is rejected.
let b = false; try { turbinePower(2, 10, 0.7); } catch (e) { b = true; }
check('betz guard', b);
// 7. A non-positive Cp is rejected.
let c = false; try { turbinePower(2, 10, 0); } catch (e) { c = true; }
check('cp guard', c);
// 8. Annual energy: 1000 W at 0.3 capacity factor = 2628 kWh.
check('annual', near(annualEnergyKWh(1000, 0.3), 2628));
// 9. A capacity factor above 1 is rejected.
let f = false; try { annualEnergyKWh(1000, 1.5); } catch (e) { f = true; }
check('cf guard', f);
// 10. A non-positive diameter is rejected.
let d = false; try { sweptArea(0); } catch (e) { d = true; }
check('diameter guard', d);

console.log(passed + ' checks passed.');
