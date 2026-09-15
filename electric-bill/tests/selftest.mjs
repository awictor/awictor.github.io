import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dailyKwh, dailyCost, monthlyCost, annualCost } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('1000 W for 1 h = 1 kWh', near(dailyKwh(1000, 1), 1));
check('100 W for 10 h = 1 kWh', near(dailyKwh(100, 10), 1));
check('1 kWh/day at $0.15 = $0.15/day', near(dailyCost(1000, 1, 0.15), 0.15));
check('monthly = 30 days', near(monthlyCost(1000, 1, 0.15), 4.5));
check('annual = 365 days', near(annualCost(1000, 1, 0.15), 54.75));
check('more watts costs more', dailyCost(2000, 1, 0.15) > dailyCost(1000, 1, 0.15));
check('more hours costs more', dailyCost(1000, 2, 0.15) > dailyCost(1000, 1, 0.15));
check('higher rate costs more', dailyCost(1000, 1, 0.20) > dailyCost(1000, 1, 0.15));
check('zero watts throws', (() => { try { dailyKwh(0, 1); return false; } catch(e){ return true; } })());
check('zero rate throws', (() => { try { dailyCost(1000, 1, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
