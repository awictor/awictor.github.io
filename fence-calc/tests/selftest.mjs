import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sectionCount, postCount, railCount, picketCount } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('sectionCount ceils length / spacing', () => {
  assert.equal(sectionCount(100, 8), 13); // 12.5 -> 13
  assert.equal(sectionCount(96, 8), 12);  // exact
});

check('postCount is sections + 1 for a straight run', () => {
  assert.equal(postCount(96, 8), 13);
  assert.equal(postCount(100, 8), 14);
});

check('zero-length fence needs no posts', () => {
  assert.equal(sectionCount(0, 8), 0);
  assert.equal(postCount(0, 8), 0);
});

check('railCount = sections * rails per section', () => {
  assert.equal(railCount(13, 3), 39);
  assert.equal(railCount(12, 2), 24);
});

check('picketCount ceils run length / (picket + gap)', () => {
  // 100 ft = 1200 in, picket 5.5 + gap 0.5 = 6 in -> 200
  assert.equal(picketCount(100, 5.5, 0.5), 200);
});

check('no gap uses just the picket width', () => {
  assert.equal(picketCount(100, 5.5, 0), Math.ceil(1200 / 5.5));
});

check('closer post spacing needs more posts', () => {
  assert.ok(postCount(100, 6) > postCount(100, 10));
});

check('more rails per section means more rails', () => {
  assert.ok(railCount(13, 3) > railCount(13, 2));
});

check('a longer fence needs more of everything', () => {
  assert.ok(sectionCount(200, 8) > sectionCount(100, 8));
  assert.ok(picketCount(200, 6, 0) > picketCount(100, 6, 0));
});

check('validation', () => {
  assert.throws(() => sectionCount(100, 0), /spacing must be positive/);
  assert.throws(() => sectionCount(-1, 8), /non-negative/);
  assert.throws(() => picketCount(100, 0, 0), /width \+ gap must be positive/);
});

console.log(`\n${n} checks passed.`);
