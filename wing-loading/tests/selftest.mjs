import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sqInToSqFt, wingLoading, cubicWingLoading, wclCategory } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('144 sq in is 1 sq ft', near(sqInToSqFt(144), 1));
check('160 oz over 4 sq ft is 40 oz/ft2', near(wingLoading(160, 4), 40));
check('larger area lowers loading', wingLoading(160, 8) < wingLoading(160, 4));
check('heavier raises loading', wingLoading(200, 4) > wingLoading(160, 4));
check('cubic wing loading of 160 oz on 4 sq ft is 20', near(cubicWingLoading(160, 4), 20));
check('WCL 3 is a floater', wclCategory(3) === 'floater');
check('WCL 5 is a trainer', wclCategory(5) === 'trainer');
check('WCL 14 is overweight', wclCategory(14) === 'overweight');
check('zero area wing loading throws', (() => { try { wingLoading(160, 0); return false; } catch(e){ return true; } })());
check('zero area sqInToSqFt throws', (() => { try { sqInToSqFt(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
