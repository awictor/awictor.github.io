import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parse, compare, bump, format, sortVersions } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parse strips leading v and splits core', () => {
  assert.deepEqual(parse('v1.2.3'), { major: 1, minor: 2, patch: 3, prerelease: [], build: [] });
});

check('parse captures prerelease and build metadata', () => {
  const p = parse('1.2.3-alpha.1+build.9');
  assert.deepEqual(p.prerelease, ['alpha', '1']);
  assert.deepEqual(p.build, ['build', '9']);
});

check('parse rejects malformed and leading-zero versions', () => {
  assert.throws(() => parse('1.2'), /invalid semver/);
  assert.throws(() => parse('1.2.x'), /invalid semver/);
  assert.throws(() => parse('1.02.3'), /leading zeros/);
  assert.throws(() => parse('1.2.3-01'), /leading zeros in prerelease/);
});

check('compare orders by major/minor/patch', () => {
  assert.equal(compare('1.0.0', '2.0.0'), -1);
  assert.equal(compare('1.2.0', '1.1.9'), 1);
  assert.equal(compare('1.2.3', '1.2.3'), 0);
});

check('release outranks prerelease', () => {
  assert.equal(compare('1.0.0-alpha', '1.0.0'), -1);
  assert.equal(compare('1.0.0', '1.0.0-rc.1'), 1);
});

check('prerelease precedence: numeric < alphanumeric, fewer < more fields', () => {
  assert.equal(compare('1.0.0-alpha', '1.0.0-alpha.1'), -1);
  assert.equal(compare('1.0.0-alpha.1', '1.0.0-alpha.beta'), -1);
  assert.equal(compare('1.0.0-rc.1', '1.0.0-rc.2'), -1);
  assert.equal(compare('1.0.0-beta.2', '1.0.0-beta.11'), -1); // numeric, not lexical
});

check('build metadata is ignored in precedence', () => {
  assert.equal(compare('1.0.0+a', '1.0.0+b'), 0);
  assert.equal(compare('1.0.0-x+1', '1.0.0-x+2'), 0);
});

check('canonical spec ordering sorts correctly', () => {
  const chain = ['1.0.0', '1.0.0-rc.1', '1.0.0-beta.11', '1.0.0-beta.2', '1.0.0-beta', '1.0.0-alpha.beta', '1.0.0-alpha.1', '1.0.0-alpha'];
  const expected = ['1.0.0-alpha', '1.0.0-alpha.1', '1.0.0-alpha.beta', '1.0.0-beta', '1.0.0-beta.2', '1.0.0-beta.11', '1.0.0-rc.1', '1.0.0'];
  assert.deepEqual(sortVersions(chain), expected);
});

check('bump major/minor/patch resets lower fields', () => {
  assert.equal(bump('1.2.3', 'major'), '2.0.0');
  assert.equal(bump('1.2.3', 'minor'), '1.3.0');
  assert.equal(bump('1.2.3', 'patch'), '1.2.4');
});

check('bump prerelease increments or starts prerelease', () => {
  assert.equal(bump('1.2.3', 'prerelease'), '1.2.4-0');
  assert.equal(bump('1.2.3-alpha.1', 'prerelease'), '1.2.3-alpha.2');
  assert.equal(bump('1.2.3-alpha', 'prerelease'), '1.2.3-alpha.0');
});

check('format round-trips a parsed version', () => {
  assert.equal(format(parse('1.2.3-alpha.1+build.9')), '1.2.3-alpha.1+build.9');
  assert.equal(format(parse('v10.20.30')), '10.20.30');
});

console.log(`\n${n} checks passed.`);
