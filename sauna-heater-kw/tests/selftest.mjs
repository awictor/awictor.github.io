import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { roomVolume, heaterKw, heaterKwForRoom } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('6x5x7 room = 210 cu ft', roomVolume(6, 5, 7) === 210);
check('8x6x7 room = 336 cu ft', roomVolume(8, 6, 7) === 336);
check('bigger room is more volume', roomVolume(8, 6, 7) > roomVolume(6, 5, 7));
check('210 cu ft, no glass = 4.2 kW', near(heaterKw(210, 0), 4.2));
check('500 cu ft, no glass = 10 kW', near(heaterKw(500, 0), 10));
check('exposed glass raises kW', heaterKw(210, 10) > heaterKw(210, 0));
check('210 cu ft + 10 sqft glass = 13.2 kW', near(heaterKw(210, 10), 13.2));
check('room helper matches heaterKw', near(heaterKwForRoom(6, 5, 7, 0), heaterKw(210, 0)));
check('zero dimension throws', (() => { try { roomVolume(0, 5, 7); return false; } catch(e){ return true; } })());
check('negative exposed area throws', (() => { try { heaterKw(210, -1); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
