import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { seriesImpedance, parallelImpedance } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('two 8Ω in series = 16Ω', near(seriesImpedance([8, 8]), 16));
check('two 8Ω in parallel = 4Ω', near(parallelImpedance([8, 8]), 4));
check('four 8Ω in parallel = 2Ω', near(parallelImpedance([8, 8, 8, 8]), 2));
check('4+8+16 in series = 28Ω', near(seriesImpedance([4, 8, 16]), 28));
check('6Ω and 12Ω parallel = 4Ω', near(parallelImpedance([6, 12]), 4));
check('parallel is below the smallest', parallelImpedance([8, 8]) < 8);
check('series is above the largest', seriesImpedance([4, 8]) > 8);
check('single speaker passes through', seriesImpedance([8]) === 8 && parallelImpedance([8]) === 8);
check('empty list throws', (() => { try { seriesImpedance([]); return false; } catch(e){ return true; } })());
check('non-positive impedance throws', (() => { try { parallelImpedance([8, 0]); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
