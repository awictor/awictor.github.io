import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { boardFeet, boardFeetFromFeet, totalBoardFeet, cost } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('the definition: 1"×12"×12" = 1 board foot', () => {
  near(boardFeet(1, 12, 12), 1);
});

check('equivalent dimensions give the same board feet', () => {
  near(boardFeet(2, 6, 12), 1);
  near(boardFeet(1, 6, 24), 1);
});

check('a 1×12 board 12 ft long is 12 BF', () => {
  near(boardFeet(1, 12, 144), 12);
});

check('boardFeetFromFeet: 1×6×8ft = 4 BF', () => {
  near(boardFeetFromFeet(1, 6, 8), 4);
});

check('feet and inch forms agree', () => {
  near(boardFeetFromFeet(1, 6, 8), boardFeet(1, 6, 96));
});

check('total board feet for a quantity', () => {
  near(totalBoardFeet(4, 10), 40);
  near(totalBoardFeet(1.5, 0), 0);
});

check('cost = board feet × price', () => {
  near(cost(40, 4.5), 180);
  near(cost(0, 5), 0);
});

check('a full order: ten 1×6×8ft at $4.50/BF = $180', () => {
  const each = boardFeetFromFeet(1, 6, 8);
  near(cost(totalBoardFeet(each, 10), 4.5), 180);
});

check('board feet scale linearly with each dimension', () => {
  near(boardFeet(2, 6, 12), 2 * boardFeet(1, 6, 12));
  near(boardFeet(1, 12, 12), 2 * boardFeet(1, 6, 12));
});

check('validation: non-positive dims, bad quantity, negative price throw', () => {
  assert.throws(() => boardFeet(0, 6, 12), /thickness must be positive/);
  assert.throws(() => boardFeetFromFeet(1, 6, 0), /length must be positive/);
  assert.throws(() => totalBoardFeet(4, 2.5), /non-negative integer/);
  assert.throws(() => cost(40, -1), /zero or positive/);
});

console.log(`\n${n} checks passed.`);
