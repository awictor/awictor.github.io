import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { balloonVolumeCuFt, balloonVolumeLiters, balloonsPerTank, tanksNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-3; }

check('11 in balloon ≈ 0.403 cu ft', near(balloonVolumeCuFt(11), 0.4033));
check('bigger balloon has more volume', balloonVolumeCuFt(12) > balloonVolumeCuFt(11));
check('11 in balloon ≈ 11.42 liters', near(balloonVolumeLiters(11), 11.42));
check('8.9 cu ft tank fills 22 of 11 in', balloonsPerTank(8.9, 11) === 22);
check('50 balloons need 3 tanks', tanksNeeded(50, 8.9, 11) === 3);
check('exactly one tank at capacity', tanksNeeded(22, 8.9, 11) === 1);
check('one over rolls to a second tank', tanksNeeded(23, 8.9, 11) === 2);
check('more balloons never need fewer tanks', tanksNeeded(100, 8.9, 11) >= tanksNeeded(50, 8.9, 11));
check('zero diameter throws', (() => { try { balloonVolumeCuFt(0); return false; } catch(e){ return true; } })());
check('zero count throws', (() => { try { tanksNeeded(0, 8.9, 11); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
