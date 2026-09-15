import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { totalDrinks, beerCount, wineBottles, spiritsBottles } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('10 guests, 3 hr = 40 drinks', totalDrinks(10, 3) === 40);
check('1 guest, 1 hr = 2 drinks', totalDrinks(1, 1) === 2);
check('more guests means more drinks', totalDrinks(20, 3) > totalDrinks(10, 3));
check('more hours means more drinks', totalDrinks(10, 5) > totalDrinks(10, 3));
check('all-wine 40 drinks = 8 bottles', wineBottles(40, 1.0) === 8);
check('half-beer 40 drinks = 20 beers', beerCount(40, 0.5) === 20);
check('all-liquor 40 drinks = 3 bottles', spiritsBottles(40, 1.0) === 3);
check('wine ceil-safe: 50 drinks half wine = 5 bottles', wineBottles(50, 0.5) === 5);
check('zero guests throws', (() => { try { totalDrinks(0, 4); return false; } catch(e){ return true; } })());
check('zero hours throws', (() => { try { totalDrinks(20, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
