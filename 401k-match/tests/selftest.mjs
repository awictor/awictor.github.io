import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { match, DEFERRAL_LIMIT_2025 } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('classic 50% up to 6%, contributing 6%', () => {
  const r = match({ salary: 100000, contribPct: 6, matchRate: 50, matchCapPct: 6 });
  near(r.yourContribution, 6000, 1e-9);
  near(r.employerMatch, 3000, 1e-9);   // 100k × 6% × 50%
  near(r.total, 9000, 1e-9);
  near(r.leftOnTable, 0, 1e-9);
});

check('under-contributing leaves match on the table', () => {
  const r = match({ salary: 100000, contribPct: 3, matchRate: 50, matchCapPct: 6 });
  near(r.employerMatch, 1500, 1e-9);   // matched only on 3%
  near(r.leftOnTable, 1500, 1e-9);     // missing 3% × 50%
});

check('over-contributing caps the match at the cap%', () => {
  const r = match({ salary: 100000, contribPct: 10, matchRate: 50, matchCapPct: 6 });
  near(r.yourContribution, 10000, 1e-9);
  near(r.employerMatch, 3000, 1e-9);   // capped at 6%
  near(r.leftOnTable, 0, 1e-9);
});

check('dollar-for-dollar match (100%)', () => {
  const r = match({ salary: 90000, contribPct: 4, matchRate: 100, matchCapPct: 4 });
  near(r.employerMatch, 3600, 1e-9);   // 90k × 4% × 100%
  near(r.employerMatch, r.yourContribution, 1e-9);
});

check('no employer match', () => {
  const r = match({ salary: 100000, contribPct: 6, matchRate: 0, matchCapPct: 6 });
  near(r.employerMatch, 0, 1e-9);
  near(r.total, 6000, 1e-9);
});

check('total = your contribution + employer match', () => {
  const r = match({ salary: 75000, contribPct: 5, matchRate: 50, matchCapPct: 6 });
  near(r.total, r.yourContribution + r.employerMatch, 1e-9);
});

check('employer match scales with salary', () => {
  const a = match({ salary: 50000, contribPct: 6, matchRate: 50, matchCapPct: 6 });
  const b = match({ salary: 100000, contribPct: 6, matchRate: 50, matchCapPct: 6 });
  near(b.employerMatch, 2 * a.employerMatch, 1e-9);
});

check('effective percent of salary', () => {
  const r = match({ salary: 100000, contribPct: 6, matchRate: 50, matchCapPct: 6 });
  near(r.effectivePct, 9, 1e-9);   // 9000 / 100000
});

check('fullMatchPct equals the cap', () => {
  assert.equal(match({ salary: 100000, contribPct: 2, matchRate: 50, matchCapPct: 5 }).fullMatchPct, 5);
  assert.equal(DEFERRAL_LIMIT_2025, 23500);
});

check('validation', () => {
  assert.throws(() => match({ salary: 'x', contribPct: 6, matchRate: 50, matchCapPct: 6 }), /numbers/);
  assert.throws(() => match({ salary: -1, contribPct: 6, matchRate: 50, matchCapPct: 6 }), /non-negative/);
});

console.log(`\n${n} checks passed.`);
