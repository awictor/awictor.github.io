import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { groutVolumePerSqFt, totalGroutVolume, bagsNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('12x12 tile, 1/8 joint, 3/8 depth = 1.125 cu in/sqft', near(groutVolumePerSqFt(12, 12, 0.125, 0.375), 1.125));
check('smaller tiles need more grout', groutVolumePerSqFt(2, 2, 0.125, 0.375) > groutVolumePerSqFt(12, 12, 0.125, 0.375));
check('wider joint needs more grout', groutVolumePerSqFt(12, 12, 0.25, 0.375) > groutVolumePerSqFt(12, 12, 0.125, 0.375));
check('deeper joint needs more grout', groutVolumePerSqFt(12, 12, 0.125, 0.5) > groutVolumePerSqFt(12, 12, 0.125, 0.375));
check('total = area x per-sqft', near(totalGroutVolume(100, 12, 12, 0.125, 0.375), 112.5));
check('bags: 100 cu in / 50 = 2', bagsNeeded(100, 50) === 2);
check('bags round up: 101 / 50 = 3', bagsNeeded(101, 50) === 3);
check('bags ceil-safe: 150 / 50 = 3', bagsNeeded(150, 50) === 3);
check('zero tile size throws', (() => { try { groutVolumePerSqFt(0, 12, 0.125, 0.375); return false; } catch(e){ return true; } })());
check('zero coverage throws', (() => { try { bagsNeeded(100, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
