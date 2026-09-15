import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { fallFactor, impactForce, severity } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('4 m fall on 8 m rope is factor 0.5', near(fallFactor(4, 8), 0.5));
check('10 m fall on 5 m rope is factor 2', near(fallFactor(10, 5), 2));
check('factor depends on ratio not absolute', near(fallFactor(2, 4), fallFactor(4, 8)));
check('more rope out lowers the factor', fallFactor(4, 16) < fallFactor(4, 8));
check('zero rope out throws', (() => { try { fallFactor(4, 0); return false; } catch(e){ return true; } })());
check('higher factor gives higher force', impactForce(80, 1, 22000) > impactForce(80, 0.5, 22000));
check('heavier climber gives higher force', impactForce(100, 1, 22000) > impactForce(80, 1, 22000));
check('80 kg factor 1 on 22 kN rope is ~6713 N', near(impactForce(80, 1, 22000), 6713.3, 5));
check('factor 2 is extreme, 0.3 is mild', severity(2) === 'extreme' && severity(0.3) === 'mild');
check('zero mass throws', (() => { try { impactForce(0, 1, 22000); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
