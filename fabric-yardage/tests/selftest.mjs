import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { piecesPerWidth, rowsNeeded, yardsNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Four 10" pieces fit across a 42" width.
check('per width', piecesPerWidth(42, 10) === 4);
// 2. A piece exactly the fabric width gives one per row.
check('per width 1', piecesPerWidth(42, 42) === 1);
// 3. 8 pieces at 4 per row is 2 rows.
check('rows even', rowsNeeded(8, 4) === 2);
// 4. 9 pieces at 4 per row rounds up to 3 rows.
check('rows round up', rowsNeeded(9, 4) === 3);
// 5. 8 pieces (10x12) across 42": 2 rows * 12" = 24" = 0.667 yd.
check('yards 8', near(yardsNeeded(8, 10, 12, 42), 24 / 36));
// 6. 9 pieces needs a third row: 36" = 1 yd.
check('yards 9', near(yardsNeeded(9, 10, 12, 42), 1));
// 7. Narrower fabric needs more yardage.
check('narrower more', yardsNeeded(8, 10, 12, 20) > yardsNeeded(8, 10, 12, 42));
// 8. A piece wider than the fabric is rejected.
let a = false; try { piecesPerWidth(42, 50); } catch (e) { a = true; }
check('too wide guard', a);
// 9. A non-positive piece length is rejected.
let b = false; try { yardsNeeded(8, 10, 0, 42); } catch (e) { b = true; }
check('length guard', b);
// 10. Zero pieces is rejected.
let c = false; try { rowsNeeded(0, 4); } catch (e) { c = true; }
check('pieces guard', c);

console.log(passed + ' checks passed.');
