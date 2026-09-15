import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { equivalentLength, remainingAllowance, withinCode } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('20 ft + two 90s = 30 ft', equivalentLength(20, 2, 0) === 30);
check('20 ft straight = 20 ft', equivalentLength(20, 0, 0) === 20);
check('more elbows add length', equivalentLength(20, 3, 0) > equivalentLength(20, 2, 0));
check('two 45s add 5 ft', equivalentLength(20, 0, 2) === 25);
check('remaining of 20+two90 is 5', remainingAllowance(20, 2, 0) === 5);
check('within code when under limit', withinCode(20, 2, 0) === true);
check('over limit is not within code', withinCode(30, 2, 0) === false);
check('default max is 35', remainingAllowance(0, 0, 0) === 35);
check('custom max applies', remainingAllowance(20, 2, 0, 45) === 15);
check('negative straight throws', (() => { try { equivalentLength(-1, 0, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
