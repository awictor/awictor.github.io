import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { toKm, fromKm, convert, lightTravelSeconds } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-6); }
function rel(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9) * Math.abs(b); }

// A light-year is exactly one Julian year of light-seconds
check('1 light-year = 31,557,600 light-seconds', near(convert(1, 'ly', 'ls'), 31557600, 1e-3));
check('1 light-minute = 60 light-seconds', near(convert(1, 'lm', 'ls'), 60));
check('1 light-day = 86,400 light-seconds', near(convert(1, 'ld', 'ls'), 86400, 1e-6));
// Astronomical unit and miles are exact km values
check('1 AU = 149,597,870.7 km', near(convert(1, 'au', 'km'), 149597870.7, 1e-3));
check('1 mile = 1.609344 km', near(convert(1, 'mi', 'km'), 1.609344));
// Parsec relationships
check('1 parsec = 648000/pi AU', near(convert(1, 'pc', 'au'), 648000 / Math.PI, 1e-3));
check('1 parsec ~ 3.26156 light-years', near(convert(1, 'pc', 'ly'), 3.2615637, 1e-4));
// Light-travel time of a light-year is one year of seconds
check('light travels a light-year in a year', near(lightTravelSeconds(toKm(1, 'ly')), 31557600, 1e-3));
// Sunlight reaches Earth (1 AU) in about 499 s
check('1 AU of light-travel is ~499 s', near(lightTravelSeconds(toKm(1, 'au')), 499.00478, 1e-2));
// Conversions round-trip cleanly
check('ly -> pc -> ly round trips', rel(convert(convert(42, 'ly', 'pc'), 'pc', 'ly'), 42, 1e-12));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
