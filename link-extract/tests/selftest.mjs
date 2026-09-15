import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { extractMarkdownLinks, extractUrls, extractAll } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('extractUrls finds bare http/https URLs', () => {
  assert.deepEqual(extractUrls('go to https://a.com and http://b.org here'), ['https://a.com', 'http://b.org']);
});

check('extractUrls strips trailing punctuation', () => {
  assert.deepEqual(extractUrls('see https://a.com. also https://b.org, ok'), ['https://a.com', 'https://b.org']);
});

check('extractUrls keeps query strings and paths', () => {
  assert.deepEqual(extractUrls('http://x.com/p?a=1&b=2'), ['http://x.com/p?a=1&b=2']);
});

check('extractMarkdownLinks captures text and url', () => {
  assert.deepEqual(extractMarkdownLinks('[Home](https://x.com) and [Docs](https://x.com/docs)'), [
    { text: 'Home', url: 'https://x.com' },
    { text: 'Docs', url: 'https://x.com/docs' }
  ]);
});

check('markdown link with empty text', () => {
  assert.deepEqual(extractMarkdownLinks('[](https://x.com)'), [{ text: '', url: 'https://x.com' }]);
});

check('extractAll combines markdown and bare, deduping', () => {
  const all = extractAll('[Home](https://x.com) and bare https://y.com');
  assert.deepEqual(all, [
    { text: 'Home', url: 'https://x.com' },
    { text: 'https://y.com', url: 'https://y.com' }
  ]);
});

check('extractAll does not double-count a markdown URL as bare', () => {
  const all = extractAll('[Home](https://x.com)');
  assert.equal(all.length, 1);
  assert.equal(all[0].url, 'https://x.com');
});

check('extractAll dedups repeated bare URLs', () => {
  const all = extractAll('https://a.com then https://a.com again');
  assert.equal(all.filter(l => l.url === 'https://a.com').length, 1);
});

check('no links yields empty arrays', () => {
  assert.deepEqual(extractUrls('just some text, no links'), []);
  assert.deepEqual(extractMarkdownLinks('nothing here'), []);
  assert.deepEqual(extractAll('nothing'), []);
});

check('markdown url is not truncated at query parens-free content', () => {
  assert.deepEqual(extractMarkdownLinks('[q](https://x.com/p?a=1)'), [{ text: 'q', url: 'https://x.com/p?a=1' }]);
});

console.log(`\n${n} checks passed.`);
