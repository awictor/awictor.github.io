import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { heatLossBtu, wattsFromBtu, heaterWatts } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-4; }

check('300 sqft, U1.1, 40F = 13200 BTU', near(heatLossBtu(300, 1.1, 40), 13200));
check('300 sqft, U0.5, 40F = 6000 BTU', near(heatLossBtu(300, 0.5, 40), 6000));
check('bigger delta more loss', heatLossBtu(300, 1.1, 50) > heatLossBtu(300, 1.1, 40));
check('more glazing more loss', heatLossBtu(400, 1.1, 40) > heatLossBtu(300, 1.1, 40));
check('lower U less loss', heatLossBtu(300, 0.5, 40) < heatLossBtu(300, 1.1, 40));
check('3412 BTU = 1000 W', near(wattsFromBtu(3412), 1000));
check('13200 BTU ~ 3868.7 W', near(wattsFromBtu(13200), 13200 / 3.412));
check('heaterWatts matches composition', near(heaterWatts(300, 1.1, 40), wattsFromBtu(13200)));
check('zero glazing throws', (() => { try { heatLossBtu(0, 1.1, 40); return false; } catch(e){ return true; } })());
check('zero delta throws', (() => { try { heatLossBtu(300, 1.1, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
