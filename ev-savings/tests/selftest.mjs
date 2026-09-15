import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gasCostPerMile, evCostPerMile, costOverMiles, annualSavings } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Gas cost per mile.
check('gas cpm', near(gasCostPerMile(4, 25), 0.16));
// 2. EV cost per mile.
check('ev cpm', near(evCostPerMile(0.14, 4), 0.035));
// 3. EV is cheaper per mile here.
check('ev cheaper', evCostPerMile(0.14, 4) < gasCostPerMile(4, 25));
// 4. Annual savings.
check('savings', near(annualSavings(gasCostPerMile(4, 25), evCostPerMile(0.14, 4), 12000), (0.16 - 0.035) * 12000));
// 5. Cost over a distance.
check('cost over', costOverMiles(0.16, 12000) === 1920);
// 6. More miles means more savings.
check('more miles', annualSavings(0.16, 0.035, 20000) > annualSavings(0.16, 0.035, 12000));
// 7. Higher gas price widens the gap.
check('higher gas', gasCostPerMile(5, 25) > gasCostPerMile(4, 25));
// 8. Better MPG lowers gas cost per mile.
check('better mpg', gasCostPerMile(4, 40) < gasCostPerMile(4, 25));
// 9. Zero MPG is rejected.
let m = false; try { gasCostPerMile(4, 0); } catch (e) { m = true; }
check('mpg guard', m);
// 10. Zero miles-per-kWh is rejected.
let k = false; try { evCostPerMile(0.14, 0); } catch (e) { k = true; }
check('mpk guard', k);

console.log(passed + ' checks passed.');
