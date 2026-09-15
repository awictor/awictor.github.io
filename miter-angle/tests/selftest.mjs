import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { miterAngle, interiorAngle, outerSegmentLength, totalBoardLength } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// Miter saw angle = 180 / sides
check('square miters at 45 degrees', near(miterAngle(4), 45));
check('hexagon miters at 30 degrees', near(miterAngle(6), 30));
check('octagon miters at 22.5 degrees', near(miterAngle(8), 22.5));
// Interior angle = (n-2)*180/n
check('triangle interior is 60', near(interiorAngle(3), 60));
check('hexagon interior is 120', near(interiorAngle(6), 120));
// The two identities are linked: miter = 90 - interior/2
check('miter equals 90 minus half interior', near(miterAngle(6), 90 - interiorAngle(6) / 2));
// Outer segment length = D * sin(pi/n); a square in a dia-10 circle has side 10/sqrt(2)
check('square segment is the inscribed side', near(outerSegmentLength(4, 10), 10 / Math.SQRT2));
check('hexagon segment = D * sin(30) = D/2', near(outerSegmentLength(6, 12), 6));
// More sides -> shorter individual segment for the same diameter
check('more sides shorten each segment', outerSegmentLength(12, 10) < outerSegmentLength(6, 10));
// Total board = n * segment * (1 + waste); hexagon dia 12, 20% waste
check('board length adds waste allowance', near(totalBoardLength(6, 12, 20), 6 * 6 * 1.2));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
