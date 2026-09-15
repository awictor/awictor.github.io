import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { concentrateNeeded, waterNeeded, ratioConcentrateToWater } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('12 qt at 50% = 6 qt concentrate', near(concentrateNeeded(12, 50), 6));
check('12 qt at 50% = 6 qt water', near(waterNeeded(12, 50), 6));
check('concentrate + water = capacity', near(concentrateNeeded(12, 50) + waterNeeded(12, 50), 12));
check('12 qt at 60% = 7.2 qt concentrate', near(concentrateNeeded(12, 60), 7.2));
check('higher target more concentrate', concentrateNeeded(12, 60) > concentrateNeeded(12, 50));
check('50% ratio is 1:1', near(ratioConcentrateToWater(50), 1));
check('60% ratio is 1.5:1', near(ratioConcentrateToWater(60), 1.5));
check('4 qt at 40% = 2.4 qt water', near(waterNeeded(4, 40), 2.4));
check('target over 100 throws', (() => { try { concentrateNeeded(12, 120); return false; } catch(e){ return true; } })());
check('zero capacity throws', (() => { try { concentrateNeeded(0, 50); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
