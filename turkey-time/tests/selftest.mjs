import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { roastMinutes, roastTimeHours, thawDaysFridge, servingsFor } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('12 lb unstuffed = 156 min', roastMinutes(12, false) === 156);
check('12 lb stuffed = 180 min', roastMinutes(12, true) === 180);
check('stuffed cooks longer than unstuffed', roastMinutes(14, true) > roastMinutes(14, false));
check('12 lb unstuffed = 2.6 hours', near(roastTimeHours(12, false), 2.6));
check('bigger bird cooks longer', roastMinutes(20, false) > roastMinutes(12, false));
check('16 lb thaws in 4 days', near(thawDaysFridge(16), 4));
check('20 lb thaws in 5 days', near(thawDaysFridge(20), 5));
check('15 lb serves 15 people', servingsFor(15) === 15);
check('zero weight throws (roast)', (() => { try { roastMinutes(0, false); return false; } catch(e){ return true; } })());
check('zero weight throws (thaw)', (() => { try { thawDaysFridge(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
