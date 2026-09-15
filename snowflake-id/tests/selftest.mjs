import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { DISCORD_EPOCH, TWITTER_EPOCH, decode, encode } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('epoch constants', () => {
  assert.equal(DISCORD_EPOCH, 1420070400000);
  assert.equal(TWITTER_EPOCH, 1288834974657);
});

check('id 0 decodes to the epoch with zero parts', () => {
  const d = decode('0');
  assert.equal(d.timestamp, DISCORD_EPOCH);
  assert.deepEqual([d.worker, d.process, d.increment], [0, 0, 0]);
});

check('encode ⇄ decode round-trip', () => {
  const parts = { timestamp: 1600000000000, worker: 5, process: 3, increment: 42 };
  const id = encode(parts);
  const d = decode(id);
  assert.equal(d.timestamp, parts.timestamp);
  assert.equal(d.worker, parts.worker);
  assert.equal(d.process, parts.process);
  assert.equal(d.increment, parts.increment);
});

check('field masks and max values', () => {
  const id = encode({ timestamp: DISCORD_EPOCH, worker: 31, process: 31, increment: 4095 });
  const d = decode(id);
  assert.equal(d.worker, 31);
  assert.equal(d.process, 31);
  assert.equal(d.increment, 4095);
});

check('real Discord snowflake decodes to a 2016 timestamp', () => {
  const d = decode('175928847299117063');
  assert.ok(d.timestamp >= Date.parse('2016-01-01T00:00:00Z'));
  assert.ok(d.timestamp < Date.parse('2017-01-01T00:00:00Z'));
  assert.ok(d.worker >= 0 && d.worker <= 31);
  assert.ok(d.increment >= 0 && d.increment <= 4095);
});

check('same id gives an earlier time under the Twitter epoch', () => {
  const id = '175928847299117063';
  assert.ok(decode(id, TWITTER_EPOCH).timestamp < decode(id, DISCORD_EPOCH).timestamp);
  assert.equal(decode(id, DISCORD_EPOCH).timestamp - decode(id, TWITTER_EPOCH).timestamp, DISCORD_EPOCH - TWITTER_EPOCH);
});

check('handles ids beyond Number.MAX_SAFE_INTEGER (BigInt)', () => {
  const big = '9223372036854775807'; // 2^63 - 1
  const d = decode(big);
  assert.ok(Number.isFinite(d.timestamp));
  assert.equal(d.increment, Number(BigInt(big) & 0xFFFn));
});

check('increment is the low 12 bits', () => {
  assert.equal(decode('4095').increment, 4095);
  assert.equal(decode('4096').increment, 0);   // rolls over into process bits
});

check('timestamp advances with the id', () => {
  const a = decode(encode({ timestamp: 1500000000000 }));
  const b = decode(encode({ timestamp: 1500000001000 }));
  assert.ok(b.timestamp > a.timestamp);
});

check('validation', () => {
  assert.throws(() => decode('nope'), /numeric snowflake/);
  assert.throws(() => decode('-5'), /non-negative/);
});

console.log(`\n${n} checks passed.`);
