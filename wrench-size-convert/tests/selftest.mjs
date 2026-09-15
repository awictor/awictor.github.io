import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { mmToInch, inchToMm, nearestWrenchInch } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('25.4 mm = 1 inch', near(mmToInch(25.4), 1));
check('1 inch = 25.4 mm', near(inchToMm(1), 25.4));
check('round trip 10 mm', near(inchToMm(mmToInch(10)), 10));
check('12.7 mm = 0.5 inch', near(mmToInch(12.7), 0.5));
check('bigger mm bigger inch', mmToInch(20) > mmToInch(10));
check('13 mm nearest is 1/2 inch', near(nearestWrenchInch(13, 32), 0.5));
check('10 mm nearest is 13/32', near(nearestWrenchInch(10, 32), 13 / 32));
check('0.75 inch = 19.05 mm', near(inchToMm(0.75), 19.05));
check('zero denom throws', (() => { try { nearestWrenchInch(13, 0); return false; } catch(e){ return true; } })());
check('negative mm throws', (() => { try { mmToInch(-5); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
