import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { powerFromSpeed, speedFromPower } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-6); }

// At a standstill there is no power demand (every term carries a factor of v)
check('power at zero speed is zero', near(powerFromSpeed(0, {}), 0));
check('speed at zero power is zero', near(speedFromPower(0, {}), 0));
// Known value: 10 m/s, defaults (m=80, CdA=0.32, Crr=0.005, rho=1.225, eff=0.97), flat
// (roll 39.2266 + aero 196) / 0.97 = 242.5017 W
check('power from speed matches the model', near(powerFromSpeed(10, { grade: 0 }), 242.5017, 0.01));
// Power and speed invert each other
check('speed <-> power round trips on the flat', near(speedFromPower(powerFromSpeed(10, {}), {}), 10, 1e-3));
check('round trips on a climb too', near(speedFromPower(powerFromSpeed(6, { grade: 4 }), { grade: 4 }), 6, 1e-3));
// Monotonicity
check('more power means more speed', speedFromPower(300, {}) > speedFromPower(150, {}));
check('more speed needs more power', powerFromSpeed(12, {}) > powerFromSpeed(8, {}));
// Grade effects
check('climbing needs more power than the flat', powerFromSpeed(8, { grade: 5 }) > powerFromSpeed(8, { grade: 0 }));
check('descending needs less power than the flat', powerFromSpeed(8, { grade: -5 }) < powerFromSpeed(8, { grade: 0 }));
// A bigger drag area costs more power at the same speed
check('more drag area costs more power', powerFromSpeed(11, { cda: 0.4 }) > powerFromSpeed(11, { cda: 0.3 }));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
