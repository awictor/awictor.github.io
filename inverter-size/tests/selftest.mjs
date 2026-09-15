import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { continuousWatts, surgeWatts, peakDemand } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('1000 W at 1.25 = 1250 W', near(continuousWatts(1000), 1250));
check('1000 W at 1.5 = 1500 W', near(continuousWatts(1000, 1.5), 1500));
check('more load more continuous', continuousWatts(2000) > continuousWatts(1000));
check('500 W motor surge = 1500 W', near(surgeWatts(500), 1500));
check('500 W motor at 2x = 1000 W', near(surgeWatts(500, 2), 1000));
check('peak of 1000 total, 500 motor = 2000', near(peakDemand(1000, 500), 2000));
check('no motor, peak equals total', near(peakDemand(1000, 0), 1000));
check('bigger motor bigger peak', peakDemand(1000, 700) > peakDemand(1000, 500));
check('motor over total throws', (() => { try { peakDemand(1000, 1500); return false; } catch(e){ return true; } })());
check('zero running throws', (() => { try { continuousWatts(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
