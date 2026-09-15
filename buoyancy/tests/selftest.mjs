import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { buoyantForce, displacedVolume, willFloat, apparentWeight, G } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. One cubic metre of water gives ~9806.65 N of lift.
check('force', near(buoyantForce(1000, 1), 1000 * G));
// 2. Buoyant force scales with volume.
check('scales', buoyantForce(1000, 2) === 2 * buoyantForce(1000, 1));
// 3. A floating 1000 kg object displaces 1 m3 of water.
check('displaced', near(displacedVolume(1000, 1000), 1));
// 4. Wood (less dense than water) floats.
check('wood floats', willFloat(500, 1000) === true);
// 5. Aluminium sinks.
check('aluminium sinks', willFloat(2700, 1000) === false);
// 6. Equal density does not float (strict).
check('equal sinks', willFloat(1000, 1000) === false);
// 7. Apparent weight subtracts the buoyant force.
check('apparent', near(apparentWeight(1000, 0.5, 1000), 1000 * G - buoyantForce(1000, 0.5)));
// 8. Apparent weight is less than dry weight in a fluid.
check('lighter submerged', apparentWeight(1000, 0.5, 1000) < 1000 * G);
// 9. Zero fluid density is rejected for displaced volume.
let z = false; try { displacedVolume(1000, 0); } catch (e) { z = true; }
check('density guard', z);
// 10. Negative volume is rejected.
let n = false; try { buoyantForce(1000, -1); } catch (e) { n = true; }
check('volume guard', n);

console.log(passed + ' checks passed.');
