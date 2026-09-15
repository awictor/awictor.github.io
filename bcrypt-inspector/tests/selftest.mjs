import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isBcrypt, parseBcrypt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

const SALT = 'N9qo8uLOickgx2ZMRZoMye';                  // 22 chars
const HASH = 'IjZAgcfl7p92ldGxad68LJZdL17lhWy';         // 31 chars
const EXAMPLE = '$2a$10$' + SALT + HASH;

check('parses a known bcrypt hash', () => {
  const p = parseBcrypt(EXAMPLE);
  assert.equal(p.algorithm, 'bcrypt');
  assert.equal(p.variant, '2a');
  assert.equal(p.cost, 10);
  assert.equal(p.salt, SALT);
  assert.equal(p.hash, HASH);
});

check('salt is 22 chars, hash is 31 chars', () => {
  const p = parseBcrypt(EXAMPLE);
  assert.equal(p.salt.length, 22);
  assert.equal(p.hash.length, 31);
});

check('work factor is 2^cost', () => {
  assert.equal(parseBcrypt('$2b$12$' + SALT + HASH).rounds, 4096);
  assert.equal(parseBcrypt('$2b$10$' + SALT + HASH).rounds, 1024);
  assert.equal(parseBcrypt('$2b$04$' + SALT + HASH).rounds, 16);
});

check('all variants parse', () => {
  ['2a', '2b', '2x', '2y'].forEach(v => {
    assert.equal(parseBcrypt('$' + v + '$10$' + SALT + HASH).variant, v);
  });
});

check('isBcrypt true for valid, false for junk', () => {
  assert.ok(isBcrypt(EXAMPLE));
  assert.ok(!isBcrypt('hello'));
  assert.ok(!isBcrypt('$1$abc$def'));    // md5crypt, not bcrypt
});

check('leading/trailing whitespace tolerated', () => {
  assert.equal(parseBcrypt('  ' + EXAMPLE + '  ').cost, 10);
});

check('wrong prefix throws', () => {
  assert.throws(() => parseBcrypt('$5$' + SALT + HASH), /bcrypt/);
});

check('wrong salt length throws', () => {
  assert.throws(() => parseBcrypt('$2a$10$short' + HASH), /bcrypt/);
});

check('cost is always two digits', () => {
  assert.equal(parseBcrypt('$2b$08$' + SALT + HASH).cost, 8);
  assert.throws(() => parseBcrypt('$2b$8$' + SALT + HASH), /bcrypt/);   // single digit invalid
});

check('higher cost → more rounds', () => {
  assert.ok(parseBcrypt('$2b$14$' + SALT + HASH).rounds > parseBcrypt('$2b$12$' + SALT + HASH).rounds);
});

console.log(`\n${n} checks passed.`);
