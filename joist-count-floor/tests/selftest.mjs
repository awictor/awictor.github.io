import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { joistCount, joistSpacingActual, blockingRows } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('144 in run, 16 OC = 10 joists', joistCount(144, 16) === 10);
check('192 in run, 16 OC = 13 joists', joistCount(192, 16) === 13);
check('tighter spacing more joists', joistCount(144, 12) > joistCount(144, 16));
check('longer run more joists', joistCount(288, 16) > joistCount(144, 16));
check('144 in over 10 joists = 16 in spacing', near(joistSpacingActual(144, 10), 16));
check('more joists tighter spacing', joistSpacingActual(144, 13) < joistSpacingActual(144, 10));
check('16 ft span = 2 blocking rows', blockingRows(16) === 2);
check('6 ft span = 0 blocking rows', blockingRows(6) === 0);
check('zero spacing throws', (() => { try { joistCount(144, 0); return false; } catch(e){ return true; } })());
check('under 2 joists throws', (() => { try { joistSpacingActual(144, 1); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
