import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { wbgtOutdoor, wbgtIndoor, heatFlag, cToF } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// Outdoor: 0.7*25 + 0.2*35 + 0.1*30 = 27.5
check('outdoor WBGT weighted sum', near(wbgtOutdoor(25, 35, 30), 27.5));
// Indoor: 0.7*25 + 0.3*35 = 28
check('indoor WBGT weighted sum', near(wbgtIndoor(25, 35), 28));
// Weights sum to 1: equal inputs return that value
check('outdoor weights sum to 1', near(wbgtOutdoor(24, 24, 24), 24));
check('indoor weights sum to 1', near(wbgtIndoor(24, 24), 24));
// Wet bulb carries 70% of the weight
check('wet-bulb dominates (0.7)', near(wbgtOutdoor(30, 35, 30) - wbgtOutdoor(20, 35, 30), 7));
// Flag categories
check('cool conditions are low risk', heatFlag(20).level === 0);
check('extreme heat is the black flag', heatFlag(33).level === 4);
check('flag severity rises with WBGT', heatFlag(30).level > heatFlag(27).level);
// Boundary at the black-flag threshold (32.2 C)
check('32.2 C hits black flag', heatFlag(32.2).level === 4 && heatFlag(32.1).level === 3);
// Celsius to Fahrenheit
check('30 C is 86 F', near(cToF(30), 86));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
