import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dli, ppfdForDli, cropSuitability } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('400 PPFD for 16 h is 23.04 DLI', near(dli(400, 16), 23.04));
check('500 PPFD for 12 h is 21.6 DLI', near(dli(500, 12), 21.6));
check('more hours gives more DLI', dli(400, 18) > dli(400, 12));
check('more PPFD gives more DLI', dli(600, 16) > dli(400, 16));
check('PPFD for 30 DLI over 16 h is ~521', near(ppfdForDli(30, 16), 520.833, 1e-2));
check('round trip PPFD to DLI', near(dli(ppfdForDli(30, 16), 16), 30, 1e-6));
check('23 DLI suits fruiting crops', cropSuitability(23) === 'fruiting crops');
check('2 DLI is too low', cropSuitability(2) === 'too low for most crops');
check('hours over 24 throws', (() => { try { dli(400, 25); return false; } catch(e){ return true; } })());
check('negative PPFD throws', (() => { try { dli(-1, 16); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
