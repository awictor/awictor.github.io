import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { barCount, gridTotalBars, gridTotalLengthFt } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. 10 ft at 12" on center is 11 bars (both edges).
check('bar count', barCount(10, 12) === 11);
// 2. Wider spacing means fewer bars.
check('wider fewer', barCount(10, 24) === 6);
// 3. Tighter spacing means more bars.
check('tighter more', barCount(10, 6) > barCount(10, 12));
// 4. A zero span still needs one edge bar.
check('edge bar', barCount(0, 12) === 1);
// 5. Grid totals both directions.
check('grid bars', gridTotalBars(10, 10, 12) === 22);
// 6. Total length for a 10x10 at 12" is 220 ft.
check('grid length square', gridTotalLengthFt(10, 10, 12) === 220);
// 7. Rectangular slab total length.
check('grid length rect', gridTotalLengthFt(20, 10, 12) === barCount(10, 12) * 20 + barCount(20, 12) * 10);
// 8. A bigger slab needs more steel.
check('bigger more', gridTotalLengthFt(20, 20, 12) > gridTotalLengthFt(10, 10, 12));
// 9. Zero spacing is rejected.
let s = false; try { barCount(10, 0); } catch (e) { s = true; }
check('spacing guard', s);
// 10. A negative span is rejected.
let n = false; try { barCount(-10, 12); } catch (e) { n = true; }
check('span guard', n);

console.log(passed + ' checks passed.');
