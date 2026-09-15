import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { drinksNeeded, mainProteinLbs, appetizerPieces, iceLbs } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. One drink per guest per hour: 20 guests, 3 hours = 60.
check('drinks', drinksNeeded(20, 3) === 60);
// 2. 8 oz per guest for 20 guests is 10 lbs.
check('protein', mainProteinLbs(20, 8) === 10);
// 3. 6 pieces per guest for 20 guests is 120.
check('apps', appetizerPieces(20, 6) === 120);
// 4. Ice is 1.5 lbs per guest.
check('ice', iceLbs(20) === 30);
// 5. Drinks scale with guest count.
check('drinks scaling', drinksNeeded(40, 3) === 2 * drinksNeeded(20, 3));
// 6. 16 oz per guest is exactly a pound each.
check('protein pound', mainProteinLbs(10, 16) === 10);
// 7. Appetizers scale with pieces per guest.
check('apps scaling', appetizerPieces(20, 12) === 2 * appetizerPieces(20, 6));
// 8. Ice for 10 guests is 15 lbs.
check('ice 10', iceLbs(10) === 15);
// 9. Negative guests rejected.
let g = false; try { drinksNeeded(-1, 3); } catch (e) { g = true; }
check('guest guard', g);
// 10. Negative ounces rejected.
let o = false; try { mainProteinLbs(20, -1); } catch (e) { o = true; }
check('oz guard', o);

console.log(passed + ' checks passed.');
