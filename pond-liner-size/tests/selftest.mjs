import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { linerSide, linerArea } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('10 ft span, 2 ft deep, 1 ft overlap = 16 ft', linerSide(10, 2, 1) === 16);
check('6 ft span, 2 ft deep, 1 ft overlap = 12 ft', linerSide(6, 2, 1) === 12);
check('deeper pond needs bigger liner', linerSide(10, 3, 1) > linerSide(10, 2, 1));
check('more overlap needs bigger liner', linerSide(10, 2, 2) > linerSide(10, 2, 1));
check('bigger span needs bigger liner', linerSide(12, 2, 1) > linerSide(10, 2, 1));
check('10x6 pond liner area = 192 sq ft', linerArea(10, 6, 2, 1) === 192);
check('area equals product of sides', linerArea(10, 6, 2, 1) === linerSide(10, 2, 1) * linerSide(6, 2, 1));
check('zero overlap is allowed', linerSide(10, 2, 0) === 14);
check('zero span throws', (() => { try { linerSide(0, 2, 1); return false; } catch(e){ return true; } })());
check('zero depth throws', (() => { try { linerSide(10, 0, 1); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
