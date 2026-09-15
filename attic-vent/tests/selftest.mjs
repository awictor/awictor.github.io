import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { requiredNfaSqFt, requiredNfaSqIn, intakeSqIn, exhaustSqIn } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('1500 sqft at 1/150 = 10 sq ft NFA', near(requiredNfaSqFt(1500, 150), 10));
check('1500 sqft at 1/300 = 5 sq ft NFA', near(requiredNfaSqFt(1500, 300), 5));
check('1500 sqft at 1/150 = 1440 sq in', near(requiredNfaSqIn(1500, 150), 1440));
check('1/300 needs less than 1/150', requiredNfaSqFt(1500, 300) < requiredNfaSqFt(1500, 150));
check('bigger attic needs more', requiredNfaSqFt(3000, 150) > requiredNfaSqFt(1500, 150));
check('intake is half the total', near(intakeSqIn(1440), 720));
check('exhaust is half the total', near(exhaustSqIn(1440), 720));
check('intake + exhaust = total', near(intakeSqIn(1440) + exhaustSqIn(1440), 1440));
check('zero area throws', (() => { try { requiredNfaSqFt(0, 150); return false; } catch(e){ return true; } })());
check('zero ratio throws', (() => { try { requiredNfaSqFt(1500, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
