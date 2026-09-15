import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { brewRatio, yieldForRatio, doseForYield, classifyShot } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('18 g in, 36 g out = 1:2', near(brewRatio(18, 36), 2));
check('18 g at 1:2 = 36 g out', near(yieldForRatio(18, 2), 36));
check('36 g out at 1:2 = 18 g dose', near(doseForYield(36, 2), 18));
check('ratio 1.5 is ristretto', classifyShot(1.5) === 'ristretto');
check('ratio 2 is normale', classifyShot(2) === 'normale');
check('ratio 3.5 is lungo', classifyShot(3.5) === 'lungo');
check('more yield means bigger ratio', brewRatio(18, 40) > brewRatio(18, 36));
check('yield/dose round trip', near(brewRatio(18, yieldForRatio(18, 2.5)), 2.5));
check('zero dose throws', (() => { try { brewRatio(0, 36); return false; } catch(e){ return true; } })());
check('zero ratio throws', (() => { try { doseForYield(36, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
