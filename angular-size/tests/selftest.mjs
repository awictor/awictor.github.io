import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { angularSizeRad, angularSizeDeg, sizeFromAngular, distanceForAngular } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// size = distance -> theta = 2*atan(0.5) = 53.13 degrees
check('equal size and distance is 53.13 deg', near(angularSizeDeg(1, 1), 2 * Math.atan(0.5) * 180 / Math.PI));
// The Moon: 3474 km at 384400 km is about 0.518 deg
check('Moon is about half a degree', near(angularSizeDeg(3474, 384400), 0.5177, 1e-3));
// Small-angle limit: theta (rad) ~ size/distance when far
check('small-angle approximation holds', near(angularSizeRad(1, 100000), 1 / 100000, 1e-9));
// Farther away looks smaller
check('farther is smaller', angularSizeDeg(1, 2) < angularSizeDeg(1, 1));
// Bigger looks larger
check('bigger is larger', angularSizeDeg(2, 10) > angularSizeDeg(1, 10));
// sizeFromAngular inverts angularSizeDeg
check('size from angle round trips', near(sizeFromAngular(angularSizeDeg(5, 100), 100), 5, 1e-9));
// distanceForAngular inverts too
check('distance from angle round trips', near(distanceForAngular(5, angularSizeDeg(5, 100)), 100, 1e-9));
// A known clean case: 90 deg at distance 1 -> size = 2*tan(45) = 2
check('90 deg at distance 1 spans size 2', near(sizeFromAngular(90, 1), 2));
// Angular size is symmetric in the ratio: same s/d gives same angle
check('depends only on the size/distance ratio', near(angularSizeDeg(2, 4), angularSizeDeg(1, 2)));
// Zero distance guarded
check('zero distance yields zero angle', angularSizeRad(1, 0) === 0);

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
