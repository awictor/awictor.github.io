import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { coursesNeeded, blocksPerCourse, totalBlocks } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('24 in wall, 6 in block = 4 courses', coursesNeeded(24, 6) === 4);
check('30 in wall, 6 in block = 5 courses', coursesNeeded(30, 6) === 5);
check('taller wall more courses', coursesNeeded(36, 6) > coursesNeeded(24, 6));
check('120 in wall, 12 in block = 10 per course', blocksPerCourse(120, 12) === 10);
check('125 in wall, 12 in block = 11 per course', blocksPerCourse(125, 12) === 11);
check('longer wall more per course', blocksPerCourse(240, 12) > blocksPerCourse(120, 12));
check('120x24 wall, 12x6 block = 40 blocks', totalBlocks(120, 24, 12, 6) === 40);
check('bigger wall more total blocks', totalBlocks(240, 36, 12, 6) > totalBlocks(120, 24, 12, 6));
check('zero block height throws', (() => { try { coursesNeeded(24, 0); return false; } catch(e){ return true; } })());
check('zero wall length throws', (() => { try { blocksPerCourse(0, 12); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
