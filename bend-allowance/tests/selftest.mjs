import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { bendAllowance, outsideSetback, bendDeduction, flatLength } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-4); }

check('90 deg BA for 0.06/0.06/0.44 is ~0.1357', near(bendAllowance(0.06, 0.06, 90, 0.44), 0.13572));
check('90 deg setback is radius+thickness', near(outsideSetback(0.06, 0.06, 90), 0.12));
check('bend deduction is ~0.1043', near(bendDeduction(0.06, 0.06, 90, 0.44), 0.10428));
check('flat length subtracts deduction', near(flatLength(2, 0.06, 0.06, 90, 0.44), 1.89572));
check('bigger angle gives bigger allowance', bendAllowance(0.06, 0.06, 120, 0.44) > bendAllowance(0.06, 0.06, 90, 0.44));
check('bigger radius gives bigger allowance', bendAllowance(0.06, 0.12, 90, 0.44) > bendAllowance(0.06, 0.06, 90, 0.44));
check('higher K gives bigger allowance', bendAllowance(0.06, 0.06, 90, 0.5) > bendAllowance(0.06, 0.06, 90, 0.33));
check('flat length equals flange minus deduction', near(flatLength(3, 0.06, 0.06, 90, 0.44), 3 - bendDeduction(0.06, 0.06, 90, 0.44)));
check('zero thickness throws', (() => { try { bendAllowance(0, 0.06, 90, 0.44); return false; } catch(e){ return true; } })());
check('zero angle throws', (() => { try { bendAllowance(0.06, 0.06, 0, 0.44); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
