// Headless regression tests for MdToc pure functions.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',checked:false,
  appendChild(){},getAttribute(){return null;},setAttribute(){},removeAttribute(){},
  addEventListener(){},querySelectorAll(){return[];}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { ghSlug, extractHeadings, buildToc, generateToc } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('ghSlug GitHub-style', () => {
  assert.equal(ghSlug('Hello World!'), 'hello-world');
  assert.equal(ghSlug('Getting Started'), 'getting-started');
  assert.equal(ghSlug('C++ Guide'), 'c-guide');
  assert.equal(ghSlug('  Trim  Me  '), 'trim-me');
  assert.equal(ghSlug('snake_case ok'), 'snake_case-ok');
});

check('extractHeadings levels, text, slugs', () => {
  const h = extractHeadings('# A\n## B\n### C');
  assert.deepEqual(h, [
    { level: 1, text: 'A', slug: 'a' },
    { level: 2, text: 'B', slug: 'b' },
    { level: 3, text: 'C', slug: 'c' }
  ]);
});

check('extractHeadings dedups repeated headings', () => {
  const h = extractHeadings('## Usage\n## Usage\n## Usage');
  assert.deepEqual(h.map(x => x.slug), ['usage', 'usage-1', 'usage-2']);
});

check('extractHeadings ignores headings inside code fences', () => {
  const h = extractHeadings('# Real\n```\n# fake\n## also fake\n```\n## After');
  assert.deepEqual(h.map(x => x.text), ['Real', 'After']);
});

check('extractHeadings strips trailing hashes and ignores non-headings', () => {
  const h = extractHeadings('# Title ##\nnot a heading\n#no-space');
  assert.deepEqual(h, [{ level: 1, text: 'Title', slug: 'title' }]);
});

check('buildToc nests by level (relative to min)', () => {
  const h = [{ level: 1, text: 'A', slug: 'a' }, { level: 2, text: 'B', slug: 'b' }];
  assert.equal(buildToc(h), '- [A](#a)\n  - [B](#b)');
});

check('buildToc ordered option', () => {
  const h = [{ level: 2, text: 'A', slug: 'a' }, { level: 3, text: 'B', slug: 'b' }];
  assert.equal(buildToc(h, { ordered: true }), '1. [A](#a)\n  1. [B](#b)');
});

check('generateToc end-to-end + empty', () => {
  assert.equal(generateToc('# Getting Started\n## Installation'),
    '- [Getting Started](#getting-started)\n  - [Installation](#installation)');
  assert.equal(generateToc('no headings here'), '');
});

console.log(`\n${n} checks passed.`);
