import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { SIZE, SPEED, transferSeconds, humanize } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('1 GB over 100 Mbps = 80 seconds', () => {
  near(transferSeconds(1, 'GB', 100, 'Mbps'), 80);
});

check('1 MB over 8 Mbps = 1 second', () => {
  near(transferSeconds(1, 'MB', 8, 'Mbps'), 1);
});

check('700 MB over 50 Mbps = 112 seconds', () => {
  near(transferSeconds(700, 'MB', 50, 'Mbps'), 112);
});

check('bits vs bytes: 8 bits per byte is applied', () => {
  // 1 MB = 8 Mb, so at 1 Mbps it takes 8 s
  near(transferSeconds(1, 'MB', 1, 'Mbps'), 8);
});

check('transferSeconds validates units and values', () => {
  assert.throws(() => transferSeconds(1, 'PB', 100, 'Mbps'), /size unit/);
  assert.throws(() => transferSeconds(1, 'GB', 100, 'Tbps'), /speed unit/);
  assert.throws(() => transferSeconds(1, 'GB', 0, 'Mbps'), /speed must be positive/);
  assert.throws(() => transferSeconds(-1, 'GB', 100, 'Mbps'), /non-negative/);
});

check('humanize sub-second', () => {
  assert.equal(humanize(0.5), '0.5s');
  assert.equal(humanize(0), '0s');
});

check('humanize minutes and seconds', () => {
  assert.equal(humanize(80), '1m 20s');
  assert.equal(humanize(60), '1m');
});

check('humanize hours', () => {
  assert.equal(humanize(3661), '1h 1m 1s');
});

check('humanize days', () => {
  assert.equal(humanize(90061), '1d 1h 1m 1s');
});

check('unit tables are decimal', () => {
  assert.equal(SIZE.GB, 1e9);
  assert.equal(SIZE.MB, 1e6);
  assert.equal(SPEED.Mbps, 1e6);
  assert.equal(SPEED.Gbps, 1e9);
});

console.log(`\n${n} checks passed.`);
