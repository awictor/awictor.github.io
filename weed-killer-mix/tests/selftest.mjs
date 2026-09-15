import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { concentrateOz, gallonsForArea, tanksNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('2 gal tank at 2.5 oz/gal = 5 oz', near(concentrateOz(2, 2.5), 5));
check('4 gal tank at 2.5 oz/gal = 10 oz', near(concentrateOz(4, 2.5), 10));
check('bigger tank more concentrate', concentrateOz(4, 2.5) > concentrateOz(2, 2.5));
check('higher rate more concentrate', concentrateOz(2, 5) > concentrateOz(2, 2.5));
check('1000 sqft at 500/gal = 2 gal', near(gallonsForArea(1000, 500), 2));
check('1500 sqft at 500/gal = 3 gal', near(gallonsForArea(1500, 500), 3));
check('1000 sqft, 500 cov, 2 gal tank = 1 tank', tanksNeeded(1000, 500, 2) === 1);
check('2000 sqft, 500 cov, 2 gal tank = 2 tanks', tanksNeeded(2000, 500, 2) === 2);
check('zero tank throws', (() => { try { concentrateOz(0, 2.5); return false; } catch(e){ return true; } })());
check('zero coverage throws', (() => { try { gallonsForArea(1000, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
