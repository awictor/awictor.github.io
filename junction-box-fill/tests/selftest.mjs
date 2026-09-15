import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { conductorVolume, fillVolume, boxIsAdequate, maxConductors } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('14 AWG = 2.0 cu in', near(conductorVolume(14), 2.0));
check('12 AWG = 2.25 cu in', near(conductorVolume(12), 2.25));
check('thicker wire more volume', conductorVolume(10) > conductorVolume(12));
check('5 x 14 AWG = 10 cu in', near(fillVolume(5, 14), 10));
check('6 x 14 AWG = 12 cu in', near(fillVolume(6, 14), 12));
check('18 cu in fits 9 of 14 AWG', maxConductors(18, 14) === 9);
check('18 cu in fits 8 of 12 AWG', maxConductors(18, 12) === 8);
check('9 of 14 AWG adequate in 18 cu in', boxIsAdequate(18, 9, 14) === true);
check('10 of 14 AWG over fill in 18 cu in', boxIsAdequate(18, 10, 14) === false);
check('unknown gauge throws', (() => { try { conductorVolume(20); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
