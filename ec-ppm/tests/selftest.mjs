import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ecToPpm, ppmToEc } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('EC 1.5 is 750 ppm on 500 scale', near(ecToPpm(1.5, 500), 750));
check('EC 1.5 is 1050 ppm on 700 scale', near(ecToPpm(1.5, 700), 1050));
check('700 scale reads higher than 500', ecToPpm(1.5, 700) > ecToPpm(1.5, 500));
check('750 ppm on 500 scale is EC 1.5', near(ppmToEc(750, 500), 1.5));
check('1050 ppm on 700 scale is EC 1.5', near(ppmToEc(1050, 700), 1.5));
check('round trip EC to PPM to EC', near(ppmToEc(ecToPpm(2.2, 500), 500), 2.2));
check('higher EC is more ppm', ecToPpm(2, 500) > ecToPpm(1, 500));
check('zero EC is zero ppm', ecToPpm(0, 500) === 0);
check('negative EC throws', (() => { try { ecToPpm(-1, 500); return false; } catch(e){ return true; } })());
check('zero scale throws', (() => { try { ppmToEc(750, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
