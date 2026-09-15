import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { baseCoolingBTU, sunFactor, occupantExtra, kitchenExtra, btuToTons, totalCoolingBTU } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('500 sq ft base = 10000 BTU', baseCoolingBTU(500) === 10000);
check('sunny factor = 1.1', sunFactor('sunny') === 1.1);
check('shaded factor = 0.9', sunFactor('shaded') === 0.9);
check('average factor = 1.0', sunFactor('normal') === 1.0);
check('two occupants add nothing', occupantExtra(2) === 0);
check('five occupants add 1800 BTU', occupantExtra(5) === 1800);
check('kitchen adds 4000 BTU', kitchenExtra(true) === 4000 && kitchenExtra(false) === 0);
check('24000 BTU = 2 tons', near(btuToTons(24000), 2));
check('composite: 500 sunny, 4 people, kitchen = 16200', near(totalCoolingBTU(500, 'sunny', 4, true), 16200));
check('zero area throws', (() => { try { baseCoolingBTU(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
