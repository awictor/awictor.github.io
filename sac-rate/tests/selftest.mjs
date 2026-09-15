import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ata, sacRate, rmv, durationAtDepth } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('33 ft is 2 ATA', near(ata(33), 2));
check('surface is 1 ATA', near(ata(0), 1));
check('99 ft is 4 ATA', near(ata(99), 4));
check('600 psi in 10 min at 33 ft is 30 psi/min SAC', near(sacRate(600, 10, 33), 30));
check('deeper dive gives lower surface SAC for same use', sacRate(600, 10, 66) < sacRate(600, 10, 33));
check('RMV of 30 psi/min on 80/3000 tank is 0.8 cu ft/min', near(rmv(30, 80, 3000), 0.8));
check('2000 psi at 30 SAC at 33 ft lasts ~33 min', near(durationAtDepth(2000, 30, 33), 33.333, 1e-2));
check('deeper reduces duration', durationAtDepth(2000, 30, 99) < durationAtDepth(2000, 30, 33));
check('higher SAC reduces duration', durationAtDepth(2000, 40, 33) < durationAtDepth(2000, 30, 33));
check('zero time SAC throws', (() => { try { sacRate(600, 0, 33); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
