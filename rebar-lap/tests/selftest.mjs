import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { barDiameter, lapLength } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('#4 bar = 0.5 in diameter', near(barDiameter(4), 0.5));
check('#8 bar = 1.0 in diameter', near(barDiameter(8), 1.0));
check('#6 bar = 0.75 in diameter', near(barDiameter(6), 0.75));
check('#4 at 40x = 20 in lap', near(lapLength(4, 40), 20));
check('#8 at 48x = 48 in lap', near(lapLength(8, 48), 48));
check('bigger bar, longer lap', lapLength(8, 40) > lapLength(4, 40));
check('higher factor, longer lap', lapLength(4, 48) > lapLength(4, 40));
check('12-inch minimum floor', lapLength(3, 20) === 12);
check('zero bar size throws', (() => { try { barDiameter(0); return false; } catch(e){ return true; } })());
check('zero factor throws', (() => { try { lapLength(4, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
