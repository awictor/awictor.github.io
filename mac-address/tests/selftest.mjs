import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { normalize, format, isValid, info } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('normalize strips separators and uppercases', () => {
  assert.equal(normalize('a1:b2:c3:d4:e5:f6'), 'A1B2C3D4E5F6');
  assert.equal(normalize('a1-b2-c3-d4-e5-f6'), 'A1B2C3D4E5F6');
  assert.equal(normalize('a1b2.c3d4.e5f6'), 'A1B2C3D4E5F6');
  assert.equal(normalize('A1B2C3D4E5F6'), 'A1B2C3D4E5F6');
});

check('normalize rejects wrong length / bad chars', () => {
  assert.throws(() => normalize('a1:b2:c3'), /12 hex digits/);
  assert.throws(() => normalize('zzzzzzzzzzzz'), /12 hex digits/);
  assert.throws(() => normalize('a1b2c3d4e5f6a'), /12 hex digits/);
});

check('format: colon', () => {
  assert.equal(format('a1b2c3d4e5f6', 'colon'), 'A1:B2:C3:D4:E5:F6');
});

check('format: hyphen', () => {
  assert.equal(format('a1b2c3d4e5f6', 'hyphen'), 'A1-B2-C3-D4-E5-F6');
});

check('format: Cisco dot (three groups of four)', () => {
  assert.equal(format('001122334455', 'dot'), '0011.2233.4455');
});

check('format: bare', () => {
  assert.equal(format('a1:b2:c3:d4:e5:f6', 'bare'), 'A1B2C3D4E5F6');
});

check('format rejects unknown style', () => {
  assert.throws(() => format('a1b2c3d4e5f6', 'space'), /unknown style/);
});

check('isValid', () => {
  assert.ok(isValid('a1:b2:c3:d4:e5:f6'));
  assert.ok(!isValid('nope'));
  assert.ok(!isValid('a1:b2'));
});

check('info: unicast/multicast from bit 0', () => {
  assert.equal(info('00:11:22:33:44:55').multicast, false); // 0x00
  assert.equal(info('01:00:5e:00:00:01').multicast, true);  // 0x01 IPv4 multicast
  assert.equal(info('ff:ff:ff:ff:ff:ff').multicast, true);  // broadcast
});

check('info: locally administered from bit 1, plus OUI', () => {
  assert.equal(info('02:00:00:00:00:00').locallyAdministered, true);  // 0x02
  assert.equal(info('00:00:00:00:00:00').locallyAdministered, false);
  assert.equal(info('a1:b2:c3:d4:e5:f6').oui, 'A1B2C3');
});

console.log(`\n${n} checks passed.`);
