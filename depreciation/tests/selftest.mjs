import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { validate, straightLine, decliningBalance, sumOfYears, schedule } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-6, `${a} != ${b}`);
const deps = rows => rows.map(r => r.depreciation);
const sum = a => a.reduce((s, x) => s + x, 0);

check('straight-line: equal annual amounts', () => {
  const s = straightLine(10000, 1000, 5);
  assert.equal(s.length, 5);
  s.forEach(r => near(r.depreciation, 1800));
});

check('straight-line: book ends at salvage, accumulated equals base', () => {
  const s = straightLine(10000, 1000, 5);
  near(s[4].book, 1000);
  near(s[4].accumulated, 9000);
});

check('double-declining: 40% of remaining book each year', () => {
  const d = decliningBalance(10000, 1000, 5, 2);
  near(d[0].depreciation, 4000);
  near(d[1].depreciation, 2400);
  near(d[2].depreciation, 1440);
});

check('double-declining: final year is capped at the salvage floor', () => {
  const d = decliningBalance(10000, 1000, 5, 2);
  near(d[4].book, 1000);
  near(d[4].depreciation, 296); // capped, not 1296*0.4
  near(sum(deps(d)), 9000);
});

check('sum-of-years-digits schedule', () => {
  const s = sumOfYears(10000, 1000, 5);
  assert.deepEqual(deps(s).map(x => Math.round(x)), [3000, 2400, 1800, 1200, 600]);
});

check('sum-of-years-digits totals the depreciable base and ends at salvage', () => {
  const s = sumOfYears(10000, 1000, 5);
  near(sum(deps(s)), 9000);
  near(s[4].book, 1000);
});

check('all three methods depreciate the same total base', () => {
  const base = 25000 - 2500;
  for (const rows of [straightLine(25000, 2500, 8), decliningBalance(25000, 2500, 8, 2), sumOfYears(25000, 2500, 8)]) {
    near(sum(deps(rows)), base);
    near(rows[rows.length - 1].book, 2500);
  }
});

check('accumulated is the running sum and book = cost - accumulated', () => {
  const s = straightLine(5000, 500, 4);
  let acc = 0;
  s.forEach(r => { acc += r.depreciation; near(r.accumulated, acc); near(r.book, 5000 - r.accumulated); });
});

check('schedule dispatches by method name', () => {
  assert.deepEqual(schedule('sl', 10000, 1000, 5), straightLine(10000, 1000, 5));
  assert.deepEqual(schedule('ddb', 10000, 1000, 5), decliningBalance(10000, 1000, 5, 2));
  assert.deepEqual(schedule('syd', 10000, 1000, 5), sumOfYears(10000, 1000, 5));
});

check('validation rejects bad inputs', () => {
  assert.throws(() => validate(1000, 100, 0), /life must be/);
  assert.throws(() => validate(1000, 100, 2.5), /life must be/);
  assert.throws(() => validate(1000, -1, 5), /salvage cannot be negative/);
  assert.throws(() => validate(100, 500, 5), /at least the salvage/);
  assert.throws(() => schedule('nope', 1000, 100, 5), /unknown method/);
});

console.log(`\n${n} checks passed.`);
