import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { frameSizeCm, mtbSizeInches, standoverTarget } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-9); }

check('80 cm inseam road frame is 53.2 cm', near(frameSizeCm(80, 'road'), 53.2));
check('80 cm inseam MTB frame is 45.92 cm', near(frameSizeCm(80, 'mountain'), 45.92));
check('80 cm inseam hybrid frame is 50.4 cm', near(frameSizeCm(80, 'hybrid'), 50.4));
check('road frame is larger than mountain', frameSizeCm(80, 'road') > frameSizeCm(80, 'mountain'));
check('MTB size in inches is 18.08', near(mtbSizeInches(80), 18.08));
check('bigger inseam gives bigger frame', frameSizeCm(90, 'road') > frameSizeCm(80, 'road'));
check('mountain wants more standover clearance', standoverTarget('mountain') === '3–5 in');
check('road wants least standover clearance', standoverTarget('road') === '1–2 in');
check('unknown bike type throws', (() => { try { frameSizeCm(80, 'bmx'); return false; } catch(e){ return true; } })());
check('zero inseam throws', (() => { try { frameSizeCm(0, 'road'); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
