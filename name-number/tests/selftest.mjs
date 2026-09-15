import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { letterValue, nameTotal, reduceNumber, expressionNumber } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('A is 1', letterValue('A') === 1);
check('J wraps back to 1', letterValue('J') === 1);
check('Z is 8', letterValue('Z') === 8);
check('a space is 0', letterValue(' ') === 0);
check('abc totals 6', nameTotal('abc') === 6);
check('spaces are ignored', nameTotal('a b c') === nameTotal('abc'));
check('29 reduces to master 11', reduceNumber(29) === 11);
check('abc expression number is 6', expressionNumber('abc') === 6);
check('Ada expression number is 6', expressionNumber('Ada') === 6);
check('a name with no letters throws', (() => { try { expressionNumber('123 !!'); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
