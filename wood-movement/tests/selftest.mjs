import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { movementCoefficient, woodMovement } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-9); }

check('red oak flatsawn coefficient is 0.00369', near(movementCoefficient('redOak', 'flatsawn'), 0.00369));
check('10 in red oak flatsawn over 6% is 0.2214 in', near(woodMovement(10, 'redOak', 'flatsawn', 6), 0.2214, 1e-6));
check('quartersawn moves less than flatsawn', woodMovement(10, 'redOak', 'quartersawn', 6) < woodMovement(10, 'redOak', 'flatsawn', 6));
check('wider board moves more', woodMovement(12, 'redOak', 'flatsawn', 6) > woodMovement(6, 'redOak', 'flatsawn', 6));
check('bigger MC change moves more', woodMovement(10, 'redOak', 'flatsawn', 10) > woodMovement(10, 'redOak', 'flatsawn', 4));
check('pine moves less than red oak', woodMovement(10, 'pine', 'flatsawn', 6) < woodMovement(10, 'redOak', 'flatsawn', 6));
check('zero width means no movement', woodMovement(0, 'cherry', 'flatsawn', 6) === 0);
check('zero MC change means no movement', woodMovement(10, 'cherry', 'flatsawn', 0) === 0);
check('unknown species throws', (() => { try { movementCoefficient('balsa', 'flatsawn'); return false; } catch(e){ return true; } })());
check('unknown grain throws', (() => { try { movementCoefficient('redOak', 'riftsawn'); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
