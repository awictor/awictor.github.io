import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { escapeHtml, boldWord, bionic, wordCount } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('boldWord bolds the ceil(ratio) leading letters', () => {
  assert.equal(boldWord('hello', 0.5), '<b>hel</b>lo');   // ceil(2.5)=3
  assert.equal(boldWord('reading', 0.4), '<b>rea</b>ding'); // ceil(2.8)=3
  assert.equal(boldWord('a', 0.5), '<b>a</b>');            // min 1
});

check('bionic bolds each word and keeps spacing', () => {
  assert.equal(bionic('hi there', 0.5), '<b>h</b>i <b>the</b>re');
});

check('bionic escapes HTML in the gaps, not inside words', () => {
  assert.equal(bionic('a<b', 0.5), '<b>a</b>&lt;<b>b</b>');
  assert.equal(bionic('x & y', 1), '<b>x</b> &amp; <b>y</b>');
});

check('bionic does not create bold tags inside entities', () => {
  const out = bionic('Tom & Jerry', 0.5);
  assert.ok(out.includes('&amp;'));
  assert.ok(!/&<b>amp<\/b>;/.test(out)); // the "amp" of &amp; must not be bolded
});

check('ratio of 1 bolds the whole word', () => {
  assert.equal(bionic('cat', 1), '<b>cat</b>');
});

check('numbers count as words and get bolded', () => {
  assert.equal(bionic('year 2026', 0.5), '<b>ye</b>ar <b>20</b>26');
});

check('bionic rejects out-of-range ratios', () => {
  assert.throws(() => bionic('x', 0), /between 0 and 1/);
  assert.throws(() => bionic('x', 1.5), /between 0 and 1/);
  assert.throws(() => bionic('x', -0.2), /between 0 and 1/);
});

check('wordCount counts alphanumeric runs', () => {
  assert.equal(wordCount('one two three'), 3);
  assert.equal(wordCount('a1 b2, c3!'), 3);
  assert.equal(wordCount(''), 0);
  assert.equal(wordCount('   '), 0);
});

check('punctuation and newlines are preserved verbatim (escaped)', () => {
  assert.equal(bionic('Hi, world!', 0.5), '<b>H</b>i, <b>wor</b>ld!');
  assert.equal(bionic('a\nb', 1), '<b>a</b>\n<b>b</b>');
});

check('escapeHtml handles the three special characters', () => {
  assert.equal(escapeHtml('<a> & </a>'), '&lt;a&gt; &amp; &lt;/a&gt;');
});

console.log(`\n${n} checks passed.`);
