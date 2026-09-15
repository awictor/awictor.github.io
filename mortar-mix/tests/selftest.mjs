import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { mortarBagsForBlock, mortarBagsForBrick, sandTons } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('100 block = 3 bags', mortarBagsForBlock(100) === 3);
check('200 block = 6 bags', mortarBagsForBlock(200) === 6);
check('150 block rounds up to 5 bags', mortarBagsForBlock(150) === 5);
check('1000 brick = 7 bags', mortarBagsForBrick(1000) === 7);
check('500 brick rounds up to 4 bags', mortarBagsForBrick(500) === 4);
check('8 bags = 1 ton sand', near(sandTons(8), 1));
check('16 bags = 2 tons sand', near(sandTons(16), 2));
check('more block needs more bags', mortarBagsForBlock(200) > mortarBagsForBlock(100));
check('zero block throws', (() => { try { mortarBagsForBlock(0); return false; } catch(e){ return true; } })());
check('zero brick throws', (() => { try { mortarBagsForBrick(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
