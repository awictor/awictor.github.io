// Headless regression tests for ByteSize pure functions.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',
  appendChild(){},getAttribute(){return null;},setAttribute(){},removeAttribute(){},
  addEventListener(){},querySelectorAll(){return[];},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { DEC, BIN, factorFor, toBytes, convert, humanize, parseSize } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('factorFor decimal and binary units', () => {
  assert.equal(factorFor('B'), 1);
  assert.equal(factorFor('KB'), 1000);
  assert.equal(factorFor('MB'), 1e6);
  assert.equal(factorFor('GB'), 1e9);
  assert.equal(factorFor('KiB'), 1024);
  assert.equal(factorFor('MiB'), 1048576);
  assert.equal(factorFor('GiB'), 1073741824);
  assert.equal(factorFor('nope'), null);
});

check('toBytes multiplies by factor', () => {
  assert.equal(toBytes(1, 'KB'), 1000);
  assert.equal(toBytes(1, 'KiB'), 1024);
  assert.equal(toBytes(1.5, 'GB'), 1.5e9);
  assert.equal(toBytes(2, 'MiB'), 2097152);
  assert.equal(toBytes('abc', 'KB'), null);
  assert.equal(toBytes(1, 'bad'), null);
});

check('convert divides bytes by factor', () => {
  assert.equal(convert(1e9, 'GB'), 1);
  assert.equal(convert(1073741824, 'GiB'), 1);
  assert.equal(convert(1500, 'KB'), 1.5);
  assert.equal(convert(1e9, 'bad'), null);
});

check('humanize decimal picks best unit', () => {
  assert.equal(humanize(0, false), '0 B');
  assert.equal(humanize(500, false), '500 B');
  assert.equal(humanize(1000, false), '1 KB');
  assert.equal(humanize(1500000, false), '1.5 MB');
  assert.equal(humanize(1e9, false), '1 GB');
});

check('humanize binary picks best unit', () => {
  assert.equal(humanize(1024, true), '1 KiB');
  assert.equal(humanize(1536, true), '1.5 KiB');
  assert.equal(humanize(1048576, true), '1 MiB');
  assert.equal(humanize(1073741824, true), '1 GiB');
});

check('humanize rounds to dp and trims trailing zeros', () => {
  assert.equal(humanize(1536, true, 2), '1.5 KiB');   // not 1.50
  assert.equal(humanize(1234567, false, 2), '1.23 MB');
  assert.equal(humanize(1234567, false, 0), '1 MB');
  assert.equal(humanize(-2048, true), '-2 KiB');
});

check('humanize caps at the largest unit', () => {
  // way beyond PB still uses PB (decimal)
  const big = 5 * Math.pow(1000, 6); // 5000 PB worth
  assert.ok(humanize(big, false).endsWith(' PB'));
});

check('parseSize parses value + unit', () => {
  assert.equal(parseSize('1.5 GB'), 1.5e9);
  assert.equal(parseSize('2KiB'), 2048);
  assert.equal(parseSize('500'), 500);          // bare number = bytes
  assert.equal(parseSize('1 mib'), 1048576);    // case-insensitive
  assert.equal(parseSize('bad'), null);
  assert.equal(parseSize('5 zz'), null);        // unknown unit
});

check('round-trip: humanize(toBytes(x,u)) is stable for exact powers', () => {
  assert.equal(humanize(toBytes(3, 'MB'), false), '3 MB');
  assert.equal(humanize(toBytes(3, 'GiB'), true), '3 GiB');
});

console.log(`\n${n} checks passed.`);
