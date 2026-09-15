import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { enduranceHours, rangeNm, usableAfterReserve, fuelForLegGal } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// 40 gal at 10 gph -> 4 hours
check('endurance = fuel / burn', near(enduranceHours(40, 10), 4));
// Range = endurance * TAS: 4 h * 120 kt = 480 nm
check('range = endurance x TAS', near(rangeNm(40, 10, 120), 480));
// 45-min reserve at 10 gph holds back 7.5 gal
check('reserve subtracts burn x time', near(usableAfterReserve(40, 10, 45), 32.5));
// Fuel for a 240 nm leg at 120 kt, 10 gph -> 2 h -> 20 gal
check('fuel for leg = time x burn', near(fuelForLegGal(240, 120, 10), 20));
// More fuel, more endurance
check('more fuel means more endurance', enduranceHours(60, 10) > enduranceHours(40, 10));
// Higher burn, less endurance
check('higher burn means less endurance', enduranceHours(40, 15) < enduranceHours(40, 10));
// Faster cruise, more range for the same fuel
check('higher TAS extends range', rangeNm(40, 10, 140) > rangeNm(40, 10, 120));
// Reserve always reduces usable fuel
check('reserve reduces usable fuel', usableAfterReserve(40, 10, 45) < 40);
// Range after reserve is less than total range
check('reserve shortens usable range', rangeNm(usableAfterReserve(40, 10, 45), 10, 120) < rangeNm(40, 10, 120));
// Longer leg needs more fuel
check('longer leg needs more fuel', fuelForLegGal(300, 120, 10) > fuelForLegGal(150, 120, 10));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
