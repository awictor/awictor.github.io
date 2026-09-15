import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { wip, throughput, leadTime, mm1Utilization, mm1SystemSize, mm1WaitTime } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check("Little's Law — WIP = throughput × lead time", () => {
  assert.equal(wip(5, 4), 20);
  assert.equal(wip(10, 2.5), 25);
});

check("throughput = WIP / lead time", () => {
  assert.equal(throughput(20, 4), 5);
  assert.equal(throughput(100, 25), 4);
});

check("lead time = WIP / throughput", () => {
  assert.equal(leadTime(20, 5), 4);
  assert.equal(leadTime(90, 6), 15);
});

check("the three solvers are internally consistent", () => {
  const L = 42, lam = 7;
  const W = leadTime(L, lam);
  near(wip(lam, W), L);
  near(throughput(L, W), lam);
});

check("halving WIP halves lead time at constant throughput", () => {
  const W1 = leadTime(20, 5);
  const W2 = leadTime(10, 5);
  near(W2, W1 / 2);
});

check("M/M/1 utilization ρ = λ/μ", () => {
  near(mm1Utilization(4, 5), 0.8);
  near(mm1Utilization(1, 10), 0.1);
});

check("M/M/1 expected system size L = ρ/(1−ρ)", () => {
  near(mm1SystemSize(4, 5), 0.8 / 0.2); // 4
  near(mm1SystemSize(1, 2), 1);
});

check("M/M/1 wait time W = 1/(μ−λ), consistent with Little's Law", () => {
  const lam = 4, mu = 5;
  const W = mm1WaitTime(lam, mu); // 1
  const L = mm1SystemSize(lam, mu); // 4
  near(W, 1);
  near(L, lam * W); // Little's Law inside M/M/1
});

check("M/M/1 explodes near saturation", () => {
  assert.ok(mm1SystemSize(0.99, 1) > 90);
  assert.ok(mm1WaitTime(0.99, 1) > 90);
});

check("validation: bad inputs and unstable queues throw", () => {
  assert.throws(() => wip(0, 4), /positive/);
  assert.throws(() => throughput(20, -1), /positive/);
  assert.throws(() => leadTime(20, 0), /positive/);
  assert.throws(() => mm1SystemSize(5, 5), /unstable/);
  assert.throws(() => mm1WaitTime(6, 5), /unstable/);
});

console.log(`\n${n} checks passed.`);
