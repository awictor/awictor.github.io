import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ingredientWeight, hydrationPercent, totalDoughWeight } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 70% hydration on 1000 g flour = 700 g water.
check('water', ingredientWeight(1000, 70) === 700);
// 2. 2% salt on 1000 g flour = 20 g.
check('salt', ingredientWeight(1000, 2) === 20);
// 3. 700 g water on 1000 g flour is 70% hydration.
check('hydration', hydrationPercent(700, 1000) === 70);
// 4. ingredientWeight and hydrationPercent invert each other.
check('roundtrip', near(hydrationPercent(ingredientWeight(1000, 70), 1000), 70));
// 5. Higher hydration means more water.
check('more hydration', ingredientWeight(1000, 75) > ingredientWeight(1000, 70));
// 6. Total dough = flour x (1 + total%/100): 1000 at 72% extras = 1720.
check('total', totalDoughWeight(1000, 72) === 1720);
// 7. With no extras the dough is just the flour.
check('total zero', totalDoughWeight(1000, 0) === 1000);
// 8. A non-positive flour weight is rejected.
let a = false; try { ingredientWeight(0, 70); } catch (e) { a = true; }
check('flour guard', a);
// 9. Hydration rejects a non-positive flour weight.
let b = false; try { hydrationPercent(700, 0); } catch (e) { b = true; }
check('hydration guard', b);
// 10. A negative percent is rejected.
let c = false; try { ingredientWeight(1000, -5); } catch (e) { c = true; }
check('percent guard', c);

console.log(passed + ' checks passed.');
