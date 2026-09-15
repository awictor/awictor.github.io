import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { fallInches, slopePerFootIn, slopePercent, runForFall } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// 40 ft at 1/4" per ft drops 10"
check('fall = run x slope', near(fallInches(40, 0.25), 10));
// Recover the slope from drop and run
check('slope per foot from drop and run', near(slopePerFootIn(10, 40), 0.25));
// 1/4" per foot is ~2.083% grade (3" over 12 ft)
check('quarter inch per foot is 2.083%', near(slopePercent(3, 12), 2.0833333, 1e-5));
// 1/8" per foot is ~1.042% grade
check('eighth inch per foot is 1.042%', near(slopePercent(1.5, 12), 1.0416667, 1e-5));
// Run needed for a given fall
check('run for a target fall', near(runForFall(10, 0.25), 40));
// Round trips
check('fall <-> slope round trips', near(slopePerFootIn(fallInches(30, 0.125), 30), 0.125));
// A longer run drops more at the same slope
check('longer run drops more', fallInches(60, 0.25) > fallInches(40, 0.25));
// A steeper slope drops more over the same run
check('steeper slope drops more', fallInches(40, 0.5) > fallInches(40, 0.25));
// Guard against a zero run
check('zero run yields zero slope', slopePerFootIn(10, 0) === 0 && slopePercent(10, 0) === 0);
// Percent grade is consistent with inches per foot: 0.5 in/ft over 10 ft = 5 in -> 4.1667%
check('half inch per foot is 4.167%', near(slopePercent(fallInches(10, 0.5), 10), 4.1666667, 1e-5));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
