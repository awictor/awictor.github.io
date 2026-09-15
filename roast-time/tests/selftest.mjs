import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { MEATS, cookingTime, formatMinutes, targetTemp } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. 12 lb at 13 min/lb = 156 minutes.
check('12x13', cookingTime(12, 13) === 156);
// 2. 15 lb stuffed at 15 min/lb = 225.
check('15x15', cookingTime(15, 15) === 225);
// 3. Format hours and minutes.
check('format 156', formatMinutes(156) === '2h 36m');
// 4. Whole hour.
check('format 60', formatMinutes(60) === '1h 0m');
// 5. Under an hour.
check('format 45', formatMinutes(45) === '0h 45m');
// 6. Linear in weight.
check('linear', cookingTime(24, 13) === 2 * cookingTime(12, 13));
// 7. Chicken example.
check('chicken', cookingTime(4, 20) === 80);
// 8. Poultry safe temp is 165.
check('poultry temp', targetTemp('turkey-unstuffed') === 165 && targetTemp('chicken') === 165);
// 9. Beef medium temp is 145.
check('beef medium', targetTemp('beef-medium') === 145);
// 10. Zero weight -> zero time; unknown meat throws.
let bad = false; try { targetTemp('nope'); } catch (e) { bad = true; }
check('zero + unknown', cookingTime(0, 13) === 0 && bad);

console.log(passed + ' checks passed.');
