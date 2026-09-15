import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { consumptionGph, runtimeHours, runtimeForLoad } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('5 kW at full load = 0.55 gph', near(consumptionGph(5, 1), 0.55));
check('5 kW at half load = 0.275 gph', near(consumptionGph(5, 0.5), 0.275));
check('higher load burns more', consumptionGph(5, 1) > consumptionGph(5, 0.5));
check('bigger generator burns more', consumptionGph(8, 1) > consumptionGph(5, 1));
check('5 gal at 0.55 gph ~ 9.09 hr', near(runtimeHours(5, 0.55), 5 / 0.55));
check('runtimeForLoad matches composition', near(runtimeForLoad(5, 5, 1), runtimeHours(5, consumptionGph(5, 1))));
check('lighter load runs longer', runtimeForLoad(5, 5, 0.5) > runtimeForLoad(5, 5, 1));
check('bigger tank runs longer', runtimeForLoad(10, 5, 1) > runtimeForLoad(5, 5, 1));
check('zero rated power throws', (() => { try { consumptionGph(0, 1); return false; } catch(e){ return true; } })());
check('load over 1 throws', (() => { try { consumptionGph(5, 1.5); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
