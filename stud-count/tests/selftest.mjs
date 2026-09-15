import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { studCount, plateLinearFt } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('10 ft at 16 OC = 9 studs', studCount(10, 16) === 9);
check('8 ft at 16 OC = 7 studs', studCount(8, 16) === 7);
check('10 ft at 24 OC = 6 studs', studCount(10, 24) === 6);
check('16 ft at 16 OC = 13 studs', studCount(16, 16) === 13);
check('tighter spacing means more studs', studCount(10, 16) > studCount(10, 24));
check('longer wall means more studs', studCount(20, 16) > studCount(10, 16));
check('10 ft, 3 plates = 30 linear ft', plateLinearFt(10, 3) === 30);
check('10 ft, 2 plates = 20 linear ft', plateLinearFt(10, 2) === 20);
check('zero length throws', (() => { try { studCount(0, 16); return false; } catch(e){ return true; } })());
check('zero plates throws', (() => { try { plateLinearFt(10, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
