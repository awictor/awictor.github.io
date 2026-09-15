import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { waterBathAdjustment, waterBathTime, weightedGaugePsi, dialGaugePsi } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('sea level adds no water-bath time', waterBathAdjustment(500) === 0);
check('2000 ft adds 5 min', waterBathAdjustment(2000) === 5);
check('5000 ft adds 10 min', waterBathAdjustment(5000) === 10);
check('9000 ft adds 20 min', waterBathAdjustment(9000) === 20);
check('20 min base at 2000 ft = 25 min', waterBathTime(20, 2000) === 25);
check('weighted gauge 10 lb near sea level', weightedGaugePsi(500) === 10);
check('weighted gauge 15 lb above 1000 ft', weightedGaugePsi(2000) === 15);
check('dial gauge 11 lb at 1000 ft', dialGaugePsi(1000) === 11);
check('dial gauge 13 lb at 5000 ft', dialGaugePsi(5000) === 13);
check('zero base time throws', (() => { try { waterBathTime(0, 2000); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
