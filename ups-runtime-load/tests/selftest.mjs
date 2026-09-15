import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { batteryWh, runtimeMinutes, runtimeForBattery } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('9 Ah at 12 V = 108 Wh', batteryWh(9, 12) === 108);
check('18 Ah at 12 V = 216 Wh', batteryWh(18, 12) === 216);
check('bigger battery more Wh', batteryWh(18, 12) > batteryWh(9, 12));
check('108 Wh, 100 W, 90% = 58.32 min', near(runtimeMinutes(108, 100, 0.9), 58.32));
check('more load less runtime', runtimeMinutes(108, 200, 0.9) < runtimeMinutes(108, 100, 0.9));
check('runtimeForBattery matches composition', near(runtimeForBattery(9, 12, 100, 0.9), runtimeMinutes(108, 100, 0.9)));
check('default efficiency is 0.9', near(runtimeMinutes(108, 100), runtimeMinutes(108, 100, 0.9)));
check('higher efficiency more runtime', runtimeMinutes(108, 100, 1) > runtimeMinutes(108, 100, 0.9));
check('zero load throws', (() => { try { runtimeMinutes(108, 0, 0.9); return false; } catch(e){ return true; } })());
check('zero capacity throws', (() => { try { batteryWh(0, 12); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
