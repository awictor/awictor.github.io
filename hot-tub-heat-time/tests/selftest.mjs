import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { energyBtu, heatUpHours, riseRatePerHour } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-2; }

check('400 gal, 20F rise = 66720 BTU', near(energyBtu(400, 20), 66720));
check('400 gal, 10F rise = 33360 BTU', near(energyBtu(400, 10), 33360));
check('more gallons need more energy', energyBtu(800, 20) > energyBtu(400, 20));
check('bigger rise needs more energy', energyBtu(400, 30) > energyBtu(400, 20));
check('400 gal, 20F, 5 kW ~ 3.911 hr', near(heatUpHours(400, 20, 5), 3.9109));
check('bigger heater is faster', heatUpHours(400, 20, 6) < heatUpHours(400, 20, 5));
check('400 gal at 5 kW ~ 5.114 F/hr', near(riseRatePerHour(400, 5), 5.1139));
check('more gallons rise slower', riseRatePerHour(800, 5) < riseRatePerHour(400, 5));
check('zero heater throws', (() => { try { heatUpHours(400, 20, 0); return false; } catch(e){ return true; } })());
check('zero gallons throws', (() => { try { energyBtu(0, 20); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
