import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dailyMl, hourlyMl } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('4-2-1 hourly tiers', () => {
  assert.equal(hourlyMl(5), 20);    // 5*4
  assert.equal(hourlyMl(10), 40);
  assert.equal(hourlyMl(15), 50);   // 40 + 5*2
  assert.equal(hourlyMl(20), 60);
  assert.equal(hourlyMl(30), 70);   // 60 + 10*1
  assert.equal(hourlyMl(70), 110);  // 60 + 50
});

check('Holliday-Segar daily tiers', () => {
  assert.equal(dailyMl(5), 500);
  assert.equal(dailyMl(10), 1000);
  assert.equal(dailyMl(15), 1250);  // 1000 + 5*50
  assert.equal(dailyMl(20), 1500);
  assert.equal(dailyMl(30), 1700);  // 1500 + 10*20
});

check('tier boundaries are continuous', () => {
  assert.equal(hourlyMl(10.0000001).toFixed(4), (40 + 0.0000001 * 2).toFixed(4));
  assert.equal(dailyMl(20), 1500);
});

check('both increase with weight', () => {
  assert.ok(hourlyMl(25) > hourlyMl(15));
  assert.ok(dailyMl(25) > dailyMl(15));
});

check('4-2-1 approximates the daily rule /24', () => {
  // For 20 kg: 60 mL/hr * 24 = 1440 ≈ 1500 daily (close but not identical)
  assert.ok(Math.abs(hourlyMl(20) * 24 - dailyMl(20)) < 100);
});

check('fractional weights', () => {
  assert.equal(hourlyMl(7.5), 30);   // 7.5*4
  assert.equal(dailyMl(7.5), 750);
});

check('small infant', () => {
  assert.equal(hourlyMl(3), 12);
  assert.equal(dailyMl(3), 300);
});

check('large adult (all three tiers)', () => {
  assert.equal(hourlyMl(80), 120);   // 40 + 20 + 60
  assert.equal(dailyMl(80), 2700);   // 1000 + 500 + 1200
});

check('daily is 24× hourly only within the first tier boundaries roughly', () => {
  assert.equal(hourlyMl(5) * 24, 480);   // vs dailyMl(5)=500 (documented approximation)
  assert.equal(dailyMl(5), 500);
});

check('validation', () => {
  assert.throws(() => hourlyMl(0), /weight/);
  assert.throws(() => dailyMl(-3), /weight/);
  assert.throws(() => hourlyMl('x'), /weight/);
});

console.log(`\n${n} checks passed.`);
