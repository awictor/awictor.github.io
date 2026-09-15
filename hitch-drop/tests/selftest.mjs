import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hitchDrop, mountType, dropInches } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('22 recv, 18 coupler = 4 drop', hitchDrop(22, 18) === 4);
check('18 recv, 22 coupler = -4', hitchDrop(18, 22) === -4);
check('equal heights = 0', hitchDrop(20, 20) === 0);
check('higher receiver needs a drop', mountType(22, 18) === 'drop');
check('lower receiver needs a rise', mountType(18, 22) === 'rise');
check('equal heights are level', mountType(20, 20) === 'level');
check('rise magnitude is 4 in', dropInches(18, 22) === 4);
check('drop magnitude is 4 in', dropInches(22, 18) === 4);
check('zero receiver throws', (() => { try { hitchDrop(0, 18); return false; } catch(e){ return true; } })());
check('zero coupler throws', (() => { try { hitchDrop(22, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
