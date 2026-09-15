import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { shapeFactor, heatingTimeMin, formatTime } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('25 mm slab is about 60 min', near(heatingTimeMin(25, 'slab'), 60));
check('doubling thickness quadruples time', near(heatingTimeMin(50, 'slab'), 4 * heatingTimeMin(25, 'slab')));
check('sphere heats faster than slab', heatingTimeMin(25, 'sphere') < heatingTimeMin(25, 'slab'));
check('cylinder is between slab and sphere', heatingTimeMin(25, 'cylinder') < heatingTimeMin(25, 'slab') && heatingTimeMin(25, 'cylinder') > heatingTimeMin(25, 'sphere'));
check('slab factor is 1', shapeFactor('slab') === 1.0);
check('sphere factor is 0.5', shapeFactor('sphere') === 0.5);
check('thicker takes longer', heatingTimeMin(40, 'slab') > heatingTimeMin(20, 'slab'));
check('90 min formats as 1 h 30 min', formatTime(90) === '1 h 30 min');
check('45 min formats as 45 min', formatTime(45) === '45 min');
check('zero thickness throws', (() => { try { heatingTimeMin(0, 'slab'); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
