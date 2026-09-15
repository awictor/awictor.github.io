import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { garageVolume, heaterBtu, heaterBtuForRoom } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('20x20x8 = 3200 cu ft', garageVolume(20, 20, 8) === 3200);
check('24x24x9 = 5184 cu ft', garageVolume(24, 24, 9) === 5184);
check('bigger garage more volume', garageVolume(24, 24, 9) > garageVolume(20, 20, 8));
check('3200 cu ft, 50F, avg = 21280 BTU', near(heaterBtu(3200, 50, 0.133), 21280));
check('better insulation needs less BTU', heaterBtu(3200, 50, 0.1) < heaterBtu(3200, 50, 0.133));
check('bigger rise needs more BTU', heaterBtu(3200, 60, 0.133) > heaterBtu(3200, 50, 0.133));
check('poor insulation needs more BTU', heaterBtu(3200, 50, 0.2) > heaterBtu(3200, 50, 0.133));
check('room helper matches heaterBtu', near(heaterBtuForRoom(20, 20, 8, 50, 0.133), heaterBtu(3200, 50, 0.133)));
check('default factor is 0.133', near(heaterBtu(3200, 50), heaterBtu(3200, 50, 0.133)));
check('zero volume throws', (() => { try { heaterBtu(0, 50, 0.133); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
