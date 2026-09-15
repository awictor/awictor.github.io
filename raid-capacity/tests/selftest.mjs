import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { minDisks, usableTB, faultTolerance, efficiency } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// RAID 0: 4 x 4TB = 16TB usable, 0 tolerance
check('raid0 usable = disks*size', near(usableTB(0, 4, 4), 16));
check('raid0 fault tolerance is zero', faultTolerance(0, 4) === 0);
// RAID 1: mirror -> one disk of usable, tolerates all but one
check('raid1 usable = single disk', near(usableTB(1, 4, 4), 4));
check('raid1 tolerates count-1', faultTolerance(1, 4) === 3);
// RAID 5: (n-1)*size, tolerates 1
check('raid5 usable = (n-1)*size', near(usableTB(5, 4, 4), 12));
// RAID 6: (n-2)*size, tolerates 2
check('raid6 usable = (n-2)*size', near(usableTB(6, 6, 2), 8));
// RAID 10: half capacity, needs even count
check('raid10 usable = half', near(usableTB(10, 6, 3), 9));
check('raid10 odd count returns 0', usableTB(10, 5, 3) === 0);
// Below minimum disks -> 0 usable; efficiency of raid5 4x4 = 12/16
check('below minimum disks yields zero', usableTB(5, 2, 4) === 0 && minDisks(6) === 4);
check('efficiency raid5 4 disks = 0.75', near(efficiency(5, 4, 4), 0.75));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
