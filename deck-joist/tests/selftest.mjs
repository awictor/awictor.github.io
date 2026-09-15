import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { maxSpanInches, maxSpanFeet, isSpanOk } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('2x8 at 16 OC = 157 in', maxSpanInches('2x8', 16) === 157);
check('2x6 at 24 OC = 104 in', maxSpanInches('2x6', 24) === 104);
check('2x10 at 12 OC = 216 in', maxSpanInches('2x10', 12) === 216);
check('bigger joist spans farther', maxSpanInches('2x10', 16) > maxSpanInches('2x8', 16));
check('tighter spacing spans farther', maxSpanInches('2x8', 12) > maxSpanInches('2x8', 16));
check('2x8 at 16 OC ≈ 13.08 ft', near(maxSpanFeet('2x8', 16), 157 / 12));
check('10 ft span on 2x8/16 passes', isSpanOk('2x8', 16, 10) === true);
check('14 ft span on 2x8/16 fails', isSpanOk('2x8', 16, 14) === false);
check('unknown size throws', (() => { try { maxSpanInches('2x4', 16); return false; } catch(e){ return true; } })());
check('unknown spacing throws', (() => { try { maxSpanInches('2x8', 20); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
