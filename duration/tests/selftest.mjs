// Headless regression tests for Duration pure functions.
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
const { humanizeDuration, toClock, parseDuration } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('humanizeDuration', () => {
  assert.equal(humanizeDuration(0), '0s');
  assert.equal(humanizeDuration(45), '45s');
  assert.equal(humanizeDuration(90), '1m 30s');
  assert.equal(humanizeDuration(3661), '1h 1m 1s');
  assert.equal(humanizeDuration(86400), '1d');
  assert.equal(humanizeDuration(93784), '1d 2h 3m 4s');
  assert.equal(humanizeDuration(-90), '-1m 30s');
});

check('toClock', () => {
  assert.equal(toClock(5), '0:05');
  assert.equal(toClock(90), '1:30');
  assert.equal(toClock(3661), '1:01:01');
  assert.equal(toClock(0), '0:00');
  assert.equal(toClock(36000), '10:00:00');
});

check('parseDuration unit form', () => {
  assert.equal(parseDuration('1h30m'), 5400);
  assert.equal(parseDuration('90m'), 5400);
  assert.equal(parseDuration('2d'), 172800);
  assert.equal(parseDuration('45s'), 45);
  assert.equal(parseDuration('1h 30m 15s'), 5415);
  assert.equal(parseDuration('1.5h'), 5400);
});

check('parseDuration clock form', () => {
  assert.equal(parseDuration('01:30:00'), 5400);
  assert.equal(parseDuration('5:00'), 300);
  assert.equal(parseDuration('1:01:01'), 3661);
});

check('parseDuration bare number = seconds', () => {
  assert.equal(parseDuration('90'), 90);
  assert.equal(parseDuration('3661'), 3661);
});

check('parseDuration rejects garbage', () => {
  assert.equal(parseDuration(''), null);
  assert.equal(parseDuration('abc'), null);
  assert.equal(parseDuration('1h junk'), null);
  assert.equal(parseDuration('1x'), null);
});

check('round-trip: parse(humanize(x)) === x', () => {
  [0, 45, 90, 3661, 86400, 93784, 123456].forEach(secs => {
    assert.equal(parseDuration(humanizeDuration(secs)), secs);
  });
});

check('round-trip: parse(clock) matches known', () => {
  assert.equal(parseDuration(toClock(3661)), 3661);
  assert.equal(parseDuration(toClock(300)), 300);
});

console.log(`\n${n} checks passed.`);
