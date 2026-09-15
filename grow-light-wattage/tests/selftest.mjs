import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { canopyArea, wattsNeeded, wattsForArea } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('4x4 canopy = 16 sq ft', canopyArea(4, 4) === 16);
check('2x4 canopy = 8 sq ft', canopyArea(2, 4) === 8);
check('bigger canopy more area', canopyArea(5, 5) > canopyArea(4, 4));
check('16 sq ft flowering = 640 W', wattsNeeded(16, 'flower') === 640);
check('16 sq ft veg = 400 W', wattsNeeded(16, 'veg') === 400);
check('16 sq ft seedling = 240 W', wattsNeeded(16, 'seedling') === 240);
check('flowering needs more than veg', wattsNeeded(16, 'flower') > wattsNeeded(16, 'veg'));
check('wattsForArea matches composition', wattsForArea(4, 4, 'flower') === wattsNeeded(16, 'flower'));
check('unknown stage throws', (() => { try { wattsNeeded(16, 'harvest'); return false; } catch(e){ return true; } })());
check('zero length throws', (() => { try { canopyArea(0, 4); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
