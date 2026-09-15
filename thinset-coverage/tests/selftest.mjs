import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { coveragePerBag, areaWithWaste, bagsNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('1/2 square notch covers 45 sq ft', coveragePerBag('1/2 x 1/2 square') === 45);
check('1/4 square notch covers 95 sq ft', coveragePerBag('1/4 x 1/4 square') === 95);
check('bigger notch covers less', coveragePerBag('3/4 x 3/4 square') < coveragePerBag('3/16 V-notch'));
check('10% waste on 100 sq ft = 110', near(areaWithWaste(100, 10), 110));
check('zero waste leaves area unchanged', near(areaWithWaste(80, 0), 80));
check('90 sq ft, no waste, 1/4 notch = 1 bag', bagsNeeded(90, '1/4 x 1/4 square', 0) === 1);
check('100 sq ft, no waste, 1/4 notch = 2 bags', bagsNeeded(100, '1/4 x 1/4 square', 0) === 2);
check('waste can push into another bag', bagsNeeded(90, '1/4 x 1/4 square', 20) === 2);
check('bigger notch needs more bags', bagsNeeded(120, '1/2 x 1/2 square', 0) > bagsNeeded(120, '1/4 x 1/4 square', 0));
check('unknown trowel throws', (() => { try { coveragePerBag('1/8 notch'); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
