import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ozToMm, ozToInches, mmToOz, inchesToOz, leatherUse } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-9); }

check('8 oz is 0.125 inch', near(ozToInches(8), 0.125));
check('8 oz is 3.175 mm', near(ozToMm(8), 3.175));
check('1 oz is ~0.397 mm', near(ozToMm(1), 0.396875));
check('3.175 mm is 8 oz', near(mmToOz(3.175), 8));
check('0.125 inch is 8 oz', near(inchesToOz(0.125), 8));
check('round trip oz to mm to oz', near(mmToOz(ozToMm(6)), 6));
check('thicker leather is more ounces', ozToMm(10) > ozToMm(4));
check('8 oz is belts and holsters', leatherUse(8) === 'belts & holsters');
check('3 oz is linings and garments', leatherUse(3) === 'linings & garments');
check('negative weight throws', (() => { try { ozToMm(-1); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
