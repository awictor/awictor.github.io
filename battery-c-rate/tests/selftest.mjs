import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { currentFromCRate, cRateFromCurrent, runtimeHours, runtimeFromCurrent, formatRuntime } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('2 Ah at 1C draws 2 A', near(currentFromCRate(2, 1), 2));
check('5 Ah at 2C draws 10 A', near(currentFromCRate(5, 2), 10));
check('3 Ah at 0.5C draws 1.5 A', near(currentFromCRate(3, 0.5), 1.5));
check('2 Ah drawing 4 A is 2C', near(cRateFromCurrent(2, 4), 2));
check('5 Ah drawing 5 A is 1C', near(cRateFromCurrent(5, 5), 1));
check('1C runs for 1 hour', near(runtimeHours(1), 1));
check('2C runs for half an hour', near(runtimeHours(2), 0.5));
check('runtime from current matches capacity/current', near(runtimeFromCurrent(2, 4), 0.5));
check('30 min formats as minutes', formatRuntime(0.5) === '30 min');
check('zero capacity C-rate throws', (() => { try { cRateFromCurrent(0, 4); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
