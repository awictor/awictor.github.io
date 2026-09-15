import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hpFromTrapSpeed, hpFromET, trapSpeedFromHp, etFromHp } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-6); }

// Trap speed of half the constant (117) at 3000 lb -> weight * 0.5^3 = 375 hp
check('HP from trap speed (Fox)', near(hpFromTrapSpeed(3000, 117), 375, 1e-6));
// ET of exactly 2x the constant (11.65 s) at 3300 lb -> 3300 / 8 = 412.5 hp
check('HP from ET (Fox)', near(hpFromET(3300, 11.65), 412.5, 1e-6));
// Predictions invert the estimates
check('trap speed from HP inverts', near(trapSpeedFromHp(3000, 375), 117));
check('ET from HP inverts', near(etFromHp(3300, 412.5), 11.65));
// Round trips
check('trap -> hp -> trap round trip', near(trapSpeedFromHp(3200, hpFromTrapSpeed(3200, 128)), 128));
check('ET -> hp -> ET round trip', near(etFromHp(3200, hpFromET(3200, 12.4)), 12.4));
// A heavier car needs more power for the same trap speed
check('heavier car needs more HP for same trap', hpFromTrapSpeed(4000, 117) > hpFromTrapSpeed(3000, 117));
// More power -> higher trap speed
check('more HP raises trap speed', trapSpeedFromHp(3000, 500) > trapSpeedFromHp(3000, 300));
// More power -> quicker ET
check('more HP lowers ET', etFromHp(3000, 500) < etFromHp(3000, 300));
// Doubling weight at fixed trap speed doubles required HP (linear in weight)
check('required HP scales linearly with weight', near(hpFromTrapSpeed(6000, 110), 2 * hpFromTrapSpeed(3000, 110)));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
