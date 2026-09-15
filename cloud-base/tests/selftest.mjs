import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { spread, cloudBaseFeet, cloudBaseFeetImperial, feetToMeters } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. Temperature minus dew point is the spread.
check('spread', spread(25, 10) === 15);
// 2. A 15C spread puts the base at 6000 ft.
check('base 6000', cloudBaseFeet(25, 10) === 6000);
// 3. A zero spread (saturated) means base at the surface.
check('saturated', cloudBaseFeet(20, 20) === 0);
// 4. Fahrenheit variant: 22F spread ~ 5000 ft.
check('imperial', near(cloudBaseFeetImperial(70, 48), 5000));
// 5. A 20C spread gives 8000 ft.
check('base 8000', cloudBaseFeet(30, 10) === 8000);
// 6. A larger spread means a higher base.
check('monotonic', cloudBaseFeet(30, 10) > cloudBaseFeet(25, 10));
// 7. Feet to meters conversion.
check('feet->m', near(feetToMeters(6000), 1828.8));
// 8. Unit foot to meters.
check('foot', near(feetToMeters(1), 0.3048));
// 9. Dew point above temperature rejected (metric).
let d = false; try { cloudBaseFeet(10, 20); } catch (e) { d = true; }
check('metric guard', d);
// 10. Dew point above temperature rejected (imperial).
let f = false; try { cloudBaseFeetImperial(48, 70); } catch (e) { f = true; }
check('imperial guard', f);

console.log(passed + ' checks passed.');
