import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cylinderGallons, maxSafeOilDepth, safeOilGallons } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('12 in x 6 in ~ 2.9376 gal', near(cylinderGallons(12, 6), Math.PI * 36 * 6 / 231));
check('12 in x 3 in ~ 1.4688 gal', near(cylinderGallons(12, 3), Math.PI * 36 * 3 / 231));
check('deeper oil is more gallons', cylinderGallons(12, 6) > cylinderGallons(12, 3));
check('wider pot is more gallons', cylinderGallons(14, 6) > cylinderGallons(12, 6));
check('15 in pot, 4 in headspace = 11 in', maxSafeOilDepth(15, 4) === 11);
check('more headspace, less depth', maxSafeOilDepth(15, 6) === 9);
check('safe oil matches cylinder at safe depth', near(safeOilGallons(12, 15, 4), cylinderGallons(12, 11)));
check('taller pot allows more safe oil', safeOilGallons(12, 18, 4) > safeOilGallons(12, 15, 4));
check('headspace above height throws', (() => { try { maxSafeOilDepth(15, 15); return false; } catch(e){ return true; } })());
check('zero diameter throws', (() => { try { cylinderGallons(0, 6); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
