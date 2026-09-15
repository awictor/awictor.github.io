import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parse, compare, cmpIds, diff, sort, satisfies } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parse splits core, prerelease, build', () => {
  const p = parse('v1.2.3-beta.1+build.5');
  assert.equal(p.major, 1); assert.equal(p.minor, 2); assert.equal(p.patch, 3);
  assert.deepEqual(p.prerelease, ['beta', '1']);
  assert.equal(p.build, 'build.5');
  assert.deepEqual(parse('0.0.0').prerelease, []);
});

check('parse rejects garbage', () => {
  assert.throws(() => parse('1.2'), /invalid version/);
  assert.throws(() => parse('x.y.z'), /invalid version/);
});

check('compare orders core numerically (not lexically)', () => {
  assert.equal(compare('1.2.3', '1.10.0'), -1); // 2 < 10 numeric
  assert.equal(compare('2.0.0', '1.9.9'), 1);
  assert.equal(compare('1.2.3', '1.2.3'), 0);
});

check('compare honors prerelease precedence', () => {
  assert.equal(compare('1.0.0-alpha', '1.0.0'), -1);      // prerelease < release
  assert.equal(compare('1.0.0-alpha', '1.0.0-beta'), -1);
  assert.equal(compare('1.0.0-alpha.1', '1.0.0-alpha.2'), -1);
  assert.equal(compare('1.0.0-1', '1.0.0-alpha'), -1);    // numeric < alphanumeric
  assert.equal(compare('1.0.0-alpha.1', '1.0.0-alpha'), 1); // longer set wins when equal prefix
});

check('cmpIds building block', () => {
  assert.equal(cmpIds([], []), 0);
  assert.equal(cmpIds([], ['x']), 1);
  assert.equal(cmpIds(['1'], ['2']), -1);
});

check('satisfies: caret allows minor/patch, blocks major', () => {
  assert.equal(satisfies('1.4.0', '^1.2.0'), true);
  assert.equal(satisfies('1.2.0', '^1.2.0'), true);
  assert.equal(satisfies('2.0.0', '^1.2.0'), false);
  assert.equal(satisfies('1.1.9', '^1.2.0'), false);
  assert.equal(satisfies('0.2.9', '^0.2.3'), true);  // 0.x: locked to minor
  assert.equal(satisfies('0.3.0', '^0.2.3'), false);
});

check('satisfies: tilde allows patch, blocks minor', () => {
  assert.equal(satisfies('1.2.9', '~1.2.3'), true);
  assert.equal(satisfies('1.3.0', '~1.2.3'), false);
  assert.equal(satisfies('1.2.0', '~1.2'), true);
});

check('satisfies: comparators AND-combined', () => {
  assert.equal(satisfies('1.5.0', '>=1.0.0 <2.0.0'), true);
  assert.equal(satisfies('2.0.0', '>=1.0.0 <2.0.0'), false);
  assert.equal(satisfies('1.0.0', '>1.0.0'), false);
});

check('satisfies: OR unions and x-ranges and star', () => {
  assert.equal(satisfies('3.1.0', '^1.0.0 || ^3.0.0'), true);
  assert.equal(satisfies('2.5.0', '^1.0.0 || ^3.0.0'), false);
  assert.equal(satisfies('1.2.9', '1.2.x'), true);
  assert.equal(satisfies('1.3.0', '1.2.x'), false);
  assert.equal(satisfies('9.9.9', '1.x'), false);
  assert.equal(satisfies('9.9.9', '*'), true);
});

check('diff level and sort ordering', () => {
  assert.equal(diff('1.0.0', '2.0.0'), 'major');
  assert.equal(diff('1.0.0', '1.1.0'), 'minor');
  assert.equal(diff('1.0.0', '1.0.1'), 'patch');
  assert.equal(diff('1.0.0-a', '1.0.0-b'), 'prerelease');
  assert.equal(diff('1.0.0', '1.0.0'), '');
  assert.deepEqual(
    sort(['2.0.0', '1.0.0-rc.1', '1.0.0', '1.0.0-alpha', '1.2.0']),
    ['1.0.0-alpha', '1.0.0-rc.1', '1.0.0', '1.2.0', '2.0.0']
  );
});

console.log(`\n${n} checks passed.`);
