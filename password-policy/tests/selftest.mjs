import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { check } = globalThis.__t;

let n = 0;
const chk = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const okOf = (pw, policy, label) => check(pw, policy).rules.find(r => r.label.includes(label)).ok;

const FULL = { minLength: 8, upper: true, lower: true, digit: true, symbol: true, noSpaces: true };

chk('a strong password passes every rule', () => {
  const r = check('Ab1!xxxx', FULL);
  assert.equal(r.passed, true);
  assert.ok(r.rules.every(x => x.ok));
});

chk('missing character classes fail their rules', () => {
  assert.equal(okOf('ab1!xxxx', FULL, 'uppercase'), false);
  assert.equal(okOf('AB1!XXXX', FULL, 'lowercase'), false);
  assert.equal(okOf('Abc!xxxx', FULL, 'digit'), false);
  assert.equal(okOf('Abc1xxxx', FULL, 'symbol'), false);
});

chk('length rules', () => {
  assert.equal(okOf('Ab1!x', FULL, 'At least 8'), false);
  assert.equal(okOf('Ab1!xxxx', FULL, 'At least 8'), true);
  assert.equal(okOf('Ab1!xxxxxx', { maxLength: 8 }, 'At most 8'), false);
});

chk('no-spaces rule', () => {
  assert.equal(okOf('Ab 1!xxx', FULL, 'No spaces'), false);
  assert.equal(okOf('Ab1!xxxx', FULL, 'No spaces'), true);
});

chk('passed is the AND of all rules', () => {
  assert.equal(check('short', FULL).passed, false);
  assert.equal(check('Ab1!secret', FULL).passed, true);
});

chk('only selected rules are included', () => {
  const r = check('abc', { lower: true });
  assert.equal(r.rules.length, 1);
  assert.equal(r.passed, true);
});

chk('empty policy passes vacuously', () => {
  const r = check('whatever', {});
  assert.deepEqual(r.rules, []);
  assert.equal(r.passed, true);
});

chk('symbol includes unicode/punctuation, excludes alphanumerics', () => {
  assert.equal(okOf('abcDEF123', { symbol: true }, 'symbol'), false);
  assert.equal(okOf('abc_', { symbol: true }, 'symbol'), true);
  assert.equal(okOf('abc€', { symbol: true }, 'symbol'), true);
});

chk('maxLength 0 means no upper bound (rule omitted)', () => {
  const r = check('x'.repeat(200), { maxLength: 0, minLength: 1 });
  assert.ok(!r.rules.some(x => x.label.includes('At most')));
  assert.equal(r.passed, true);
});

chk('minLength 0 is satisfied by empty string', () => {
  assert.equal(okOf('', { minLength: 0 }, 'At least 0'), true);
});

console.log(`\n${n} checks passed.`);
