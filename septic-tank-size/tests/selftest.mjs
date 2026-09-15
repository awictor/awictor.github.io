import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { recommendedGallons, dailyFlowGpd } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('3 bedrooms = 1000 gal', recommendedGallons(3) === 1000);
check('2 bedrooms = 1000 gal', recommendedGallons(2) === 1000);
check('4 bedrooms = 1250 gal', recommendedGallons(4) === 1250);
check('5 bedrooms = 1500 gal', recommendedGallons(5) === 1500);
check('6 bedrooms = 1750 gal', recommendedGallons(6) === 1750);
check('more bedrooms need more capacity', recommendedGallons(5) > recommendedGallons(3));
check('3 bedrooms = 450 gal/day', dailyFlowGpd(3) === 450);
check('4 bedrooms = 600 gal/day', dailyFlowGpd(4) === 600);
check('zero bedrooms throws', (() => { try { recommendedGallons(0); return false; } catch(e){ return true; } })());
check('non-integer bedrooms throws', (() => { try { recommendedGallons(3.5); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
