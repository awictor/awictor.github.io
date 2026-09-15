import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { coopArea, runArea, nestBoxes } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('6 hens = 24 sq ft coop', coopArea(6) === 24);
check('6 hens = 60 sq ft run', runArea(6) === 60);
check('more hens more coop', coopArea(10) > coopArea(6));
check('run bigger than coop', runArea(6) > coopArea(6));
check('4 hens = 1 nest box', nestBoxes(4) === 1);
check('8 hens = 2 nest boxes', nestBoxes(8) === 2);
check('9 hens = 3 nest boxes', nestBoxes(9) === 3);
check('one hen still gets a box', nestBoxes(1) === 1);
check('more hens more run', runArea(10) > runArea(6));
check('zero hens throws', (() => { try { coopArea(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
