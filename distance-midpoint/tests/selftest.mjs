import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { distance, midpoint, slope, manhattan } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// 3-4-5 right triangle
check('3-4-5 distance is 5', near(distance(0, 0, 3, 4), 5));
// 5-12-13
check('5-12-13 distance is 13', near(distance(0, 0, 5, 12), 13));
// Midpoint averages coordinates
check('midpoint averages coordinates', (function(){ const m = midpoint(0, 0, 4, 6); return m.x === 2 && m.y === 3; })());
// Slope rise over run
check('slope is rise over run', near(slope(0, 0, 2, 4), 2));
// Manhattan distance sums the legs
check('manhattan sums the legs', near(manhattan(0, 0, 3, 4), 7));
// Distance is symmetric
check('distance is symmetric', near(distance(1, 2, 5, 7), distance(5, 7, 1, 2)));
// A point to itself is zero distance
check('zero distance to itself', distance(3, 3, 3, 3) === 0);
// Vertical line has infinite slope
check('vertical line slope is infinite', slope(2, 0, 2, 5) === Infinity);
// Midpoint of identical points is that point
check('midpoint of a single point', (function(){ const m = midpoint(5, 5, 5, 5); return m.x === 5 && m.y === 5; })());
// Euclidean distance never exceeds Manhattan distance
check('euclidean never exceeds manhattan', distance(0, 0, 3, 4) <= manhattan(0, 0, 3, 4));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
