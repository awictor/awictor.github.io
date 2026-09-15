import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { balances, settle } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 0.02) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);
const sum = obj => Object.values(obj).reduce((a, b) => a + b, 0);
// apply settlements and confirm balances zero out
function residual(net, tx){
  const r = { ...net };
  for(const t of tx){ r[t.from] = (r[t.from] || 0) + t.amount; r[t.to] = (r[t.to] || 0) - t.amount; }
  return Math.max(...Object.values(r).map(Math.abs));
}

check('one payer split three ways', () => {
  const net = balances([{ payer: 'A', amount: 90, participants: ['A', 'B', 'C'] }]);
  assert.equal(net.A, 60);
  assert.equal(net.B, -30);
  assert.equal(net.C, -30);
});

check('balances always sum to ~0', () => {
  const net = balances([
    { payer: 'A', amount: 60, participants: ['A', 'B'] },
    { payer: 'B', amount: 30, participants: ['A', 'B'] }
  ]);
  near(sum(net), 0);
  assert.equal(net.A, 15);
  assert.equal(net.B, -15);
});

check('settle produces the obvious single transfer', () => {
  const tx = settle({ A: 15, B: -15 });
  assert.deepEqual(tx, [{ from: 'B', to: 'A', amount: 15 }]);
});

check('settle: two debtors pay one creditor', () => {
  const tx = settle({ A: 60, B: -30, C: -30 });
  assert.equal(tx.length, 2);
  assert.ok(tx.every(t => t.to === 'A'));
  near(tx.reduce((s, t) => s + t.amount, 0), 60);
});

check('settlements zero out the balances', () => {
  const net = balances([
    { payer: 'A', amount: 120, participants: ['A', 'B', 'C', 'D'] },
    { payer: 'B', amount: 40, participants: ['A', 'B'] },
    { payer: 'C', amount: 20, participants: ['C', 'D'] }
  ]);
  near(sum(net), 0);
  const tx = settle(net);
  near(residual(net, tx), 0);
});

check('settle uses at most (n-1) transactions', () => {
  const net = balances([{ payer: 'A', amount: 100, participants: ['A', 'B', 'C', 'D', 'E'] }]);
  const tx = settle(net);
  assert.ok(tx.length <= 4);
});

check('a fully settled group needs no transactions', () => {
  const net = balances([{ payer: 'A', amount: 30, participants: ['A'] }]);
  assert.deepEqual(settle(net), []);
});

check('custom participants (not everyone) are respected', () => {
  const net = balances([{ payer: 'A', amount: 50, participants: ['A', 'B'] }]);
  assert.equal(net.A, 25);
  assert.equal(net.B, -25);
  assert.equal(net.C, undefined); // C wasn't involved
});

check('balances rejects bad amount and missing participants', () => {
  assert.throws(() => balances([{ payer: 'A', amount: -5, participants: ['A'] }]), /non-negative/);
  assert.throws(() => balances([{ payer: 'A', amount: 5, participants: [] }]), /participants/);
});

check('handling uneven split leaves cent-level residue but settles', () => {
  const net = balances([{ payer: 'A', amount: 100, participants: ['A', 'B', 'C'] }]);
  // 100/3 = 33.33; A = 100 - 33.33 = 66.67
  near(net.A, 66.67);
  near(net.B, -33.33);
  near(residual(net, settle(net)), 0);
});

console.log(`\n${n} checks passed.`);
