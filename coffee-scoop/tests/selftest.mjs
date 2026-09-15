import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { waterGrams, gramsForCups, scoops, tablespoons } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('1 cup (6oz) at 1:16 ≈ 11.09 g', near(gramsForCups(1, 6, 16), 6 * 29.5735 / 16));
check('more cups need more coffee', gramsForCups(8, 6, 16) > gramsForCups(4, 6, 16));
check('stronger ratio uses more coffee', gramsForCups(4, 6, 14) > gramsForCups(4, 6, 18));
check('20 g = 2 scoops', near(scoops(20), 2));
check('20 g = 4 tablespoons', near(tablespoons(20), 4));
check('doubling cups doubles coffee', near(gramsForCups(2, 6, 16), 2 * gramsForCups(1, 6, 16)));
check('scoops scale with grams', near(scoops(40), 2 * scoops(20)));
check('water grams 8x6oz ≈ 1419.5', near(waterGrams(8, 6), 8 * 6 * 29.5735));
check('zero cups throws', (() => { try { gramsForCups(0, 6, 16); return false; } catch(e){ return true; } })());
check('zero ratio throws', (() => { try { gramsForCups(8, 6, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
