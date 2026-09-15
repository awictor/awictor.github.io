import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { birthstone, altBirthstone, birthFlower, monthName, isValidMonth } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('January is Garnet', birthstone(1) === 'Garnet');
check('April is Diamond', birthstone(4) === 'Diamond');
check('July is Ruby', birthstone(7) === 'Ruby');
check('December is Turquoise', birthstone(12) === 'Turquoise');
check('June has alternate Alexandrite', altBirthstone(6) === 'Alexandrite');
check('January has no alternate', altBirthstone(1) === null);
check('June birth flower is Rose', birthFlower(6) === 'Rose');
check('month 9 name is September', monthName(9) === 'September');
check('month 13 is invalid', isValidMonth(13) === false);
check('month 0 throws', (() => { try { birthstone(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
