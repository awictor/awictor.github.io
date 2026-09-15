import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { decode, fmt, htmlToMd } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('headings become # prefixes', () => {
  assert.equal(htmlToMd('<h1>Title</h1>'), '# Title');
  assert.equal(htmlToMd('<h3>Sub</h3>'), '### Sub');
});

check('bold and italic', () => {
  assert.equal(htmlToMd('<strong>x</strong>'), '**x**');
  assert.equal(htmlToMd('<em>y</em>'), '*y*');
  assert.equal(htmlToMd('<b>a</b> and <i>b</i>'), '**a** and *b*');
});

check('paragraph with inline formatting', () => {
  assert.equal(htmlToMd('<p>Hello <strong>world</strong></p>'), 'Hello **world**');
});

check('links', () => {
  assert.equal(htmlToMd('<p>See <a href="https://x.com">link</a>.</p>'), 'See [link](https://x.com).');
});

check('inline code', () => {
  assert.equal(htmlToMd('<code>x = 1</code>'), '`x = 1`');
});

check('unordered and ordered lists', () => {
  assert.equal(htmlToMd('<ul><li>a</li><li>b</li></ul>'), '- a\n- b');
  assert.equal(htmlToMd('<ol><li>a</li><li>b</li></ol>'), '1. a\n2. b');
});

check('code block via pre/code', () => {
  assert.equal(htmlToMd('<pre><code>let x = 1</code></pre>'), '```\nlet x = 1\n```');
});

check('blockquote and hr', () => {
  assert.equal(htmlToMd('<blockquote>A quote</blockquote>'), '> A quote');
  assert.equal(htmlToMd('<hr>'), '---');
});

check('entities are decoded', () => {
  assert.equal(htmlToMd('<p>a &amp; b &lt;c&gt;</p>'), 'a & b <c>');
  assert.equal(decode('&quot;hi&quot; &#39;yo&#39;'), '"hi" \'yo\'');
});

check('br becomes a newline; multiple blocks separate', () => {
  assert.equal(htmlToMd('<p>a<br>b</p>'), 'a\nb');
  assert.equal(htmlToMd('<h1>T</h1><p>body</p>'), '# T\n\nbody');
});

console.log(`\n${n} checks passed.`);
