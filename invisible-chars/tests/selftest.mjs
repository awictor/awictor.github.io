import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { scan, clean, summarize, toHex } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

const ZWSP = '​', NBSP = ' ', BOM = '﻿', RLO = '‮', SHY = '­', EM = ' ';

check('plain ASCII is clean', () => {
  assert.equal(scan('hello world').length, 0);
  assert.equal(clean('hello world'), 'hello world');
});

check('detects a zero-width space at the right index', () => {
  const f = scan('a' + ZWSP + 'b');
  assert.equal(f.length, 1);
  assert.equal(f[0].index, 1);
  assert.equal(f[0].code, 0x200B);
  assert.equal(f[0].cat, 'zw');
  assert.match(f[0].name, /ZERO WIDTH SPACE/);
});

check('clean removes zero-width space', () => {
  assert.equal(clean('a' + ZWSP + 'b'), 'ab');
});

check('non-breaking space normalizes to a regular space', () => {
  assert.equal(clean('a' + NBSP + 'b'), 'a b');
  assert.equal(scan('a' + NBSP + 'b')[0].cat, 'sp');
});

check('exotic spaces (EM SPACE) normalize to regular space', () => {
  assert.equal(clean('a' + EM + 'b'), 'a b');
});

check('BOM and soft hyphen are stripped', () => {
  assert.equal(clean(BOM + 'hi'), 'hi');
  assert.equal(clean('soft' + SHY + 'hyphen'), 'softhyphen');
});

check('directional override is stripped and categorized', () => {
  assert.equal(clean('a' + RLO + 'b'), 'ab');
  assert.equal(scan('a' + RLO + 'b')[0].cat, 'dir');
});

check('summarize counts by category', () => {
  const s = summarize(scan('a' + ZWSP + 'b' + NBSP + 'c' + RLO + 'd'));
  assert.equal(s.total, 3);
  assert.equal(s.byCat.zw, 1);
  assert.equal(s.byCat.sp, 1);
  assert.equal(s.byCat.dir, 1);
});

check('clean is idempotent', () => {
  const x = 'x' + ZWSP + 'y' + NBSP + 'z' + BOM;
  assert.equal(clean(clean(x)), clean(x));
  assert.equal(scan(clean(x)).length, 0);
});

check('toHex formats padded code points', () => {
  assert.equal(toHex(0x200B), 'U+200B');
  assert.equal(toHex(0xA0), 'U+00A0');
  assert.equal(toHex(0xFEFF), 'U+FEFF');
});

console.log(`\n${n} checks passed.`);
