import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sweatLoss, sweatRate, mlPerHour } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-9); }

check('lost 1 kg + drank 0.5 L is 1.5 L sweat', near(sweatLoss(70, 69, 0.5), 1.5));
check('1.5 L over 1 hr is 1.5 L/hr', near(sweatRate(70, 69, 0.5, 1), 1.5));
check('no fluid case is 1.0 L/hr', near(sweatRate(70, 69, 0, 1), 1.0));
check('drinking more reveals higher sweat rate', sweatRate(70, 69, 1, 1) > sweatRate(70, 69, 0.5, 1));
check('longer duration lowers the rate', sweatRate(70, 68, 0, 2) < sweatRate(70, 68, 0, 1));
check('bigger weight loss is higher rate', sweatRate(70, 67, 0, 1) > sweatRate(70, 69, 0, 1));
check('no loss and no fluid is zero', sweatRate(70, 70, 0, 1) === 0);
check('1.5 L/hr is 1500 ml/hr', mlPerHour(1.5) === 1500);
check('zero duration throws', (() => { try { sweatRate(70, 69, 0.5, 0); return false; } catch(e){ return true; } })());
check('negative fluid throws', (() => { try { sweatLoss(70, 69, -1); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
