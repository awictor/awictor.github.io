import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { fallTime, fallDistance, impactVelocity, velocityAtTime } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

const g = 9.8;
// h = 4.9 m at g=9.8 -> t = 1 s exactly (2*4.9/9.8 = 1)
check('fall time from height', near(fallTime(4.9, g), 1));
check('fall distance from time', near(fallDistance(1, g), 4.9));
check('impact velocity from height', near(impactVelocity(4.9, g), 9.8));
check('velocity at time equals g*t', near(velocityAtTime(1, g), 9.8));
// Consistency identities
check('impact velocity equals g times fall time', near(impactVelocity(20, g), velocityAtTime(fallTime(20, g), g)));
check('height <-> time round trips', near(fallDistance(fallTime(15, g), g), 15));
// Doubling height does NOT double time (sqrt relationship): t scales by sqrt(2)
check('time scales as sqrt of height', near(fallTime(2 * 5, g) / fallTime(5, g), Math.SQRT2));
// Impact speed is proportional to sqrt(height)
check('impact speed grows with height', impactVelocity(40, g) > impactVelocity(10, g));
// Lower gravity means a longer fall for the same height (Moon vs Earth)
check('lower gravity lengthens the fall', fallTime(10, 1.62) > fallTime(10, 9.8));
// A 1 s fall on the Moon covers less distance than on Earth
check('lower gravity covers less distance in 1s', fallDistance(1, 1.62) < fallDistance(1, 9.8));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
