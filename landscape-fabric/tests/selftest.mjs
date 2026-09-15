import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { effectiveWidth, stripsNeeded, fabricLengthFt, rollsNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('3 ft roll, 0.25 overlap = 2.75 effective', near(effectiveWidth(3, 0.25), 2.75));
check('10 ft bed, 3 ft roll, 0.25 overlap = 4 strips', stripsNeeded(10, 3, 0.25) === 4);
check('wider roll fewer strips', stripsNeeded(10, 4, 0.25) < stripsNeeded(10, 3, 0.25));
check('more overlap more strips', stripsNeeded(10, 3, 1) > stripsNeeded(10, 3, 0.25));
check('20 ft bed, 4 strips = 80 ft', near(fabricLengthFt(20, 4), 80));
check('80 ft over 50 ft rolls = 2', rollsNeeded(80, 50) === 2);
check('100 ft over 50 ft rolls = 2', rollsNeeded(100, 50) === 2);
check('longer bed more fabric', fabricLengthFt(40, 4) > fabricLengthFt(20, 4));
check('overlap at or above roll width throws', (() => { try { effectiveWidth(3, 3); return false; } catch(e){ return true; } })());
check('zero bed width throws', (() => { try { stripsNeeded(0, 3, 0.25); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
