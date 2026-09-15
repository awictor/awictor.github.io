import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { escapeJson, escapeHtml, escapeUrl, escapeRegex, escapeShell, escapeFor } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('escapeJson escapes quotes, backslashes and newlines', () => {
  assert.equal(escapeJson('he said "hi"\n'), 'he said \\"hi\\"\\n');
  assert.equal(escapeJson('a\\b'), 'a\\\\b');
  assert.equal(escapeJson('tab\there'), 'tab\\there');
});

check('escapeHtml encodes the five entities', () => {
  assert.equal(escapeHtml('<a href="x">&'), '&lt;a href=&quot;x&quot;&gt;&amp;');
  assert.equal(escapeHtml("it's"), 'it&#39;s');
});

check('escapeUrl percent-encodes', () => {
  assert.equal(escapeUrl('a b&c'), 'a%20b%26c');
  assert.equal(escapeUrl('café'), 'caf%C3%A9');
});

check('escapeRegex escapes metacharacters', () => {
  assert.equal(escapeRegex('a.b*c'), 'a\\.b\\*c');
  assert.equal(escapeRegex('(x)[y]{z}'), '\\(x\\)\\[y\\]\\{z\\}');
  assert.equal(escapeRegex('1+1=2'), '1\\+1=2');
});

check('escapeRegex output actually matches literally', () => {
  const lit = 'a.b+c';
  const re = new RegExp('^' + escapeRegex(lit) + '$');
  assert.ok(re.test(lit));
  assert.ok(!re.test('axbxc'));
});

check('escapeShell single-quotes safely', () => {
  assert.equal(escapeShell('hello'), "'hello'");
  assert.equal(escapeShell("it's"), "'it'\\''s'");
});

check('escapeFor dispatches to the right escaper', () => {
  assert.equal(escapeFor('a b', 'url'), 'a%20b');
  assert.equal(escapeFor('<b>', 'html'), '&lt;b&gt;');
  assert.equal(escapeFor('a.b', 'regex'), 'a\\.b');
  assert.equal(escapeFor('x', 'shell'), "'x'");
});

check('js target aliases json', () => {
  assert.equal(escapeFor('"q"', 'js'), escapeFor('"q"', 'json'));
});

check('escapeFor throws on unknown target', () => {
  assert.throws(() => escapeFor('x', 'yaml'), /unknown target/);
});

check('non-string inputs are coerced', () => {
  assert.equal(escapeJson(123), '123');
  assert.equal(escapeHtml(true), 'true');
});

console.log(`\n${n} checks passed.`);
