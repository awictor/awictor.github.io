import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { capacityInches, stockingPercent, remainingInches } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. A 20-gallon tank at 1 in/gal holds 20 inches of fish.
check('capacity', capacityInches(20, 1) === 20);
// 2. 10 inches in a 20-inch tank is 50% stocked.
check('percent', stockingPercent(10, 20, 1) === 50);
// 3. That leaves 10 inches of room.
check('remaining', remainingInches(20, 10, 1) === 10);
// 4. Filling to capacity is 100%.
check('full', stockingPercent(20, 20, 1) === 100);
// 5. A bigger tank has more capacity.
check('bigger more', capacityInches(40, 1) > capacityInches(20, 1));
// 6. A lower inch-per-gallon rule cuts capacity (e.g. goldfish).
check('lower ipg less', capacityInches(20, 0.5) < capacityInches(20, 1));
// 7. A non-positive gallons is rejected.
let a = false; try { capacityInches(0, 1); } catch (e) { a = true; }
check('gallon guard', a);
// 8. A non-positive inch-per-gallon is rejected.
let b = false; try { capacityInches(20, 0); } catch (e) { b = true; }
check('ipg guard', b);
// 9. Negative fish inches are rejected.
let c = false; try { stockingPercent(-1, 20, 1); } catch (e) { c = true; }
check('fish guard', c);
// 10. remainingInches rejects a non-positive tank.
let d = false; try { remainingInches(0, 10, 1); } catch (e) { d = true; }
check('remaining guard', d);

console.log(passed + ' checks passed.');
