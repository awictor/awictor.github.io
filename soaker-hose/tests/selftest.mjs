import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gallonsForDepth, runTimeMinutes, runTimeForBed } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('100 sqft, 1 in = 62.3 gal', near(gallonsForDepth(100, 1), 62.3));
check('100 sqft, 0.5 in = 31.15 gal', near(gallonsForDepth(100, 0.5), 31.15));
check('62.3 gal at 0.5 gpm = 124.6 min', near(runTimeMinutes(62.3, 0.5), 124.6));
check('more area needs more water', gallonsForDepth(200, 1) > gallonsForDepth(100, 1));
check('deeper needs more water', gallonsForDepth(100, 2) > gallonsForDepth(100, 1));
check('higher flow means less time', runTimeForBed(100, 1, 1) < runTimeForBed(100, 1, 0.5));
check('100 sqft, 1 in, 0.5 gpm = 124.6 min', near(runTimeForBed(100, 1, 0.5), 124.6));
check('200 sqft, 1 in = 124.6 gal', near(gallonsForDepth(200, 1), 124.6));
check('zero area throws', (() => { try { gallonsForDepth(0, 1); return false; } catch(e){ return true; } })());
check('zero flow rate throws', (() => { try { runTimeMinutes(62.3, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
