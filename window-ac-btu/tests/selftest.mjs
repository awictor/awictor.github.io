import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { baseBtu, adjustBtu, recommendBtu } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('300 sqft = 6000 BTU base', baseBtu(300) === 6000);
check('500 sqft = 10000 BTU base', baseBtu(500) === 10000);
check('bigger room more base BTU', baseBtu(500) > baseBtu(300));
check('sunny adds 10 percent', near(adjustBtu(6000, true, false, 2, false), 6600));
check('shaded subtracts 10 percent', near(adjustBtu(6000, false, true, 2, false), 5400));
check('extra people add 600 each', adjustBtu(6000, false, false, 4, false) === 7200);
check('kitchen adds 4000', adjustBtu(6000, false, false, 2, true) === 10000);
check('two or fewer people no add', adjustBtu(6000, false, false, 2, false) === 6000);
check('recommend matches composition', near(recommendBtu(300, false, false, 2, false), 6000));
check('zero area throws', (() => { try { baseBtu(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
