import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sodArea, piecesNeeded, palletsNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. A 30x20 lawn is 600 sq ft.
check('area', sodArea(30, 20) === 600);
// 2. 600 sq ft in 2 sq ft pieces, no waste, is 300 pieces.
check('pieces base', piecesNeeded(600, 2, 0) === 300);
// 3. A 5% waste allowance rounds to 315 pieces (float-safe).
check('pieces waste', piecesNeeded(600, 2, 5) === 315);
// 4. 900 sq ft at 450 per pallet, no waste, is 2 pallets.
check('pallets', palletsNeeded(900, 450, 0) === 2);
// 5. A bigger area needs more pieces.
check('bigger more', piecesNeeded(800, 2, 0) > piecesNeeded(600, 2, 0));
// 6. More waste needs more pieces.
check('more waste more', piecesNeeded(600, 2, 15) > piecesNeeded(600, 2, 5));
// 7. Bigger pieces means fewer of them.
check('bigger piece fewer', piecesNeeded(600, 10, 0) < piecesNeeded(600, 2, 0));
// 8. A negative area is rejected.
let a = false; try { sodArea(-1, 20); } catch (e) { a = true; }
check('area guard', a);
// 9. A non-positive piece size is rejected.
let b = false; try { piecesNeeded(600, 0, 5); } catch (e) { b = true; }
check('piece guard', b);
// 10. A non-positive pallet size is rejected.
let c = false; try { palletsNeeded(900, 0, 5); } catch (e) { c = true; }
check('pallet guard', c);

console.log(passed + ' checks passed.');
