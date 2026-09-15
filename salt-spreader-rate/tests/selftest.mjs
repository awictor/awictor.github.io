import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { poundsNeeded, bagsNeeded, bagsForArea } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('5000 sqft at 4 lb/1000 = 20 lb', near(poundsNeeded(5000, 4), 20));
check('10000 sqft at 4 lb/1000 = 40 lb', near(poundsNeeded(10000, 4), 40));
check('bigger area more product', poundsNeeded(10000, 4) > poundsNeeded(5000, 4));
check('higher rate more product', poundsNeeded(5000, 8) > poundsNeeded(5000, 4));
check('20 lb in 40 lb bag = 1 bag', bagsNeeded(20, 40) === 1);
check('50 lb needs 2 bags', bagsNeeded(50, 40) === 2);
check('10000 sqft, 4 rate, 40 bag = 1 bag', bagsForArea(10000, 4, 40) === 1);
check('20000 sqft needs 2 bags', bagsForArea(20000, 4, 40) === 2);
check('zero area throws', (() => { try { poundsNeeded(0, 4); return false; } catch(e){ return true; } })());
check('zero bag weight throws', (() => { try { bagsNeeded(20, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
