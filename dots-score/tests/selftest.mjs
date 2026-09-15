import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dotsCoefficient, dotsScore, dotsLevel } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('90 kg male coefficient is about 0.6466', near(dotsCoefficient(90, 'male'), 0.6466, 0.01));
check('60 kg male coefficient is about 0.844', near(dotsCoefficient(60, 'male'), 0.844, 0.01));
check('600 total at 90 kg male is about 388 DOTS', near(dotsScore(600, 90, 'male'), 388, 2));
check('DOTS scales linearly with total', near(dotsScore(1200, 90, 'male'), 2 * dotsScore(600, 90, 'male')));
check('lighter male gets higher coefficient', dotsCoefficient(60, 'male') > dotsCoefficient(140, 'male'));
check('female coefficient differs from male', dotsCoefficient(70, 'female') !== dotsCoefficient(70, 'male'));
check('a strong total scores positive', dotsScore(600, 90, 'male') > 0);
check('450 is strong and 550 is elite', dotsLevel(450) === 'strong' && dotsLevel(550) === 'elite');
check('unknown sex throws', (() => { try { dotsCoefficient(90, 'other'); return false; } catch(e){ return true; } })());
check('zero bodyweight throws', (() => { try { dotsCoefficient(0, 'male'); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
