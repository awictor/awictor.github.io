import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { plantsPerRow, gridPlants, triangularPlants, squareFootPlants } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. 120 inches at 12" spacing fits 10 plants.
check('per row', plantsPerRow(120, 12) === 10);
// 2. Partial spacing floors down.
check('floor', plantsPerRow(125, 12) === 10);
// 3. A 48x96 bed at 12" grid holds 32 plants.
check('grid', gridPlants(48, 96, 12) === 32);
// 4. Square-foot gardening: 3" spacing = 16 per square.
check('sfg 16', squareFootPlants(3) === 16);
// 5. 6" spacing = 4 per square.
check('sfg 4', squareFootPlants(6) === 4);
// 6. 12" spacing = 1 per square.
check('sfg 1', squareFootPlants(12) === 1);
// 7. Triangular layout packs an extra row into a 52" wide bed.
check('triangular', triangularPlants(52, 96, 12) === 40);
// 8. The same bed grids to fewer plants, so triangular wins.
check('tri beats grid', gridPlants(52, 96, 12) === 32 && triangularPlants(52, 96, 12) > gridPlants(52, 96, 12));
// 9. Zero spacing rejected (per row).
let s = false; try { plantsPerRow(120, 0); } catch (e) { s = true; }
check('spacing guard', s);
// 10. Zero spacing rejected (square foot).
let f = false; try { squareFootPlants(0); } catch (e) { f = true; }
check('sfg guard', f);

console.log(passed + ' checks passed.');
