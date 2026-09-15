import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { freeAreaSqIn, grossGrilleSqIn } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('400 CFM at 400 fpm = 144 sq in', near(freeAreaSqIn(400, 400), 144));
check('800 CFM at 400 fpm = 288 sq in', near(freeAreaSqIn(800, 400), 288));
check('more airflow needs more area', freeAreaSqIn(800, 400) > freeAreaSqIn(400, 400));
check('higher velocity needs less area', freeAreaSqIn(400, 500) < freeAreaSqIn(400, 400));
check('gross at 75% = 192 sq in', near(grossGrilleSqIn(400, 400, 0.75), 192));
check('lower free area needs bigger grille', grossGrilleSqIn(400, 400, 0.6) > grossGrilleSqIn(400, 400, 0.75));
check('800 CFM gross at 75% = 384 sq in', near(grossGrilleSqIn(800, 400, 0.75), 384));
check('gross exceeds net free area', grossGrilleSqIn(400, 400, 0.75) > freeAreaSqIn(400, 400));
check('zero airflow throws', (() => { try { freeAreaSqIn(0, 400); return false; } catch(e){ return true; } })());
check('zero velocity throws', (() => { try { freeAreaSqIn(400, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
