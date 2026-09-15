import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { totalCoatArea, gallonsNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('400 sqft, 1 coat, 200 cov = 2 gal', gallonsNeeded(400, 1, 200) === 2);
check('400 sqft, 2 coats, 200 cov = 4 gal', gallonsNeeded(400, 2, 200) === 4);
check('500 sqft, 1 coat, 200 cov rounds to 3', gallonsNeeded(500, 1, 200) === 3);
check('300 sqft, 1 coat, 300 cov = 1 gal', gallonsNeeded(300, 1, 300) === 1);
check('more coats need more gallons', gallonsNeeded(400, 3, 200) > gallonsNeeded(400, 2, 200));
check('higher coverage needs fewer gallons', gallonsNeeded(600, 1, 300) < gallonsNeeded(600, 1, 200));
check('bigger deck needs more gallons', gallonsNeeded(800, 1, 200) > gallonsNeeded(400, 1, 200));
check('total coat area = area x coats', totalCoatArea(400, 2) === 800);
check('zero area throws', (() => { try { totalCoatArea(0, 2); return false; } catch(e){ return true; } })());
check('zero coverage throws', (() => { try { gallonsNeeded(400, 1, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
