import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gramsOfAlcohol, usStandardDrinks, ukUnits } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. Grams of alcohol from volume and ABV.
check('grams', near(gramsOfAlcohol(355, 5), 355 * 0.05 * 0.789));
// 2. A 12 oz 5% beer is about one US standard drink.
check('beer one drink', Math.abs(usStandardDrinks(355, 5) - 1) < 0.05);
// 3. A 5 oz 12% wine is about one US standard drink.
check('wine one drink', Math.abs(usStandardDrinks(148, 12) - 1) < 0.05);
// 4. A UK pint at 5% is ~2.84 units.
check('uk pint', near(ukUnits(568, 5), 568 * 0.05 / 10));
// 5. Higher ABV means more alcohol.
check('higher abv', gramsOfAlcohol(355, 8) > gramsOfAlcohol(355, 5));
// 6. More volume means more alcohol.
check('more volume', gramsOfAlcohol(500, 5) > gramsOfAlcohol(355, 5));
// 7. Zero ABV is zero alcohol.
check('zero abv', gramsOfAlcohol(355, 0) === 0);
// 8. UK units and grams are consistent (10 ml ethanol = 7.89 g).
check('units consistent', near(ukUnits(568, 5), gramsOfAlcohol(568, 5) / 7.89));
// 9. Negative volume is rejected.
let v = false; try { gramsOfAlcohol(-355, 5); } catch (e) { v = true; }
check('volume guard', v);
// 10. ABV over 100% is rejected.
let a = false; try { gramsOfAlcohol(355, 120); } catch (e) { a = true; }
check('abv guard', a);

console.log(passed + ' checks passed.');
