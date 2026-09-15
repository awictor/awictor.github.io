import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { clean, isbn10CheckDigit, isbn13CheckDigit, isValidISBN10, isValidISBN13, toISBN13, toISBN10, inspect } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('clean strips hyphens/spaces and uppercases X', () => {
  assert.equal(clean('0-306-40615-2'), '0306406152');
  assert.equal(clean('0 8044 2957 x'), '080442957X');
});

check('ISBN-10 check digit (Wikipedia vector)', () => {
  assert.equal(isbn10CheckDigit('030640615'), '2');
});

check('ISBN-10 check digit can be X (value ten)', () => {
  assert.equal(isbn10CheckDigit('080442957'), 'X');
});

check('ISBN-13 check digit (Wikipedia vector)', () => {
  assert.equal(isbn13CheckDigit('978030640615'), '7');
});

check('validation of known-good codes', () => {
  assert.equal(isValidISBN10('0-306-40615-2'), true);
  assert.equal(isValidISBN10('0-8044-2957-X'), true);
  assert.equal(isValidISBN13('978-0-306-40615-7'), true);
});

check('a wrong check digit is rejected', () => {
  assert.equal(isValidISBN10('0306406153'), false);
  assert.equal(isValidISBN13('9780306406158'), false);
  assert.equal(isValidISBN10('123'), false);
});

check('ISBN-10 -> ISBN-13', () => {
  assert.equal(toISBN13('0-306-40615-2'), '9780306406157');
});

check('ISBN-13 -> ISBN-10 (978-prefixed)', () => {
  assert.equal(toISBN10('978-0-306-40615-7'), '0306406152');
});

check('conversions round-trip', () => {
  for (const t of ['0306406152', '080442957X']) {
    assert.equal(toISBN10(toISBN13(t)), t);
  }
});

check('inspect reports type, validity, and both forms; invalid inputs throw on convert', () => {
  const r = inspect('0-306-40615-2');
  assert.equal(r.type, 'ISBN-10');
  assert.equal(r.valid, true);
  assert.equal(r.isbn13, '9780306406157');
  assert.equal(inspect('xyz').type, 'unknown');
  assert.throws(() => toISBN13('0306406153'), /not a valid ISBN-10/);
  // a valid 979-prefixed ISBN-13 has no ISBN-10 form
  assert.throws(() => toISBN10('9790000000001'), /only 978-prefixed/);
});

console.log(`\n${n} checks passed.`);
