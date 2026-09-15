import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { solve } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);
// canonical consistent set: 12 V, 2 A, 6 Ω, 24 W
const expectFull = r => { near(r.V, 12); near(r.I, 2); near(r.R, 6); near(r.P, 24); };

check('V & I → R, P', () => expectFull(solve({ V: 12, I: 2 })));
check('V & R → I, P', () => expectFull(solve({ V: 12, R: 6 })));
check('V & P → I, R', () => expectFull(solve({ V: 12, P: 24 })));
check('I & R → V, P', () => expectFull(solve({ I: 2, R: 6 })));
check('I & P → V, R', () => expectFull(solve({ I: 2, P: 24 })));
check('R & P → V, I', () => expectFull(solve({ R: 6, P: 24 })));

check('another consistent triple (5 V, 0.5 A → 10 Ω, 2.5 W)', () => {
  const r = solve({ V: 5, I: 0.5 });
  near(r.R, 10); near(r.P, 2.5);
});

check('requires exactly two inputs', () => {
  assert.throws(() => solve({ V: 12 }), /exactly two/);
  assert.throws(() => solve({ V: 12, I: 2, R: 6 }), /exactly two/);
  assert.throws(() => solve({}), /exactly two/);
});

check('rejects zero divisors', () => {
  assert.throws(() => solve({ V: 12, I: 0 }), /current cannot be zero/);
  assert.throws(() => solve({ V: 12, R: 0 }), /resistance cannot be zero/);
  assert.throws(() => solve({ P: 24, R: 0 }), /resistance must be positive/);
});

check('ignores empty-string fields when counting inputs', () => {
  const r = solve({ V: 12, I: 2, R: '', P: '' });
  expectFull(r);
});

console.log(`\n${n} checks passed.`);
