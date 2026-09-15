import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { volumetricFlow, maxSpeed, defaultLineWidth } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('0.2 x 0.4 x 60 = 4.8 mm3/s', near(volumetricFlow(0.2, 0.4, 60), 4.8));
check('0.3 x 0.4 x 60 = 7.2 mm3/s', near(volumetricFlow(0.3, 0.4, 60), 7.2));
check('thicker layer more flow', volumetricFlow(0.3, 0.4, 60) > volumetricFlow(0.2, 0.4, 60));
check('faster speed more flow', volumetricFlow(0.2, 0.4, 80) > volumetricFlow(0.2, 0.4, 60));
check('12 flow, 0.2, 0.4 = 150 mm/s', near(maxSpeed(12, 0.2, 0.4), 150));
check('thicker layer lowers max speed', maxSpeed(12, 0.3, 0.4) < maxSpeed(12, 0.2, 0.4));
check('0.4 nozzle default width = 0.48', near(defaultLineWidth(0.4), 0.48));
check('0.6 nozzle default width = 0.72', near(defaultLineWidth(0.6), 0.72));
check('zero layer throws', (() => { try { volumetricFlow(0, 0.4, 60); return false; } catch(e){ return true; } })());
check('zero max flow throws', (() => { try { maxSpeed(0, 0.2, 0.4); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
