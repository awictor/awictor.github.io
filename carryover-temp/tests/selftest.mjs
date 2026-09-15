import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pullTemp, finalTemp } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('135 target with 8 rise pulls at 127', pullTemp(135, 8) === 127);
check('135 target with 12 rise pulls at 123', pullTemp(135, 12) === 123);
check('zero carryover pulls at target', pullTemp(135, 0) === 135);
check('more carryover means pull earlier', pullTemp(135, 12) < pullTemp(135, 8));
check('pull plus rise reaches target', finalTemp(pullTemp(135, 8), 8) === 135);
check('higher target pulls higher', pullTemp(160, 8) > pullTemp(135, 8));
check('final temp adds carryover to pull', finalTemp(127, 8) === 135);
check('thin steak (5) pulls at 130', pullTemp(135, 5) === 130);
check('negative carryover throws', (() => { try { pullTemp(135, -5); return false; } catch(e){ return true; } })());
check('final negative carryover throws', (() => { try { finalTemp(127, -1); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
