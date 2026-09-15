import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sheetArea, sheetsForArea, wallSheets } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('4x8 sheet = 32 sq ft', sheetArea(4, 8) === 32);
check('320 sqft, 32 sheet, no waste = 10', sheetsForArea(320, 32, 0) === 10);
check('320 sqft with 10% waste = 11', sheetsForArea(320, 32, 10) === 11);
check('bigger area more sheets', sheetsForArea(640, 32, 0) > sheetsForArea(320, 32, 0));
check('bigger sheet fewer sheets', sheetsForArea(320, 48, 0) < sheetsForArea(320, 32, 0));
check('wallSheets matches composition', wallSheets(40, 8, 0) === sheetsForArea(320, 32, 0));
check('default waste is 10 percent', sheetsForArea(320, 32) === sheetsForArea(320, 32, 10));
check('more waste more sheets', sheetsForArea(320, 32, 30) > sheetsForArea(320, 32, 10));
check('zero area throws', (() => { try { sheetsForArea(0, 32, 0); return false; } catch(e){ return true; } })());
check('zero sheet size throws', (() => { try { sheetsForArea(320, 0, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
