import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { EXPONENTS, pythagoreanExponent, winPct, expectedWins } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// Equal scoring lands at exactly .500 regardless of exponent
check('equal scored/allowed is .500', near(winPct(700, 700, 1.83), 0.5) && near(winPct(90, 90, 13.91), 0.5));
// Known value: 2^2 / (2^2 + 1^2) = 4/5 = 0.8
check('winPct(2,1,2) = 0.8', near(winPct(2, 1, 2), 0.8));
// Outscoring opponents beats .500; being outscored is below
check('outscoring beats .500', winPct(800, 700, 1.83) > 0.5);
check('being outscored is below .500', winPct(700, 800, 1.83) < 0.5);
// The two teams' win percentages sum to 1
check('opponent win percentages are complementary', near(winPct(750, 680, 1.83) + winPct(680, 750, 1.83), 1));
// Expected wins is win% times games
check('expected wins = winPct * games', near(expectedWins(2, 1, 2, 162), 0.8 * 162));
// A higher exponent amplifies a scoring edge
check('higher exponent amplifies the edge', winPct(110, 100, 13.91) > winPct(110, 100, 1.83));
// More scoring (same allowed) always raises win%
check('more scoring raises win%', winPct(820, 700, 2) > winPct(760, 700, 2));
// Sport exponents are wired up
check('baseball exponent is 1.83', near(pythagoreanExponent('baseball'), 1.83));
check('unknown sport falls back to 2', near(pythagoreanExponent('cricket'), 2));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
