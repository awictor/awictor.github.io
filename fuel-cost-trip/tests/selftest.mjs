import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gallonsNeeded, tripCost, costPerMile, costPerPerson } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('300 mi at 30 mpg = 10 gallons', near(gallonsNeeded(300, 30), 10));
check('300 mi, 30 mpg, $4 = $40', near(tripCost(300, 30, 4), 40));
check('30 mpg at $4 = $0.1333/mi', near(costPerMile(30, 4), 4 / 30));
check('$40 split 4 ways = $10', near(costPerPerson(40, 4), 10));
check('worse MPG costs more', tripCost(300, 20, 4) > tripCost(300, 30, 4));
check('higher price costs more', tripCost(300, 30, 5) > tripCost(300, 30, 4));
check('longer trip costs more', tripCost(600, 30, 4) > tripCost(300, 30, 4));
check('zero MPG throws', (() => { try { gallonsNeeded(300, 0); return false; } catch(e){ return true; } })());
check('zero distance throws', (() => { try { tripCost(0, 30, 4); return false; } catch(e){ return true; } })());
check('zero people throws', (() => { try { costPerPerson(40, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
