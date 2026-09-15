import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ingredientGrams, totalPercent, waterGrams } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('40% of 1000 g is 400 g', near(ingredientGrams(40, 1000), 400));
check('30% of 1000 g is 300 g', near(ingredientGrams(30, 1000), 300));
check('percent scales with batch', near(ingredientGrams(40, 2000), 800));
check('a standard recipe totals 100', totalPercent([40, 30, 20, 10]) === 100);
check('ingredient grams sum to batch at 100%', near([40, 30, 20, 10].reduce((s, p) => s + ingredientGrams(p, 1000), 0), 1000));
check('higher percent gives more grams', ingredientGrams(50, 1000) > ingredientGrams(20, 1000));
check('water is percent of dry weight', near(waterGrams(1000, 80), 800));
check('zero batch yields zero grams', ingredientGrams(40, 0) === 0);
check('negative percent throws', (() => { try { ingredientGrams(-5, 1000); return false; } catch(e){ return true; } })());
check('colorant recipe can exceed 100', totalPercent([40, 30, 20, 10, 5]) === 105);

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
