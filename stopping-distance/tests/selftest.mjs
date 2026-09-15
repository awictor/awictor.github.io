import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { thinkingDistanceFt, brakingDistanceFt, stoppingDistanceFt } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('60 mph, 1.5 s thinking is ~132 ft', near(thinkingDistanceFt(60, 1.5), 132.0, 0.5));
check('thinking distance is linear in speed', near(thinkingDistanceFt(60, 1.5), 2 * thinkingDistanceFt(30, 1.5)));
check('zero reaction gives zero thinking', thinkingDistanceFt(60, 0) === 0);
check('braking grows with the square of speed', near(brakingDistanceFt(60, 0.7), 4 * brakingDistanceFt(30, 0.7), 1e-6));
check('30 mph dry braking is ~43 ft', near(brakingDistanceFt(30, 0.7), 42.97, 0.5));
check('lower grip gives longer braking', brakingDistanceFt(60, 0.4) > brakingDistanceFt(60, 0.7));
check('stopping is thinking plus braking', near(stoppingDistanceFt(60, 1.5, 0.7), thinkingDistanceFt(60, 1.5) + brakingDistanceFt(60, 0.7)));
check('faster speed gives longer total', stoppingDistanceFt(70, 1.5, 0.7) > stoppingDistanceFt(50, 1.5, 0.7));
check('zero grip throws', (() => { try { brakingDistanceFt(60, 0); return false; } catch(e){ return true; } })());
check('negative speed throws', (() => { try { thinkingDistanceFt(-5, 1.5); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
