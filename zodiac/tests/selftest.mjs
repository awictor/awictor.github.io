import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { westernZodiac, chineseZodiac } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('sign boundaries: Aries starts Mar 21', () => {
  assert.equal(westernZodiac(3, 20), 'Pisces');
  assert.equal(westernZodiac(3, 21), 'Aries');
});

check('Aries → Taurus boundary Apr 19/20', () => {
  assert.equal(westernZodiac(4, 19), 'Aries');
  assert.equal(westernZodiac(4, 20), 'Taurus');
});

check('Capricorn wraps the year (Dec/Jan)', () => {
  assert.equal(westernZodiac(12, 21), 'Sagittarius');
  assert.equal(westernZodiac(12, 22), 'Capricorn');
  assert.equal(westernZodiac(1, 1), 'Capricorn');
  assert.equal(westernZodiac(1, 19), 'Capricorn');
  assert.equal(westernZodiac(1, 20), 'Aquarius');
});

check('a few mid-month signs', () => {
  assert.equal(westernZodiac(7, 4), 'Cancer');
  assert.equal(westernZodiac(8, 15), 'Leo');
  assert.equal(westernZodiac(11, 21), 'Scorpio');
  assert.equal(westernZodiac(11, 22), 'Sagittarius');
});

check('westernZodiac validates inputs', () => {
  assert.throws(() => westernZodiac(0, 5), /month/);
  assert.throws(() => westernZodiac(13, 5), /month/);
  assert.throws(() => westernZodiac(5, 0), /day/);
  assert.throws(() => westernZodiac(5, 32), /day/);
});

check('Chinese zodiac animal cycle', () => {
  assert.equal(chineseZodiac(2020).animal, 'Rat');
  assert.equal(chineseZodiac(2021).animal, 'Ox');
  assert.equal(chineseZodiac(2024).animal, 'Dragon');
  assert.equal(chineseZodiac(2000).animal, 'Dragon');
  assert.equal(chineseZodiac(2019).animal, 'Pig');
});

check('Chinese zodiac element cycle', () => {
  assert.equal(chineseZodiac(1984).element, 'Wood');   // Wood Rat (cycle start)
  assert.equal(chineseZodiac(2020).element, 'Metal');  // Metal Rat
  assert.equal(chineseZodiac(2024).element, 'Wood');   // Wood Dragon
  assert.equal(chineseZodiac(2000).element, 'Metal');  // Metal Dragon
});

check('full Chinese results', () => {
  assert.deepEqual(chineseZodiac(1984), { animal: 'Rat', element: 'Wood' });
  assert.deepEqual(chineseZodiac(2024), { animal: 'Dragon', element: 'Wood' });
});

check('handles years far from the epoch (positive mod)', () => {
  assert.equal(chineseZodiac(1900).animal, 'Rat');   // 1900 = Rat
  assert.equal(chineseZodiac(1888).animal, 'Rat');
});

check('chineseZodiac validates integer year', () => {
  assert.throws(() => chineseZodiac(1990.5), /integer/);
});

console.log(`\n${n} checks passed.`);
