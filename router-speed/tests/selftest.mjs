import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { maxRpmForDiameter, rimSpeedFpm, rimSpeedMph } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('half-inch bit maxes at 24000', maxRpmForDiameter(0.5) === 24000);
check('1.5-inch bit maxes at 18000', maxRpmForDiameter(1.5) === 18000);
check('3-inch bit maxes at 12000', maxRpmForDiameter(3) === 12000);
check('4-inch bit maxes at 10000', maxRpmForDiameter(4) === 10000);
check('bigger bit never spins faster', maxRpmForDiameter(3) <= maxRpmForDiameter(1));
check('1-inch boundary is 24000', maxRpmForDiameter(1) === 24000);
check('2.5-inch boundary is 16000', maxRpmForDiameter(2.5) === 16000);
check('2-inch bit at 18000 rim speed ~9425 fpm', near(rimSpeedFpm(2, 18000), 9424.778, 1e-2));
check('rim speed in mph tracks fpm', near(rimSpeedMph(2, 18000), 9424.778 * 60 / 5280, 1e-2));
check('zero diameter throws', (() => { try { maxRpmForDiameter(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
