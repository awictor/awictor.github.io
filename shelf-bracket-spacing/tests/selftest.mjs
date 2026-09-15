import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { bracketsNeeded, bracketSpacing, spacingForShelf } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('48 in shelf, 24 in span = 3 brackets', bracketsNeeded(48, 24) === 3);
check('50 in shelf, 24 in span = 4 brackets', bracketsNeeded(50, 24) === 4);
check('longer shelf more brackets', bracketsNeeded(96, 24) > bracketsNeeded(48, 24));
check('smaller span more brackets', bracketsNeeded(48, 16) > bracketsNeeded(48, 24));
check('48 in over 3 brackets = 24 in spacing', near(bracketSpacing(48, 3), 24));
check('48 in over 4 brackets = 16 in spacing', near(bracketSpacing(48, 4), 16));
check('more brackets closer spacing', bracketSpacing(48, 4) < bracketSpacing(48, 3));
check('spacingForShelf matches composition', near(spacingForShelf(48, 24), 24));
check('under 2 brackets throws', (() => { try { bracketSpacing(48, 1); return false; } catch(e){ return true; } })());
check('zero span throws', (() => { try { bracketsNeeded(48, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
