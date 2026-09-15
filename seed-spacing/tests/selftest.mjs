import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { plantsAlong, totalPlants, plantsPerSquareFoot } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('48 in at 6 in spacing = 8', plantsAlong(48, 6) === 8);
check('48 in at 12 in spacing = 4', plantsAlong(48, 12) === 4);
check('50 in at 6 in floors to 8', plantsAlong(50, 6) === 8);
check('96x48 at 12 in = 32 plants', totalPlants(96, 48, 12) === 32);
check('48x24 at 6 in = 32 plants', totalPlants(48, 24, 6) === 32);
check('tighter spacing fits more', totalPlants(48, 48, 6) > totalPlants(48, 48, 12));
check('bigger bed fits more', totalPlants(96, 96, 12) > totalPlants(48, 48, 12));
check('6 in spacing = 4 per sq ft', near(plantsPerSquareFoot(6), 4));
check('12 in spacing = 1 per sq ft', near(plantsPerSquareFoot(12), 1));
check('zero spacing throws', (() => { try { plantsAlong(48, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
