import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { flowGpm, dailyUsage, annualUsage, meetsStandard } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('1 gal in 30 s = 2 GPM', near(flowGpm(1, 30), 2));
check('2 gal in 60 s = 2 GPM', near(flowGpm(2, 60), 2));
check('1 gal in 60 s = 1 GPM', near(flowGpm(1, 60), 1));
check('faster fill means higher GPM', flowGpm(1, 20) > flowGpm(1, 30));
check('2 GPM x 10 min = 20 gal/day', near(dailyUsage(2, 10), 20));
check('2 GPM x 10 min = 7300 gal/year', near(annualUsage(2, 10), 7300));
check('2.0 GPM meets 2.2 limit', meetsStandard(2.0, 2.2) === true);
check('2.5 GPM fails 2.2 limit', meetsStandard(2.5, 2.2) === false);
check('zero seconds throws', (() => { try { flowGpm(1, 0); return false; } catch(e){ return true; } })());
check('zero gpm in daily throws', (() => { try { dailyUsage(0, 10); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
