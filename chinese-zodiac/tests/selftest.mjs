import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { animalIndex, zodiacAnimal, zodiacElement } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. 2020 is the year of the Rat.
check('2020 rat', zodiacAnimal(2020) === 'Rat');
// 2. 2024 is the year of the Dragon.
check('2024 dragon', zodiacAnimal(2024) === 'Dragon');
// 3. 2021 is the year of the Ox.
check('2021 ox', zodiacAnimal(2021) === 'Ox');
// 4. 2020 is a Metal year.
check('2020 metal', zodiacElement(2020) === 'Metal');
// 5. 2024 is a Wood year (Wood Dragon).
check('2024 wood', zodiacElement(2024) === 'Wood');
// 6. 1984 is the Wood Rat (cycle anchor).
check('1984 wood rat', zodiacAnimal(1984) === 'Rat' && zodiacElement(1984) === 'Wood');
// 7. animalIndex of a Rat year is 0.
check('index 0', animalIndex(2020) === 0);
// 8. The animal repeats every 12 years.
check('12 cycle', zodiacAnimal(2032) === zodiacAnimal(2020));
// 9. Years before the anchor wrap correctly (year 3 -> Pig, index 11).
check('wrap', animalIndex(3) === 11);
// 10. A non-integer year is rejected.
let a = false; try { zodiacAnimal(2020.5); } catch (e) { a = true; }
check('integer guard', a);

console.log(passed + ' checks passed.');
