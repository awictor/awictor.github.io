import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { globToRegexSource, globToRegExp, match } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('single star stays within a path segment', () => {
  assert.equal(match('*.js', 'app.js'), true);
  assert.equal(match('*.js', 'app.ts'), false);
  assert.equal(match('*.js', 'src/app.js'), false); // * does not cross /
});

check('question mark matches exactly one non-slash char', () => {
  assert.equal(match('a?c', 'abc'), true);
  assert.equal(match('a?c', 'ac'), false);
  assert.equal(match('a?c', 'abbc'), false);
  assert.equal(match('a?c', 'a/c'), false);
});

check('globstar crosses path separators', () => {
  assert.equal(match('**/*.js', 'a/b/c.js'), true);
  assert.equal(match('**/*.js', 'c.js'), true);
  assert.equal(match('src/**/*.ts', 'src/util/date.ts'), true);
  assert.equal(match('src/**/*.ts', 'src/date.ts'), true);
});

check('character classes, ranges and negation', () => {
  assert.equal(match('[abc].txt', 'a.txt'), true);
  assert.equal(match('[abc].txt', 'd.txt'), false);
  assert.equal(match('img[0-9].png', 'img7.png'), true);
  assert.equal(match('[!0-9]', 'a'), true);
  assert.equal(match('[!0-9]', '5'), false);
});

check('brace alternation', () => {
  assert.equal(match('*.{jpg,png}', 'a.jpg'), true);
  assert.equal(match('*.{jpg,png}', 'a.png'), true);
  assert.equal(match('*.{jpg,png}', 'a.gif'), false);
});

check('literal dot must match a dot', () => {
  assert.equal(match('*.txt', 'a.txt'), true);
  assert.equal(match('*.txt', 'atxt'), false);
});

check('regex metacharacters are escaped as literals', () => {
  assert.equal(match('a+b', 'a+b'), true);
  assert.equal(match('a+b', 'aaab'), false);
  assert.equal(match('price(1)', 'price(1)'), true);
});

check('backslash escapes a glob metacharacter', () => {
  assert.equal(match('a\\*b', 'a*b'), true);   // literal star
  assert.equal(match('a\\*b', 'axb'), false);
});

check('source is anchored front and back', () => {
  const src = globToRegexSource('*.js');
  assert.ok(src.startsWith('^'));
  assert.ok(src.endsWith('$'));
  assert.equal(match('*.js', 'xapp.jsy'), false); // no partial match
});

check('case-insensitive flag', () => {
  assert.equal(match('*.JS', 'app.js'), false);
  assert.equal(match('*.JS', 'app.js', 'i'), true);
  assert.equal(globToRegExp('*.js', 'i').flags, 'i');
});

console.log(`\n${n} checks passed.`);
