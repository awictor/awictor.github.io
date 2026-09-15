import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { rateFor, rennetDose, mlToDrops } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('8 L single-strength needs 2 ml', near(rennetDose(8, 'liquidSingle', 100), 2));
check('8 L double-strength needs 1 ml', near(rennetDose(8, 'liquidDouble', 100), 1));
check('double is half the single dose', rennetDose(8, 'liquidDouble', 100) === rennetDose(8, 'liquidSingle', 100) / 2);
check('8 L tablet is ~0.42 tablet', near(rennetDose(8, 'tablet', 100), 8 / 19, 1e-9));
check('more milk needs more rennet', rennetDose(16, 'liquidSingle', 100) > rennetDose(8, 'liquidSingle', 100));
check('200% strength doubles the dose', near(rennetDose(8, 'liquidSingle', 200), 4));
check('2 ml is 40 drops', mlToDrops(2) === 40);
check('single-strength rate is 0.25 ml/L', rateFor('liquidSingle') === 0.25);
check('unknown rennet type throws', (() => { try { rateFor('powder'); return false; } catch(e){ return true; } })());
check('zero strength throws', (() => { try { rennetDose(8, 'liquidSingle', 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
