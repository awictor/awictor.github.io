import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ordinalSuffix, ordinal, parseOrdinal, isOrdinal } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('single-digit suffixes', () => {
  assert.equal(ordinal(1), '1st');
  assert.equal(ordinal(2), '2nd');
  assert.equal(ordinal(3), '3rd');
  assert.equal(ordinal(4), '4th');
  assert.equal(ordinal(0), '0th');
});

check('the teens 11, 12, 13 always take th', () => {
  assert.equal(ordinal(11), '11th');
  assert.equal(ordinal(12), '12th');
  assert.equal(ordinal(13), '13th');
});

check('21/22/23 take st/nd/rd again', () => {
  assert.equal(ordinal(21), '21st');
  assert.equal(ordinal(22), '22nd');
  assert.equal(ordinal(23), '23rd');
});

check('hundreds ending in teens still take th', () => {
  assert.equal(ordinal(111), '111th');
  assert.equal(ordinal(112), '112th');
  assert.equal(ordinal(113), '113th');
  assert.equal(ordinal(101), '101st');
  assert.equal(ordinal(102), '102nd');
});

check('ordinalSuffix directly', () => {
  assert.equal(ordinalSuffix(1), 'st');
  assert.equal(ordinalSuffix(11), 'th');
  assert.equal(ordinalSuffix(103), 'rd');
  assert.equal(ordinalSuffix(100), 'th');
});

check('parseOrdinal recovers the number', () => {
  assert.equal(parseOrdinal('1st'), 1);
  assert.equal(parseOrdinal('23rd'), 23);
  assert.equal(parseOrdinal('113th'), 113);
  assert.equal(parseOrdinal(' 42ND '), 42); // trimmed, case-insensitive
});

check('parse and format round-trip for many values', () => {
  for (let i = 0; i <= 1000; i++) assert.equal(parseOrdinal(ordinal(i)), i);
});

check('isOrdinal recognizes valid and rejects invalid', () => {
  assert.equal(isOrdinal('21st'), true);
  assert.equal(isOrdinal('11th'), true);
  assert.equal(isOrdinal('21th'), false); // wrong suffix
  assert.equal(isOrdinal('hello'), false);
});

check('parseOrdinal rejects a wrong suffix with a helpful message', () => {
  assert.throws(() => parseOrdinal('2th'), /should be 2nd/);
  assert.throws(() => parseOrdinal('11st'), /should be 11th/);
});

check('validation: negatives, non-integers, and junk throw', () => {
  assert.throws(() => ordinal(-1), /non-negative whole number/);
  assert.throws(() => ordinal(2.5), /non-negative whole number/);
  assert.throws(() => parseOrdinal('abc'), /not an ordinal/);
  assert.throws(() => parseOrdinal(21), /must be a string/);
});

console.log(`\n${n} checks passed.`);
