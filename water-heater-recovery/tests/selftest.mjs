import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { btuToHeat, wattsToBtuPerHour, recoveryHours } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('50 gal, 70°F rise = 29190 BTU', near(btuToHeat(50, 70), 29190));
check('more gallons need more BTU', btuToHeat(80, 70) > btuToHeat(50, 70));
check('bigger rise needs more BTU', btuToHeat(50, 90) > btuToHeat(50, 70));
check('4500 W = 15354 BTU/hr', near(wattsToBtuPerHour(4500), 15354));
check('50 gal/70°F at 15354 BTU/hr = ~1.9 hr', near(recoveryHours(50, 70, 15354, 1.0), 29190 / 15354));
check('double input halves the time', near(recoveryHours(50, 70, 30708, 1.0), recoveryHours(50, 70, 15354, 1.0) / 2));
check('lower efficiency takes longer', recoveryHours(50, 70, 15354, 0.8) > recoveryHours(50, 70, 15354, 1.0));
check('zero gallons throws', (() => { try { btuToHeat(0, 70); return false; } catch(e){ return true; } })());
check('zero input throws', (() => { try { recoveryHours(50, 70, 0, 1.0); return false; } catch(e){ return true; } })());
check('zero efficiency throws', (() => { try { recoveryHours(50, 70, 15354, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
