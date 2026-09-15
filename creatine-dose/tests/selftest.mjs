import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { loadingDose, maintenanceDose, perServing } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-9); }

check('80 kg loading is 24 g/day', near(loadingDose(80), 24));
check('80 kg maintenance is 2.4 g/day', near(maintenanceDose(80), 2.4));
check('loading is far more than maintenance', loadingDose(80) > maintenanceDose(80));
check('heavier person loads more', loadingDose(100) > loadingDose(80));
check('24 g over 4 servings is 6 g', near(perServing(24, 4), 6));
check('more servings means less per serving', perServing(24, 6) < perServing(24, 4));
check('70 kg loading is 21 g', near(loadingDose(70), 21));
check('100 kg maintenance is 3 g', near(maintenanceDose(100), 3));
check('zero weight throws', (() => { try { loadingDose(0); return false; } catch(e){ return true; } })());
check('zero servings throws', (() => { try { perServing(24, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
