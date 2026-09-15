import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { outputPerSqFt, totalOutput, maxComfortOutput } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('85F floor, 68F room = 34 per sqft', outputPerSqFt(85, 68) === 34);
check('80F floor, 68F room = 24 per sqft', outputPerSqFt(80, 68) === 24);
check('warmer floor gives more output', outputPerSqFt(85, 68) > outputPerSqFt(80, 68));
check('300 sqft at 85/68 = 10200 BTU', totalOutput(300, 85, 68) === 10200);
check('bigger area gives more output', totalOutput(600, 85, 68) > totalOutput(300, 85, 68));
check('cooler room widens delta', outputPerSqFt(85, 60) > outputPerSqFt(85, 68));
check('max comfort at 85F cap matches total', maxComfortOutput(300, 68) === totalOutput(300, 85, 68));
check('warmer room lowers max output', maxComfortOutput(300, 75) < maxComfortOutput(300, 68));
check('floor at room temp throws', (() => { try { outputPerSqFt(68, 68); return false; } catch(e){ return true; } })());
check('zero area throws', (() => { try { totalOutput(0, 85, 68); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
