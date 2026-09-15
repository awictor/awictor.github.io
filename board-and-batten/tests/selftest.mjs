import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { battenCount, actualSpacing, battenLinearFt } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('120 in at 16 in target = 9 battens', battenCount(120, 16) === 9);
check('96 in at 16 in target = 7 battens', battenCount(96, 16) === 7);
check('tighter target means more battens', battenCount(120, 12) > battenCount(120, 16));
check('wider wall means more battens', battenCount(240, 16) > battenCount(120, 16));
check('9 battens, 8 ft = 72 linear ft', battenLinearFt(9, 8) === 72);
check('9 battens, 10 ft = 90 linear ft', battenLinearFt(9, 10) === 90);
check('120 in over 9 battens = 15 in spacing', near(actualSpacing(120, 9), 15));
check('more battens means tighter spacing', actualSpacing(120, 13) < actualSpacing(120, 9));
check('zero spacing throws', (() => { try { battenCount(120, 0); return false; } catch(e){ return true; } })());
check('one batten spacing throws', (() => { try { actualSpacing(120, 1); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
