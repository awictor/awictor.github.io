import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tubePerSqFt, tubeLengthFt, loopsNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('6 in spacing = 2 ft per sqft', near(tubePerSqFt(6), 2));
check('12 in spacing = 1 ft per sqft', near(tubePerSqFt(12), 1));
check('tighter spacing more tube', tubePerSqFt(6) > tubePerSqFt(12));
check('300 sqft at 12 in = 300 ft', near(tubeLengthFt(300, 12), 300));
check('300 sqft at 6 in = 600 ft', near(tubeLengthFt(300, 6), 600));
check('more area more tube', tubeLengthFt(600, 12) > tubeLengthFt(300, 12));
check('600 ft over 300 ft loops = 2', loopsNeeded(600, 300) === 2);
check('300 ft = 1 loop', loopsNeeded(300, 300) === 1);
check('zero spacing throws', (() => { try { tubePerSqFt(0); return false; } catch(e){ return true; } })());
check('zero max loop throws', (() => { try { loopsNeeded(600, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
