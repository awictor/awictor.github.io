import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ZONES, powerZones, zoneForPower } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('produces 7 zones', () => {
  assert.equal(powerZones(250).length, 7);
  assert.equal(ZONES.length, 7);
});

check('threshold zone (Z4) watts at FTP 200 = 180–210', () => {
  const z4 = powerZones(200).find(z => z.zone === 'Z4');
  near(z4.minW, 180, 1e-9);   // 90%
  near(z4.maxW, 210, 1e-9);   // 105%
});

check('Z1 starts at 0 W and Z7 is open-ended', () => {
  const zs = powerZones(250);
  assert.equal(zs[0].minW, 0);
  assert.equal(zs[6].maxW, Infinity);
});

check('FTP itself (100%) falls in Z4 threshold', () => {
  assert.equal(zoneForPower(200, 200), 'Z4');
  assert.equal(zoneForPower(250, 250), 'Z4');
});

check('50% FTP is Z1 (active recovery)', () => {
  assert.equal(zoneForPower(100, 200), 'Z1');
});

check('zone boundaries', () => {
  // 115% → Z5 (VO2max)
  assert.equal(zoneForPower(230, 200), 'Z5');
  // 80% → Z3 (tempo)
  assert.equal(zoneForPower(160, 200), 'Z3');
  // 150% → Z7 (>=150)
  assert.equal(zoneForPower(300, 200), 'Z7');
});

check('very high power lands in Z7', () => {
  assert.equal(zoneForPower(1000, 250), 'Z7');
});

check('watts scale linearly with FTP', () => {
  const a = powerZones(200).find(z => z.zone === 'Z4');
  const b = powerZones(400).find(z => z.zone === 'Z4');
  near(b.minW, 2 * a.minW, 1e-9);
});

check('zone % ranges are contiguous', () => {
  const zs = powerZones(250);
  for (let i = 1; i < zs.length; i++) {
    assert.equal(zs[i].minPct, zs[i - 1].maxPct);
  }
});

check('validation', () => {
  assert.throws(() => powerZones('x'), /numbers/);
  assert.throws(() => powerZones(0), /positive/);
  assert.throws(() => zoneForPower(200, -1), /positive/);
});

console.log(`\n${n} checks passed.`);
