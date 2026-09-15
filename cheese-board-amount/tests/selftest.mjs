import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cheeseOz, charcuterieOz, cheeseVarieties } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('10 guests appetizer = 20 oz cheese', cheeseOz(10, 'appetizer') === 20);
check('10 guests main = 50 oz cheese', cheeseOz(10, 'main') === 50);
check('main needs more than appetizer', cheeseOz(10, 'main') > cheeseOz(10, 'appetizer'));
check('more guests need more cheese', cheeseOz(20, 'appetizer') > cheeseOz(10, 'appetizer'));
check('10 guests appetizer = 20 oz meats', charcuterieOz(10, 'appetizer') === 20);
check('10 guests main = 30 oz meats', charcuterieOz(10, 'main') === 30);
check('small party gets 3 varieties', cheeseVarieties(10) === 3);
check('30 guests gets 6 varieties', cheeseVarieties(30) === 6);
check('varieties capped at 7', cheeseVarieties(100) === 7);
check('unknown role throws', (() => { try { cheeseOz(10, 'dessert'); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
