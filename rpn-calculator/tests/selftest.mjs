import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { evaluateRpn } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. Simple addition.
check('3 4 +', evaluateRpn('3 4 +') === 7);
// 2. Classic Wikipedia example = 14.
check('classic', evaluateRpn('5 1 2 + 4 * + 3 -') === 14);
// 3. Exponent.
check('2 3 ^', evaluateRpn('2 3 ^') === 8);
// 4. Division.
check('10 2 /', evaluateRpn('10 2 /') === 5);
// 5. Order matters for subtraction: a b - = a - b.
check('3 4 -', evaluateRpn('3 4 -') === -1);
// 6. Nested.
check('2 3 4 * +', evaluateRpn('2 3 4 * +') === 14);
// 7. A single number is its own value.
check('single', evaluateRpn('42') === 42);
// 8. Non-integer result.
check('7 2 /', evaluateRpn('7 2 /') === 3.5);
// 9. Too few operands throws.
let few = false; try { evaluateRpn('3 +'); } catch (e) { few = true; }
check('too few operands', few);
// 10. Leftover values (malformed) throws; invalid token throws.
let mal = false; try { evaluateRpn('3 4'); } catch (e) { mal = true; }
let bad = false; try { evaluateRpn('3 x +'); } catch (e) { bad = true; }
check('malformed / bad token', mal && bad);

console.log(passed + ' checks passed.');
