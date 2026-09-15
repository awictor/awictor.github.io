import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { residualCO2, primingSugarG, tableSugarG } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('residual CO2 at 70F is about 0.835', near(residualCO2(70), 0.835, 0.01));
check('warmer ferment leaves less residual CO2', residualCO2(75) < residualCO2(65));
check('19 L at 2.5 vol from 70F needs ~126.6 g', near(primingSugarG(19, 2.5, 70), 126.6, 1));
check('more volume needs more sugar', primingSugarG(23, 2.5, 70) > primingSugarG(19, 2.5, 70));
check('higher target needs more sugar', primingSugarG(19, 3.0, 70) > primingSugarG(19, 2.5, 70));
check('warmer ferment needs more sugar', primingSugarG(19, 2.5, 75) > primingSugarG(19, 2.5, 65));
check('typical batch sugar is positive', primingSugarG(19, 2.5, 70) > 0);
check('zero volume needs no sugar', primingSugarG(0, 2.5, 70) === 0);
check('table sugar is 91% of dextrose', near(tableSugarG(100), 91));
check('negative volume throws', (() => { try { primingSugarG(-1, 2.5, 70); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
