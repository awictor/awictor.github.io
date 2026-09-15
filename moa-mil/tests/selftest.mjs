import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { moaToInches, milToInches, moaToMil, milToMoa, inchesToMoa } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('1 MOA is 1.047 in at 100 yd', near(moaToInches(1, 100), 1.047));
check('1 MOA is 2.094 in at 200 yd', near(moaToInches(1, 200), 2.094));
check('1 mil is 3.6 in at 100 yd', near(milToInches(1, 100), 3.6));
check('1 mil is 7.2 in at 200 yd', near(milToInches(1, 200), 7.2));
check('3.4377 MOA is 1 mil', near(moaToMil(3.4377), 1, 1e-4));
check('1 mil is 3.4377 MOA', near(milToMoa(1), 3.4377));
check('1.047 in at 100 yd is 1 MOA', near(inchesToMoa(1.047, 100), 1));
check('more MOA is more inches', moaToInches(2, 100) > moaToInches(1, 100));
check('farther distance is more inches', moaToInches(1, 300) > moaToInches(1, 100));
check('distance zero throws', (() => { try { moaToInches(1, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
