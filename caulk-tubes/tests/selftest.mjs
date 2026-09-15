import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { coveragePerTube, tubesNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('1/4 in bead covers 24 ft', near(coveragePerTube(0.25), 24));
check('1/8 in bead covers 96 ft', near(coveragePerTube(0.125), 96));
check('1/2 in bead covers 6 ft', near(coveragePerTube(0.5), 6));
check('bigger bead covers less', coveragePerTube(0.5) < coveragePerTube(0.25));
check('48 ft at 1/4 in = 2 tubes', tubesNeeded(48, 0.25) === 2);
check('50 ft at 1/4 in rounds to 3 tubes', tubesNeeded(50, 0.25) === 3);
check('96 ft at 1/8 in = 1 tube', tubesNeeded(96, 0.125) === 1);
check('more joint needs more tubes', tubesNeeded(96, 0.25) > tubesNeeded(48, 0.25));
check('zero bead throws', (() => { try { coveragePerTube(0); return false; } catch(e){ return true; } })());
check('zero length throws', (() => { try { tubesNeeded(0, 0.25); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
