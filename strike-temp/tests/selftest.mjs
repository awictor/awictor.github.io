import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { strikeTemp, tempRise } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('152 target, 70 grain, 1.5 qt/lb is ~162.9 F', near(strikeTemp(152, 70, 1.5), 162.933, 1e-2));
check('thicker mash needs a higher strike temp', strikeTemp(152, 70, 1.0) > strikeTemp(152, 70, 2.0));
check('colder grain needs a higher strike temp', strikeTemp(152, 60, 1.5) > strikeTemp(152, 70, 1.5));
check('grain at target means strike equals target', near(strikeTemp(152, 152, 1.5), 152));
check('rise is positive when grain is cooler', tempRise(152, 70, 1.5) > 0);
check('2.0 qt/lb rise is about 8.2 F', near(tempRise(152, 70, 2.0), 8.2));
check('higher target gives higher strike', strikeTemp(158, 70, 1.5) > strikeTemp(152, 70, 1.5));
check('150 target, 1.25 ratio is ~162.8 F', near(strikeTemp(150, 70, 1.25), 162.8, 1e-2));
check('thinner mash gives smaller rise', tempRise(152, 70, 3.0) < tempRise(152, 70, 1.0));
check('zero ratio throws', (() => { try { strikeTemp(152, 70, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
