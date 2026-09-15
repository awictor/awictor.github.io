import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { saltToAddLbs, bagsNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('10k gal, 0 to 1000 ppm = 83.4 lb', near(saltToAddLbs(10000, 0, 1000), 83.4));
check('same 1000 ppm gap from a base = 83.4 lb', near(saltToAddLbs(10000, 2000, 3000), 83.4));
check('already at target adds nothing', saltToAddLbs(10000, 3200, 3200) === 0);
check('above target adds nothing', saltToAddLbs(10000, 3400, 3200) === 0);
check('bigger pool needs more salt', saltToAddLbs(20000, 0, 1000) > saltToAddLbs(10000, 0, 1000));
check('83.4 lb needs 3 bags', bagsNeeded(83.4, 40) === 3);
check('80 lb needs 2 bags', bagsNeeded(80, 40) === 2);
check('120 lb is exactly 3 bags (ceil-safe)', bagsNeeded(120, 40) === 3);
check('zero gallons throws', (() => { try { saltToAddLbs(0, 0, 1000); return false; } catch(e){ return true; } })());
check('zero bag size throws', (() => { try { bagsNeeded(83.4, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
