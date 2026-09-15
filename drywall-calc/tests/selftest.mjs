import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { wallArea, sheetArea, sheetsNeeded, screwsNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. A standard 4x8 sheet is 32 sq ft.
check('sheet area', sheetArea(4, 8) === 32);
// 2. A 10x10 room (40 ft perimeter) at 8 ft = 320 sq ft of wall.
check('wall area', wallArea(40, 8) === 320);
// 3. 320 sq ft of 32-sq-ft sheets, no waste = 10 sheets.
check('sheets exact', sheetsNeeded(320, 32, 0) === 10);
// 4. Same with 10% waste rounds up to 11.
check('sheets waste', sheetsNeeded(320, 32, 10) === 11);
// 5. Any remainder rounds up to a whole sheet.
check('ceil', sheetsNeeded(321, 32, 0) === 11);
// 6. Roughly 32 screws per sheet.
check('screws', screwsNeeded(10, 32) === 320);
// 7. Screws scale with sheet count.
check('screws scaling', screwsNeeded(20, 32) === 2 * screwsNeeded(10, 32));
// 8. Wall area scales with perimeter.
check('area scaling', wallArea(80, 8) === 2 * wallArea(40, 8));
// 9. Zero sheet width rejected.
let s = false; try { sheetArea(0, 8); } catch (e) { s = true; }
check('sheet guard', s);
// 10. Zero sheet area rejected in sheetsNeeded.
let n = false; try { sheetsNeeded(320, 0, 0); } catch (e) { n = true; }
check('sheetsNeeded guard', n);

console.log(passed + ' checks passed.');
