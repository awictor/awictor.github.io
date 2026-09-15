import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { boltTorque, clampForce } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. T = K*D*F: 0.2 * 0.01 m * 10000 N = 20 N.m.
check('torque', near(boltTorque(0.2, 0.01, 10000), 20));
// 2. Clamp force inverts it.
check('clamp force', near(clampForce(20, 0.2, 0.01), 10000));
// 3. Torque <-> force round trip.
check('round trip', near(clampForce(boltTorque(0.2, 0.01, 10000), 0.2, 0.01), 10000));
// 4. Lubricated (lower K) needs less torque for the same clamp.
check('lube less torque', boltTorque(0.15, 0.01, 10000) < boltTorque(0.2, 0.01, 10000));
// 5. Bigger diameter needs more torque.
check('bigger more', boltTorque(0.2, 0.012, 10000) > boltTorque(0.2, 0.01, 10000));
// 6. Torque is linear in clamp force.
check('linear', near(boltTorque(0.2, 0.01, 20000), 2 * boltTorque(0.2, 0.01, 10000)));
// 7. For a fixed torque, lower K gives more clamp force.
check('lower k more clamp', clampForce(20, 0.15, 0.01) > clampForce(20, 0.2, 0.01));
// 8. Zero clamp force means zero torque.
check('zero force', boltTorque(0.2, 0.01, 0) === 0);
// 9. Zero K is rejected when solving clamp force.
let k = false; try { clampForce(20, 0, 0.01); } catch (e) { k = true; }
check('k guard', k);
// 10. Negative diameter is rejected.
let d = false; try { boltTorque(0.2, -0.01, 10000); } catch (e) { d = true; }
check('diameter guard', d);

console.log(passed + ' checks passed.');
