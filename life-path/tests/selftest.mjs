import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { digitSum, reduceNumber, lifePath, isMasterNumber } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('digit sum of 1990 is 19', digitSum(1990) === 19);
check('30 reduces to 3', reduceNumber(30) === 3);
check('1990-07-04 is life path 3', lifePath(1990, 7, 4) === 3);
check('master number 11 is preserved', reduceNumber(11) === 11);
check('29 reduces to master 11', reduceNumber(29) === 11);
check('48 reduces to 3', reduceNumber(48) === 3);
check('22 is a master number', isMasterNumber(22) === true);
check('7 is not a master number', isMasterNumber(7) === false);
check('2000-01-01 is life path 4', lifePath(2000, 1, 1) === 4);
check('invalid month throws', (() => { try { lifePath(1990, 13, 4); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
