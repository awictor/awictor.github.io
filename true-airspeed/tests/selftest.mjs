import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { densityRatio, trueAirspeed, tasGainPercent } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('density ratio at sea level is 1', near(densityRatio(0), 1));
check('density ratio at 10000 ft is about 0.738', near(densityRatio(10000), 0.7385, 1e-3));
check('density ratio falls with altitude', densityRatio(20000) < densityRatio(10000));
check('TAS equals CAS at sea level', near(trueAirspeed(100, 0), 100));
check('TAS exceeds CAS at altitude', trueAirspeed(100, 10000) > 100);
check('120 kt at 10000 ft is about 140 kt', near(trueAirspeed(120, 10000), 139.6, 0.5));
check('higher altitude gives higher TAS', trueAirspeed(120, 20000) > trueAirspeed(120, 10000));
check('TAS scales linearly with CAS', near(trueAirspeed(200, 5000), 2 * trueAirspeed(100, 5000)));
check('gain is roughly 2% per 1000 ft', tasGainPercent(120, 10000) > 15 && tasGainPercent(120, 10000) < 20);
check('negative airspeed throws', (() => { try { trueAirspeed(-5, 1000); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
