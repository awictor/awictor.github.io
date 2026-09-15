import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ouncesInKeg, servings, costPerServing } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 0.01) => Math.abs(a - b) < t;

// 1. A half barrel is 1984 ounces.
check('half barrel oz', ouncesInKeg(15.5) === 1984);
// 2. That's 124 pints (16 oz).
check('pints', servings(15.5, 16) === 124);
// 3. And 165 twelve-ounce pours (floored).
check('twelve oz', servings(15.5, 12) === 165);
// 4. A smaller pour yields more servings.
check('smaller more', servings(15.5, 12) > servings(15.5, 16));
// 5. Cost per pour.
check('cost', near(costPerServing(160, 124), 160 / 124));
// 6. A Cornelius (5 gal) gives 40 pints.
check('corny', servings(5, 16) === 40);
// 7. A bigger keg gives more servings.
check('bigger more', servings(15.5, 16) > servings(7.75, 16));
// 8. One gallon is 128 ounces.
check('gallon', ouncesInKeg(1) === 128);
// 9. A zero pour size is rejected.
let p = false; try { servings(15.5, 0); } catch (e) { p = true; }
check('pour guard', p);
// 10. Negative gallons rejected.
let g = false; try { ouncesInKeg(-1); } catch (e) { g = true; }
check('gallons guard', g);

console.log(passed + ' checks passed.');
