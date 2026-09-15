import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { drivingEmissionsKg, flightEmissionsKg, electricityEmissionsKg, treesToOffset } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. 250 mi at 25 MPG burns 10 gallons -> 88.87 kg.
check('driving', near(drivingEmissionsKg(250, 25), 88.87));
// 2. One gallon is 8.887 kg.
check('one gallon', near(drivingEmissionsKg(25, 25), 8.887));
// 3. Electricity is kWh times grid factor.
check('electricity', electricityEmissionsKg(100, 0.4) === 40);
// 4. Flying is 0.15 kg per mile.
check('flying', near(flightEmissionsKg(1000), 150));
// 5. 21 kg is one tree-year.
check('one tree', near(treesToOffset(21), 1));
// 6. 210 kg needs ten trees.
check('ten trees', near(treesToOffset(210), 10));
// 7. Better MPG halves driving emissions.
check('mpg inverse', near(drivingEmissionsKg(100, 50), drivingEmissionsKg(100, 25) / 2));
// 8. Driving scales linearly with miles.
check('miles linear', near(drivingEmissionsKg(500, 25), 2 * drivingEmissionsKg(250, 25)));
// 9. Zero MPG rejected.
let m = false; try { drivingEmissionsKg(100, 0); } catch (e) { m = true; }
check('mpg guard', m);
// 10. Negative flight distance rejected.
let f = false; try { flightEmissionsKg(-1); } catch (e) { f = true; }
check('flight guard', f);

console.log(passed + ' checks passed.');
