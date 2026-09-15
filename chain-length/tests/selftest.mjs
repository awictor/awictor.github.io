import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { chainLengthInches, chainLinks } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('16.5 in, 50/28 = 53.5 in', near(chainLengthInches(16.5, 50, 28), 53.5));
check('16 in, 36/28 = 49 in', near(chainLengthInches(16, 36, 28), 49));
check('bigger chainring lengthens chain', chainLengthInches(16.5, 53, 28) > chainLengthInches(16.5, 50, 28));
check('bigger cog lengthens chain', chainLengthInches(16.5, 50, 32) > chainLengthInches(16.5, 50, 28));
check('longer chainstay lengthens chain', chainLengthInches(17, 50, 28) > chainLengthInches(16.5, 50, 28));
check('53.5 in rounds up to 108 links', chainLinks(16.5, 50, 28) === 108);
check('49 in gives 98 links', chainLinks(16, 36, 28) === 98);
check('links are always even', chainLinks(16.5, 50, 28) % 2 === 0 && chainLinks(15.75, 48, 25) % 2 === 0);
check('zero chainstay throws', (() => { try { chainLengthInches(0, 50, 28); return false; } catch(e){ return true; } })());
check('zero cog throws', (() => { try { chainLinks(16.5, 50, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
