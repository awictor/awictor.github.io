import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { addDays, startDate, weeksBetween } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('tomatoes 6 wk before May 15 = Apr 3', startDate('2026-05-15', 6) === '2026-04-03');
check('0 weeks is the frost date itself', startDate('2026-05-15', 0) === '2026-05-15');
check('more weeks means earlier date', Date.parse(startDate('2026-05-15', 8)) < Date.parse(startDate('2026-05-15', 6)));
check('add 10 days', addDays('2026-01-01', 10) === '2026-01-11');
check('add across month end', addDays('2026-01-31', 1) === '2026-02-01');
check('subtract across month start', addDays('2026-03-01', -1) === '2026-02-28');
check('6 weeks between Apr 3 and May 15', weeksBetween('2026-04-03', '2026-05-15') === 6);
check('start then measure round-trips', weeksBetween(startDate('2026-05-15', 6), '2026-05-15') === 6);
check('invalid date throws', (() => { try { addDays('not-a-date', 5); return false; } catch(e){ return true; } })());
check('negative weeks throws', (() => { try { startDate('2026-05-15', -2); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
