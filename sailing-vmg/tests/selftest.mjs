import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { vmg, crossTrackSpeed, speedForVmg, legTimeHours } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// Straight at the mark: all speed is VMG
check('zero angle gives full VMG', near(vmg(6, 0), 6));
// Perpendicular: no progress toward the mark
check('90 degrees gives zero VMG', near(vmg(6, 90), 0));
// 60 degrees off: half speed (cos 60 = 0.5)
check('60 degrees halves VMG', near(vmg(6, 60), 3));
// Cross-track is the sine component
check('cross-track at 90 is full speed', near(crossTrackSpeed(6, 90), 6));
check('cross-track at 0 is zero', near(crossTrackSpeed(6, 0), 0));
// VMG and cross-track recombine to boat speed
check('components recombine to boat speed', near(vmg(6, 40) ** 2 + crossTrackSpeed(6, 40) ** 2, 36));
// Pointing closer to the mark improves VMG
check('smaller angle improves VMG', vmg(6, 30) > vmg(6, 60));
// Speed required to hit a target VMG at an angle
check('speed for target VMG', near(speedForVmg(3, 60), 6));
// Time on a leg = distance / VMG
check('leg time = distance / VMG', near(legTimeHours(12, vmg(6, 60)), 4));
// Beyond 90 degrees VMG goes negative (sailing away)
check('angle past 90 is negative VMG', vmg(6, 120) < 0);

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
