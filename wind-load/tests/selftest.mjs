import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dynamicPressurePsf, dynamicPressurePa, windForceLbs, windForceN, mphToMs } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// Dynamic pressure constants (ASCE 7)
check('100 mph is 25.6 psf', near(dynamicPressurePsf(100), 25.6));
check('10 m/s is 61.3 Pa', near(dynamicPressurePa(10), 61.3));
// Force = pressure x area x Cd
check('force = pressure x area (Cd 1)', near(windForceLbs(100, 32, 1), 25.6 * 32));
check('metric force = pressure x area x Cd', near(windForceN(10, 5, 1.2), 61.3 * 5 * 1.2));
// Cd scales the force linearly
check('Cd scales force linearly', near(windForceLbs(100, 32, 2), 2 * windForceLbs(100, 32, 1)));
// Area scales the force linearly
check('area scales force linearly', near(windForceLbs(100, 64, 1.5), 2 * windForceLbs(100, 32, 1.5)));
// Pressure rises with the square of speed
check('doubling speed quadruples pressure', near(dynamicPressurePsf(100), 4 * dynamicPressurePsf(50)));
// Zero wind, zero load
check('zero wind is zero pressure', dynamicPressurePsf(0) === 0 && dynamicPressurePa(0) === 0);
// mph to m/s conversion
check('100 mph is 44.704 m/s', near(mphToMs(100), 44.704));
// Faster wind, greater force
check('higher wind means more force', windForceLbs(120, 32, 1.5) > windForceLbs(80, 32, 1.5));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
