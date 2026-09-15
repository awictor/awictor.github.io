import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tankBTU, runtimeHours, poundsToGallons } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. A 20 lb tank holds 20 * 21594 = 431,880 BTU.
check('tank 20', tankBTU(20) === 431880);
// 2. One pound of propane is 21,594 BTU.
check('tank 1', tankBTU(1) === 21594);
// 3. An empty tank has no energy.
check('tank 0', tankBTU(0) === 0);
// 4. A 30,000 BTU/hr grill runs ~14.4 h on a full 20 lb tank.
check('runtime', near(runtimeHours(431880, 30000), 14.396));
// 5. A higher-output appliance runs out sooner.
check('more output less time', runtimeHours(431880, 60000) < runtimeHours(431880, 30000));
// 6. Propane weighs 4.24 lb per gallon.
check('gallons', near(poundsToGallons(4.24), 1));
// 7. A negative tank weight is rejected.
let a = false; try { tankBTU(-5); } catch (e) { a = true; }
check('weight guard', a);
// 8. A zero appliance output is rejected.
let b = false; try { runtimeHours(431880, 0); } catch (e) { b = true; }
check('output guard', b);
// 9. Negative energy is rejected.
let c = false; try { runtimeHours(-1, 30000); } catch (e) { c = true; }
check('energy guard', c);
// 10. A negative weight for gallons is rejected.
let d = false; try { poundsToGallons(-1); } catch (e) { d = true; }
check('gallons guard', d);

console.log(passed + ' checks passed.');
