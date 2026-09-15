// Headless regression tests for MetaTags — OG/Twitter/SEO meta tag generation.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',
  appendChild(){},getAttribute(){return null;},setAttribute(){},removeAttribute(){},
  classList:{add(){},remove(){},toggle(){}},
  addEventListener(){},querySelectorAll(){return[];},querySelector(){return null;},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(), querySelector: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { escapeHtml, escapeAttr, metaTags } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('escapeHtml / escapeAttr', () => {
  assert.equal(escapeHtml('a & <b>'), 'a &amp; &lt;b&gt;');
  assert.equal(escapeAttr('say "hi" & <go>'), 'say &quot;hi&quot; &amp; &lt;go&gt;');
});

check('empty input -> empty output', () => {
  assert.equal(metaTags({}), '');
  assert.equal(metaTags({ type: 'article' }), ''); // type alone isn't "content"
});

check('title-only includes title, og:title, twitter:title, defaults', () => {
  const out = metaTags({ title: 'Hi' });
  assert.ok(out.includes('<title>Hi</title>'));
  assert.ok(out.includes('<meta property="og:title" content="Hi">'));
  assert.ok(out.includes('<meta name="twitter:title" content="Hi">'));
  assert.ok(out.includes('<meta property="og:type" content="website">'));
  assert.ok(out.includes('<meta name="twitter:card" content="summary_large_image">'));
});

check('HTML escaping in values', () => {
  const out = metaTags({ title: 'A & B "quoted"' });
  assert.ok(out.includes('<title>A &amp; B "quoted"</title>')); // title text: no quote-escaping needed
  assert.ok(out.includes('content="A &amp; B &quot;quoted&quot;"')); // attributes escape quotes
});

check('full document — exact output', () => {
  const out = metaTags({
    title: 'My Page', description: 'Desc', url: 'https://x.com',
    image: 'https://x.com/i.png', siteName: 'X', type: 'article', twitterCard: 'summary'
  });
  assert.equal(out, [
    '<title>My Page</title>',
    '<meta name="title" content="My Page">',
    '<meta name="description" content="Desc">',
    '<link rel="canonical" href="https://x.com">',
    '<meta property="og:type" content="article">',
    '<meta property="og:title" content="My Page">',
    '<meta property="og:description" content="Desc">',
    '<meta property="og:url" content="https://x.com">',
    '<meta property="og:image" content="https://x.com/i.png">',
    '<meta property="og:site_name" content="X">',
    '<meta name="twitter:card" content="summary">',
    '<meta name="twitter:title" content="My Page">',
    '<meta name="twitter:description" content="Desc">',
    '<meta name="twitter:image" content="https://x.com/i.png">'
  ].join('\n'));
});

check('twitter:site emitted only when provided', () => {
  assert.ok(!metaTags({ title: 'x' }).includes('twitter:site'));
  assert.ok(metaTags({ title: 'x', twitterSite: '@acme' }).includes('<meta name="twitter:site" content="@acme">'));
});

check('optional fields omitted when blank', () => {
  const out = metaTags({ title: 'x' });
  assert.ok(!out.includes('og:url'));
  assert.ok(!out.includes('og:image'));
  assert.ok(!out.includes('og:site_name'));
  assert.ok(!out.includes('name="description"'));
});

check('defaults: type=website, card=summary_large_image', () => {
  const out = metaTags({ description: 'd' });
  assert.ok(out.includes('content="website"'));
  assert.ok(out.includes('content="summary_large_image"'));
});

console.log(`\n${n} checks passed.`);
