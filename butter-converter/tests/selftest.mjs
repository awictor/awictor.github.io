import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { toGrams, fromGrams, convert } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. One stick is 113.4 g.
check('stick grams', toGrams(1, 'stick') === 113.4);
// 2. Two sticks make one cup.
check('sticks to cup', near(convert(2, 'stick', 'cup'), 1));
// 3. One stick is 8 tablespoons.
check('stick to tbsp', near(convert(1, 'stick', 'tbsp'), 8));
// 4. One stick is 4 ounces.
check('stick to oz', near(convert(1, 'stick', 'oz'), 4));
// 5. A cup is 16 tablespoons.
check('cup to tbsp', near(convert(1, 'cup', 'tbsp'), 16));
// 6. Converting to the same unit is identity.
check('identity', near(convert(3, 'tbsp', 'tbsp'), 3));
// 7. fromGrams inverts toGrams.
check('roundtrip', near(fromGrams(toGrams(2, 'cup'), 'cup'), 2));
// 8. A negative amount is rejected.
let a = false; try { toGrams(-1, 'stick'); } catch (e) { a = true; }
check('amount guard', a);
// 9. An unknown unit is rejected.
let b = false; try { toGrams(1, 'gallon'); } catch (e) { b = true; }
check('unit guard', b);
// 10. fromGrams rejects negative grams.
let c = false; try { fromGrams(-1, 'stick'); } catch (e) { c = true; }
check('grams guard', c);

console.log(passed + ' checks passed.');
