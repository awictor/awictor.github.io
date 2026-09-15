import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { evaluate, extractVariables, truthTable } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. Variable extraction is unique and alphabetically sorted.
check('extract vars sorted unique', JSON.stringify(extractVariables('B or A or B')) === JSON.stringify(['A', 'B']));
// 2. AND is true only when both operands are true.
check('AND semantics', evaluate('A and B', { A: true, B: true }) === true && evaluate('A and B', { A: true, B: false }) === false);
// 3. NOT inverts.
check('NOT semantics', evaluate('not A', { A: false }) === true && evaluate('not A', { A: true }) === false);
// 4. OR is false only when both are false.
check('OR semantics', evaluate('A or B', { A: false, B: false }) === false && evaluate('A or B', { A: false, B: true }) === true);
// 5. XOR is true exactly when operands differ.
check('XOR semantics', evaluate('A xor B', { A: true, B: false }) === true && evaluate('A xor B', { A: true, B: true }) === false);
// 6. Precedence: AND binds tighter than OR, so "A or B and C" = A or (B and C).
check('precedence AND over OR', evaluate('A or B and C', { A: true, B: false, C: false }) === true);
// 7. Parentheses override precedence: "(A or B) and C" differs from the above.
check('parentheses override', evaluate('(A or B) and C', { A: true, B: false, C: false }) === false);
// 8. Symbol operators match word operators.
check('symbol operators', evaluate('A & !B | C', { A: true, B: false, C: false }) === evaluate('A and not B or C', { A: true, B: false, C: false }));
// 9. Truth table for two vars has 4 rows and AND is true in exactly one.
const tt = truthTable('A and B');
check('truth table shape', tt.variables.length === 2 && tt.rows.length === 4 && tt.rows.filter(r => r.result).length === 1);
// 10. De Morgan's law holds for every assignment.
let deMorgan = true;
for (const A of [false, true]) for (const B of [false, true]) {
  if (evaluate('not (A and B)', { A, B }) !== evaluate('(not A) or (not B)', { A, B })) deMorgan = false;
}
check("De Morgan's law", deMorgan);

console.log(passed + ' checks passed.');
