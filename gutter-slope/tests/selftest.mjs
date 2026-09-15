import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { totalDrop, downspoutsNeeded, dropAtDistance } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('40 ft run at 1/4 per 10 = 1 in drop', near(totalDrop(40, 0.25), 1));
check('20 ft run = 0.5 in drop', near(totalDrop(20, 0.25), 0.5));
check('longer run more drop', totalDrop(60, 0.25) > totalDrop(40, 0.25));
check('steeper slope more drop', totalDrop(40, 0.5) > totalDrop(40, 0.25));
check('35 ft run = 1 downspout', downspoutsNeeded(35, 35) === 1);
check('40 ft run = 2 downspouts', downspoutsNeeded(40, 35) === 2);
check('70 ft run = 2 downspouts', downspoutsNeeded(70, 35) === 2);
check('drop at 10 ft = 0.25 in', near(dropAtDistance(10, 0.25), 0.25));
check('zero run throws', (() => { try { totalDrop(0, 0.25); return false; } catch(e){ return true; } })());
check('zero max run throws', (() => { try { downspoutsNeeded(40, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
