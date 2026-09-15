import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { stops, exposureMultiplier, newExposureSeconds, formatExposure } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('ND1000 is 10 stops', stops('ND1000') === 10);
check('ND64 is 6 stops', stops('ND64') === 6);
check('10 stops multiply by 1024', exposureMultiplier(10) === 1024);
check('1 s base at 10 stops = 1024 s', near(newExposureSeconds(1, 10), 1024));
check('2 s base at 3 stops = 16 s', near(newExposureSeconds(2, 3), 16));
check('more stops means longer exposure', newExposureSeconds(1, 10) > newExposureSeconds(1, 6));
check('sub-second formats as fraction', formatExposure(1 / 125) === '1/125 s');
check('8 seconds formats plainly', formatExposure(8) === '8 s');
check('125 seconds formats as minutes', formatExposure(125) === '2 min 5 s');
check('unknown ND filter throws', (() => { try { stops('ND3'); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
