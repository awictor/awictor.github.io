import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ampsFromWatts, recommendedGauge } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('1200 W at 120 V = 10 A', near(ampsFromWatts(1200, 120), 10));
check('10 A at 25 ft = 16 AWG', recommendedGauge(10, 25) === 16);
check('10 A at 100 ft = 12 AWG', recommendedGauge(10, 100) === 12);
check('13 A at 50 ft = 12 AWG', recommendedGauge(13, 50) === 12);
check('16 A at 100 ft = 8 AWG', recommendedGauge(16, 100) === 8);
check('longer run needs thicker (lower AWG)', recommendedGauge(10, 100) < recommendedGauge(10, 25));
check('more amps needs thicker', recommendedGauge(16, 25) < recommendedGauge(10, 25));
check('10 A at 150 ft = 10 AWG', recommendedGauge(10, 150) === 10);
check('over 16 A throws', (() => { try { recommendedGauge(20, 25); return false; } catch(e){ return true; } })());
check('over 150 ft throws', (() => { try { recommendedGauge(10, 200); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
