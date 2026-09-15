import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { lumensFromWatts, wattsFromLumens, replaceIncandescent, equivalentIncandescentWatts } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('10 W LED = 900 lm', lumensFromWatts(10, 90) === 900);
check('900 lm at 90 lm/W = 10 W', near(wattsFromLumens(900, 90), 10));
check('watt/lumen round trip', near(wattsFromLumens(lumensFromWatts(8, 90), 90), 8));
check('60 W incandescent = 10 W LED', near(replaceIncandescent(60, 90), 10));
check('higher efficacy needs fewer watts', wattsFromLumens(900, 90) < wattsFromLumens(900, 15));
check('LED brighter per watt than incandescent', lumensFromWatts(10, 90) > lumensFromWatts(10, 15));
check('100 W incandescent ≈ 16.7 W LED', near(replaceIncandescent(100, 90), 100 * 15 / 90));
check('900 lm equals a 60 W incandescent', near(equivalentIncandescentWatts(900), 60));
check('bigger incandescent needs bigger LED', replaceIncandescent(100, 90) > replaceIncandescent(60, 90));
check('zero watts throws', (() => { try { lumensFromWatts(0, 90); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
