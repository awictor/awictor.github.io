import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { raidUsableTB, rawCapacityTB, raidEfficiency, raidFaultTolerance } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. RAID 0 uses every disk.
check('raid0', raidUsableTB(0, 4, 4) === 16);
// 2. RAID 1 usable is one disk regardless of count.
check('raid1', raidUsableTB(1, 4, 4) === 4);
// 3. RAID 5 loses one disk to parity.
check('raid5', raidUsableTB(5, 4, 4) === 12);
// 4. RAID 6 loses two disks to parity.
check('raid6', raidUsableTB(6, 6, 4) === 16);
// 5. RAID 10 halves capacity.
check('raid10', raidUsableTB(10, 4, 4) === 8);
// 6. Raw capacity is disks times size.
check('raw', rawCapacityTB(4, 4) === 16);
// 7. RAID 5 efficiency of 4 disks is 3/4.
check('efficiency', near(raidEfficiency(5, 4, 4), 0.75));
// 8. Fault tolerance: RAID 0 none, RAID 6 two.
check('fault', raidFaultTolerance(0, 4) === 0 && raidFaultTolerance(6, 6) === 2);
// 9. Too few disks for the level is rejected.
let few = false; try { raidUsableTB(5, 2, 4); } catch (e) { few = true; }
check('min disks guard', few);
// 10. RAID 10 rejects an odd disk count.
let odd = false; try { raidUsableTB(10, 5, 4); } catch (e) { odd = true; }
check('raid10 even guard', odd);

console.log(passed + ' checks passed.');
