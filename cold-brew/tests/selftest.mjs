import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { coffeeForWater, waterForCoffee, brewRatio } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 1000 g water at 1:8 needs 125 g coffee.
check('coffee', coffeeForWater(1000, 8) === 125);
// 2. 125 g coffee at 1:8 wants 1000 g water.
check('water', waterForCoffee(125, 8) === 1000);
// 3. The two functions invert each other.
check('roundtrip', near(waterForCoffee(coffeeForWater(1000, 8), 8), 1000));
// 4. 125 g coffee and 1000 g water is a 1:8 ratio.
check('ratio', brewRatio(125, 1000) === 8);
// 5. A stronger (lower) ratio needs more coffee.
check('stronger more coffee', coffeeForWater(1000, 5) > coffeeForWater(1000, 8));
// 6. More water at the same ratio needs more coffee.
check('more water more coffee', coffeeForWater(2000, 8) > coffeeForWater(1000, 8));
// 7. A non-positive ratio is rejected.
let a = false; try { coffeeForWater(1000, 0); } catch (e) { a = true; }
check('ratio guard', a);
// 8. Negative water is rejected.
let b = false; try { coffeeForWater(-1, 8); } catch (e) { b = true; }
check('water guard', b);
// 9. A non-positive coffee weight is rejected by brewRatio.
let c = false; try { brewRatio(0, 1000); } catch (e) { c = true; }
check('coffee guard', c);
// 10. Negative coffee is rejected by waterForCoffee.
let d = false; try { waterForCoffee(-1, 8); } catch (e) { d = true; }
check('coffee neg guard', d);

console.log(passed + ' checks passed.');
