import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { backingDimension, panelsNeeded, backingYards } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('60 in top with 4 in overhang is 68 in backing', backingDimension(60, 4) === 68);
check('zero overhang leaves dimension unchanged', backingDimension(80, 0) === 80);
check('68 in backing needs 2 panels of 42 in fabric', panelsNeeded(68, 42) === 2);
check('40 in backing fits in one 42 in panel', panelsNeeded(40, 42) === 1);
check('panels always round up', panelsNeeded(85, 42) === 3);
check('60x80 quilt, 4 in, 42 in fabric is ~4.89 yd', near(backingYards(60, 80, 4, 42), 4.8889, 1e-3));
check('extra-wide 108 in fabric needs one panel', panelsNeeded(68, 108) === 1);
check('wide backing uses less yardage', backingYards(60, 80, 4, 108) < backingYards(60, 80, 4, 42));
check('bigger overhang means more fabric', backingYards(60, 80, 8, 42) > backingYards(60, 80, 4, 42));
check('zero fabric width throws', (() => { try { panelsNeeded(68, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
