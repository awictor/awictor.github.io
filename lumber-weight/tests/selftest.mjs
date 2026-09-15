import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { boardCubicFeet, boardFeet, boardWeight } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('12x12x1ft = 1 cubic foot', near(boardCubicFeet(12, 12, 1), 1));
check('6x6x1ft = 0.25 cubic foot', near(boardCubicFeet(6, 6, 1), 0.25));
check('1x12x1ft = 1 board foot', near(boardFeet(1, 12, 1), 1));
check('2x6x1ft = 1 board foot', near(boardFeet(2, 6, 1), 1));
check('1 cu ft at 36 lb/ft3 = 36 lb', near(boardWeight(12, 12, 1, 36, 1), 36));
check('quantity multiplies weight', near(boardWeight(12, 12, 1, 36, 2), 72));
check('denser species weighs more', boardWeight(2, 6, 8, 44, 1) > boardWeight(2, 6, 8, 32, 1));
check('longer board weighs more', boardWeight(2, 6, 12, 36, 1) > boardWeight(2, 6, 8, 36, 1));
check('zero thickness throws', (() => { try { boardCubicFeet(0, 6, 8); return false; } catch(e){ return true; } })());
check('zero density throws', (() => { try { boardWeight(2, 6, 8, 0, 1); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
