import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gearRatio, gearInches, developmentMeters, speedKmh } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 50/25 is a 2:1 gear ratio.
check('ratio', gearRatio(50, 25) === 2);
// 2. Gear inches = ratio x wheel diameter.
check('gear inches', gearInches(50, 25, 27) === 54);
// 3. Development is ratio x circumference in meters.
check('development', near(developmentMeters(50, 25, 2100), 4.2));
// 4. Speed from development and cadence.
check('speed', near(speedKmh(50, 25, 2100, 90), 4.2 * 90 * 60 / 1000));
// 5. A bigger chainring gives a taller gear.
check('taller gear', gearInches(52, 25, 27) > gearInches(50, 25, 27));
// 6. Equal teeth is 1:1.
check('one to one', gearRatio(53, 53) === 1);
// 7. Development scales with the gear ratio.
check('dev scaling', near(developmentMeters(50, 25, 2100), 2 * developmentMeters(25, 25, 2100)));
// 8. Speed scales with cadence.
check('cadence scaling', near(speedKmh(50, 25, 2100, 180), 2 * speedKmh(50, 25, 2100, 90)));
// 9. Zero cog rejected.
let c = false; try { gearRatio(50, 0); } catch (e) { c = true; }
check('cog guard', c);
// 10. Zero cog rejected through gear inches too.
let g = false; try { gearInches(50, 0, 27); } catch (e) { g = true; }
check('gear inches guard', g);

console.log(passed + ' checks passed.');
