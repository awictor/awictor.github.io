import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pitchFactor, designArea, recommendGutter } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('low pitch 2/12 factor = 1.0', pitchFactor(2, 12) === 1.0);
check('medium pitch 7/12 factor = 1.1', pitchFactor(7, 12) === 1.1);
check('steep pitch 12/12 factor = 1.3', pitchFactor(12, 12) === 1.3);
check('1000 sqft flat at 1 in/hr = 1000', near(designArea(1000, 1.0, 1), 1000));
check('design area scales with intensity', near(designArea(1000, 1, 2), 2000));
check('small area needs 5 inch', recommendGutter(3000) === '5 inch');
check('mid area needs 6 inch', recommendGutter(6000) === '6 inch');
check('large area needs extra downspouts', recommendGutter(9000) === '6 inch + extra downspouts');
check('zero footprint throws', (() => { try { designArea(0, 1, 1); return false; } catch(e){ return true; } })());
check('zero run throws', (() => { try { pitchFactor(6, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
