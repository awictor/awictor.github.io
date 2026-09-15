import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { roomHeatLoss, baseboardLengthFt, heatOutput } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('200 sqft at 30 = 6000 BTU', near(roomHeatLoss(200, 30), 6000));
check('300 sqft at 30 = 9000 BTU', near(roomHeatLoss(300, 30), 9000));
check('bigger room more loss', roomHeatLoss(400, 30) > roomHeatLoss(200, 30));
check('5500 BTU at 550/ft = 10 ft', near(baseboardLengthFt(5500, 550), 10));
check('higher output shorter run', baseboardLengthFt(5500, 600) < baseboardLengthFt(5500, 550));
check('more heat loss more length', baseboardLengthFt(11000, 550) > baseboardLengthFt(5500, 550));
check('10 ft at 550/ft = 5500 BTU', near(heatOutput(10, 550), 5500));
check('default output is 550', near(baseboardLengthFt(5500), baseboardLengthFt(5500, 550)));
check('zero output throws', (() => { try { baseboardLengthFt(5500, 0); return false; } catch(e){ return true; } })());
check('zero area throws', (() => { try { roomHeatLoss(0, 30); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
