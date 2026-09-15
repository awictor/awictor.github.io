import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { distance, similarity } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. Classic textbook example kitten -> sitting = 3.
check('kitten->sitting = 3', distance('kitten', 'sitting') === 3);
// 2. Identical strings = 0.
check('identical = 0', distance('flaw', 'flaw') === 0);
// 3. Empty vs string = length of the other.
check('empty vs abc = 3', distance('', 'abc') === 3);
// 4. Symmetric.
check('symmetric', distance('sunday', 'saturday') === distance('saturday', 'sunday'));
// 5. Known value sunday->saturday = 3.
check('sunday->saturday = 3', distance('sunday', 'saturday') === 3);
// 6. Single substitution.
check('flaw->lawn = 2', distance('flaw', 'lawn') === 2);
// 7. Case sensitive (Kitten vs kitten differ by 1).
check('case sensitive', distance('Kitten', 'kitten') === 1);
// 8. Similarity of identical strings = 1.
check('similarity identical = 1', similarity('abc', 'abc') === 1);
// 9. Two empty strings similarity = 1 (no division by zero).
check('similarity both empty = 1', similarity('', '') === 1);
// 10. Similarity of kitten/sitting = 1 - 3/7.
check('similarity kitten/sitting', Math.abs(similarity('kitten', 'sitting') - (1 - 3 / 7)) < 1e-12);

console.log(passed + ' checks passed.');
