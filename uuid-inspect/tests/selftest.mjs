import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { inspectUuid } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('rejects invalid input', () => {
  assert.equal(inspectUuid('not-a-uuid').valid, false);
  assert.equal(inspectUuid('').valid, false);
  assert.equal(inspectUuid('6ba7b810-9dad-11d1-80b4-00c04fd430').valid, false); // too short
});

check('detects version and variant of a v4 UUID', () => {
  const r = inspectUuid('9b2e4d8f-1c3a-4b5e-8f6d-2a1b3c4d5e6f');
  assert.equal(r.valid, true);
  assert.equal(r.version, 4);
  assert.equal(r.variant, 'RFC 4122');
  assert.equal(r.timestamp, undefined); // v4 has no timestamp
});

check('classic RFC v1 UUID → version 1, RFC 4122', () => {
  const r = inspectUuid('6ba7b810-9dad-11d1-80b4-00c04fd430c8');
  assert.equal(r.version, 1);
  assert.equal(r.variant, 'RFC 4122');
  assert.ok(typeof r.timestamp === 'string');
  assert.ok(r.unixMs > 0);
});

check('nil UUID is flagged, version 0', () => {
  const r = inspectUuid('00000000-0000-0000-0000-000000000000');
  assert.equal(r.valid, true);
  assert.equal(r.version, 0);
  assert.equal(r.special, 'nil');
});

check('max UUID is flagged', () => {
  const r = inspectUuid('ffffffff-ffff-ffff-ffff-ffffffffffff');
  assert.equal(r.special, 'max');
});

check('v7 embeds the Unix millisecond timestamp', () => {
  const ms = 1700000000000;
  const hex12 = ms.toString(16).padStart(12, '0');
  const uuid = `${hex12.slice(0, 8)}-${hex12.slice(8, 12)}-7abc-8def-000000000000`;
  const r = inspectUuid(uuid);
  assert.equal(r.version, 7);
  assert.equal(r.unixMs, ms);
  assert.equal(r.timestamp, new Date(ms).toISOString());
});

check('v1 timestamp extraction round-trips a known time', () => {
  const unixMs = 1700000000000;
  const ticks = BigInt(unixMs) * 10000n + 122192928000000000n;
  const timeLow = ticks & 0xffffffffn;
  const timeMid = (ticks >> 32n) & 0xffffn;
  const timeHi = (ticks >> 48n) & 0x0fffn;
  const g1 = timeLow.toString(16).padStart(8, '0');
  const g2 = timeMid.toString(16).padStart(4, '0');
  const g3 = (0x1000n | timeHi).toString(16).padStart(4, '0');
  const uuid = `${g1}-${g2}-${g3}-8abc-000000000000`;
  const r = inspectUuid(uuid);
  assert.equal(r.version, 1);
  assert.equal(r.unixMs, unixMs);
});

check('variant detection covers the ranges', () => {
  assert.equal(inspectUuid('9b2e4d8f-1c3a-4b5e-0f6d-2a1b3c4d5e6f').variant, 'NCS (legacy)'); // 0
  assert.equal(inspectUuid('9b2e4d8f-1c3a-4b5e-cf6d-2a1b3c4d5e6f').variant, 'Microsoft GUID'); // c
  assert.equal(inspectUuid('9b2e4d8f-1c3a-4b5e-ff6d-2a1b3c4d5e6f').variant, 'Reserved'); // f
});

check('accepts uppercase and trims whitespace', () => {
  const r = inspectUuid('  9B2E4D8F-1C3A-4B5E-8F6D-2A1B3C4D5E6F  ');
  assert.equal(r.valid, true);
  assert.equal(r.version, 4);
});

check('version reflects the version nibble', () => {
  assert.equal(inspectUuid('9b2e4d8f-1c3a-5b5e-8f6d-2a1b3c4d5e6f').version, 5);
  assert.equal(inspectUuid('9b2e4d8f-1c3a-3b5e-8f6d-2a1b3c4d5e6f').version, 3);
});

console.log(`\n${n} checks passed.`);
