import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { verhoeffGenerate, appendCheck, verhoeffValidate } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

// Canonical Verhoeff vector: check digit of 236 is 3, so 2363 validates.
check('canonical vector: check digit of 236 is 3', () => {
  assert.equal(verhoeffGenerate('236'), 3);
  assert.equal(verhoeffValidate('2363'), true);
});

check('check digit is a single 0-9 digit', () => {
  for (const num of ['0', '9', '236', '123456789']) {
    const d = verhoeffGenerate(num);
    assert.ok(Number.isInteger(d) && d >= 0 && d <= 9);
  }
});

check('appendCheck concatenates the digit', () => {
  assert.equal(appendCheck('236'), '2363');
  assert.equal(appendCheck('236').length, 4);
});

check('generate then validate round-trips for many numbers', () => {
  for (const num of ['0', '7', '42', '1000', '999999', '10203040', '84736251', '123456789012']) {
    assert.equal(verhoeffValidate(appendCheck(num)), true, 'failed for ' + num);
  }
});

check('detects EVERY single-digit error (the core Verhoeff guarantee)', () => {
  const valid = appendCheck('123456789');
  let checked = 0;
  for (let pos = 0; pos < valid.length; pos++) {
    for (let d = 0; d <= 9; d++) {
      if (String(d) === valid[pos]) continue;
      const corrupted = valid.slice(0, pos) + d + valid.slice(pos + 1);
      assert.equal(verhoeffValidate(corrupted), false, 'missed single-digit error at ' + pos);
      checked++;
    }
  }
  assert.ok(checked > 50);
});

check('catches the phonetic swap Luhn misses (e.g. ...13... <-> ...30...)', () => {
  // build a valid number containing "13", swap to "30" -> must be invalid
  const valid = appendCheck('4139'); // contains "13"
  assert.equal(verhoeffValidate(valid), true);
  const idx = valid.indexOf('13');
  const swapped = valid.slice(0, idx) + '31' + valid.slice(idx + 2);
  assert.equal(verhoeffValidate(swapped), false);
});

check('a wrong check digit fails validation', () => {
  // correct check for 236 is 3; every other digit must fail
  for (let d = 0; d <= 9; d++) {
    if (d === 3) continue;
    assert.equal(verhoeffValidate('236' + d), false);
  }
});

check('exhaustive transposition sweep: ZERO adjacent swaps slip through', () => {
  let missed = 0, total = 0;
  for (let num = 100000; num < 100500; num++) {
    const v = appendCheck(String(num));
    for (let i = 0; i < v.length - 1; i++) {
      if (v[i] === v[i + 1]) continue;
      total++;
      const s = v.slice(0, i) + v[i + 1] + v[i] + v.slice(i + 2);
      if (verhoeffValidate(s)) missed++;
    }
  }
  assert.equal(missed, 0, missed + ' of ' + total + ' transpositions slipped through');
});

check('leading zeros are handled', () => {
  assert.equal(verhoeffValidate(appendCheck('007')), true);
  assert.equal(verhoeffValidate(appendCheck('00')), true);
});

check('validation: non-digits throw', () => {
  assert.throws(() => verhoeffGenerate('12a3'), /digits only/);
  assert.throws(() => verhoeffValidate('12 3'), /digits only/);
  assert.throws(() => verhoeffGenerate(''), /digits only/);
});

console.log(`\n${n} checks passed.`);
