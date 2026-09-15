import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { carbonationPsi } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('38F at 2.5 vol is about 11.2 PSI', near(carbonationPsi(38, 2.5), 11.25, 0.2));
check('more volumes needs more pressure', carbonationPsi(38, 3.0) > carbonationPsi(38, 2.5));
check('fewer volumes needs less pressure', carbonationPsi(38, 2.0) < carbonationPsi(38, 2.5));
check('warmer beer needs more pressure', carbonationPsi(45, 2.5) > carbonationPsi(38, 2.5));
check('colder beer needs less pressure', carbonationPsi(33, 2.5) < carbonationPsi(38, 2.5));
check('result is a finite number', Number.isFinite(carbonationPsi(40, 2.4)));
check('typical lager pressure is positive', carbonationPsi(38, 2.5) > 0);
check('monotonic in temperature', carbonationPsi(50, 2.5) > carbonationPsi(40, 2.5));
check('zero volumes throws', (() => { try { carbonationPsi(38, 0); return false; } catch(e){ return true; } })());
check('NaN temperature throws', (() => { try { carbonationPsi(NaN, 2.5); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
