import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tilePitch, fullTiles, cutWidth, totalTiles } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('12 in tile, 0.125 gap pitch = 12.125', near(tilePitch(12, 0.125), 12.125));
check('120 in run, 12 in tile, no gap = 10 full', fullTiles(120, 12, 0) === 10);
check('125 in run, 12 in tile, no gap = 10 full', fullTiles(125, 12, 0) === 10);
check('exact fit has no cut', near(cutWidth(120, 12, 0), 0));
check('125 run leaves a 5 in cut', near(cutWidth(125, 12, 0), 5));
check('exact fit total = 10 tiles', totalTiles(120, 12, 0) === 10);
check('125 run total = 11 tiles', totalTiles(125, 12, 0) === 11);
check('bigger tile fewer full tiles', fullTiles(120, 24, 0) < fullTiles(120, 12, 0));
check('zero tile throws', (() => { try { tilePitch(0, 0.125); return false; } catch(e){ return true; } })());
check('zero run throws', (() => { try { fullTiles(0, 12, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
