import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { round5, inchesToCm, polePlantCm, alpinePole, trekkingPole } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('180 cm gives a 125 cm ski pole', alpinePole(180) === 125);
check('180 cm gives a 120 cm trekking pole', trekkingPole(180) === 120);
check('taller means longer ski pole', alpinePole(190) > alpinePole(180));
check('ski pole longer than trekking at same height', alpinePole(180) > trekkingPole(180));
check('round5 rounds 122 down to 120', round5(122) === 120);
check('round5 rounds 123 up to 125', round5(123) === 125);
check('trekking factor is 0.68', near(polePlantCm(180, 0.68), 122.4));
check('70 inches is 177.8 cm', near(inchesToCm(70), 177.8));
check('shorter person gets shorter pole', trekkingPole(160) < trekkingPole(180));
check('zero height throws', (() => { try { alpinePole(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
