import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { muzzleEnergyFtLbs, powerFactor, taylorKO, fpsToMps } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. The 450240 constant: 450.24 grains at 1000 fps = 1000 ft-lbs.
check('energy constant', near(muzzleEnergyFtLbs(450.24, 1000), 1000));
// 2. Energy grows with the square of velocity.
check('velocity squared', near(muzzleEnergyFtLbs(150, 2000), 4 * muzzleEnergyFtLbs(150, 1000)));
// 3. Energy grows linearly with bullet weight.
check('mass linear', near(muzzleEnergyFtLbs(300, 2800), 2 * muzzleEnergyFtLbs(150, 2800)));
// 4. Power factor: 124 gr at 1100 fps = 136.4.
check('power factor', near(powerFactor(124, 1100), 136.4));
// 5. Power factor scales linearly with weight.
check('pf linear', near(powerFactor(248, 1100), 2 * powerFactor(124, 1100)));
// 6. Taylor KO value.
check('taylor', near(taylorKO(300, 2400, 0.458), 300 * 2400 * 0.458 / 7000));
// 7. 1000 fps is 304.8 m/s.
check('fps->mps', near(fpsToMps(1000), 304.8));
// 8. Feet-per-second to meters conversion for unit velocity.
check('fps unit', near(fpsToMps(1), 0.3048));
// 9. Negative grains rejected.
let g = false; try { muzzleEnergyFtLbs(-1, 1000); } catch (e) { g = true; }
check('grains guard', g);
// 10. Negative velocity rejected in power factor.
let v = false; try { powerFactor(150, -1); } catch (e) { v = true; }
check('velocity guard', v);

console.log(passed + ' checks passed.');
