import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sheetArea, sheetsNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('4x8 sheet = 32 sq ft', sheetArea(4, 8) === 32);
check('4x12 sheet = 48 sq ft', sheetArea(4, 12) === 48);
check('320 sqft / 32 no waste = 10 sheets', sheetsNeeded(320, 32, 1.0) === 10);
check('320 sqft / 32 with 10% = 11 sheets', sheetsNeeded(320, 32, 1.1) === 11);
check('100 sqft / 32 with 10% rounds to 4', sheetsNeeded(100, 32, 1.1) === 4);
check('bigger area needs more sheets', sheetsNeeded(640, 32, 1.0) > sheetsNeeded(320, 32, 1.0));
check('bigger sheet needs fewer', sheetsNeeded(320, 48, 1.0) < sheetsNeeded(320, 32, 1.0));
check('exact division is ceil-safe', sheetsNeeded(320, 32, 1.0) === 10);
check('zero width throws', (() => { try { sheetArea(0, 8); return false; } catch(e){ return true; } })());
check('zero sheet area throws', (() => { try { sheetsNeeded(320, 0, 1.1); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
