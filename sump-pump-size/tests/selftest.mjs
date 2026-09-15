import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gallonsPerInch, inflowGpm, recommendedPumpGpm } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-3; }

check('18 in basin ~ 1.1016 gal/in', near(gallonsPerInch(18), 1.10163));
check('24 in basin ~ 1.9584 gal/in', near(gallonsPerInch(24), 1.95845));
check('bigger basin holds more per inch', gallonsPerInch(24) > gallonsPerInch(18));
check('inflow 18 in, 3 in, 1 min ~ 3.305', near(inflowGpm(18, 3, 1), 3.30490));
check('more rise means more inflow', inflowGpm(18, 6, 1) > inflowGpm(18, 3, 1));
check('faster rise means more inflow', inflowGpm(18, 3, 0.5) > inflowGpm(18, 3, 1));
check('default safety factor is 1.5', near(recommendedPumpGpm(10), 15));
check('custom safety factor applies', near(recommendedPumpGpm(10, 2), 20));
check('zero diameter throws', (() => { try { gallonsPerInch(0); return false; } catch(e){ return true; } })());
check('zero time throws', (() => { try { inflowGpm(18, 3, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
