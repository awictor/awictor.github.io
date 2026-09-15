import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { netSquares, areaWithWaste, squaresNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('1000 sqft = 10 net squares', near(netSquares(1000), 10));
check('250 sqft = 2.5 net squares', near(netSquares(250), 2.5));
check('1000 sqft no waste = 10 squares', squaresNeeded(1000, 1.0) === 10);
check('1000 sqft with 10% = 11 squares', squaresNeeded(1000, 1.1) === 11);
check('1050 sqft rounds to 11 squares', squaresNeeded(1050, 1.0) === 11);
check('1000 sqft x 1.1 = 1100 sq ft', near(areaWithWaste(1000, 1.1), 1100));
check('bigger area needs more squares', squaresNeeded(2000, 1.0) > squaresNeeded(1000, 1.0));
check('more waste needs more squares', squaresNeeded(1000, 1.2) > squaresNeeded(1000, 1.0));
check('zero area throws', (() => { try { netSquares(0); return false; } catch(e){ return true; } })());
check('waste under 1 throws', (() => { try { areaWithWaste(1000, 0.9); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
