import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { roundPanArea, rectPanArea, scaleFactor } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-4; }

check('8 in round ~ 50.27 sq in', near(roundPanArea(8), Math.PI * 16));
check('9 in round ~ 63.62 sq in', near(roundPanArea(9), Math.PI * 20.25));
check('bigger round more area', roundPanArea(10) > roundPanArea(8));
check('9x13 rect = 117 sq in', rectPanArea(9, 13) === 117);
check('8x8 rect = 64 sq in', rectPanArea(8, 8) === 64);
check('8 to 9 round ~ 1.2656x', near(scaleFactor(roundPanArea(8), roundPanArea(9)), 81 / 64));
check('same area scales to 1', near(scaleFactor(100, 100), 1));
check('bigger target scales above 1', scaleFactor(64, 117) > 1);
check('zero diameter throws', (() => { try { roundPanArea(0); return false; } catch(e){ return true; } })());
check('zero from area throws', (() => { try { scaleFactor(0, 100); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
