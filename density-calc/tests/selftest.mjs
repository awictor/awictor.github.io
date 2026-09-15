import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { density, mass, volume } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 1000 kg in 1 m³ = 1000 kg/m³ (water).
check('density water', density(1000, 1) === 1000);
// 2. mass = density × volume.
check('mass', mass(2700, 0.5) === 1350);
// 3. volume = mass / density.
check('volume', volume(2700, 2700) === 1);
// 4. Round trip density.
check('round trip d', near(density(mass(1234, 0.7), 0.7), 1234));
// 5. Round trip volume.
check('round trip v', near(volume(mass(800, 3), 800), 3));
// 6. Linear in volume for mass.
check('linear', mass(1000, 2) === 2 * mass(1000, 1));
// 7. 1 kg in 1 litre (0.001 m³) = 1000 kg/m³.
check('litre', density(1, 0.001) === 1000);
// 8. Volume guard.
let z = false; try { density(1, 0); } catch (e) { z = true; }
check('volume guard', z);
// 9. Density guard on volume().
let z2 = false; try { volume(1, 0); } catch (e) { z2 = true; }
check('density guard', z2);
// 10. Denser material, same mass, smaller volume.
check('denser smaller volume', volume(10, 19300) < volume(10, 1000));

console.log(passed + ' checks passed.');
