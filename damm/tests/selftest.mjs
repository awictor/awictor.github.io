import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { TABLE, dammGenerate, appendCheck, dammValidate } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('the table is a 10x10 Latin square (quasigroup)', () => {
  assert.equal(TABLE.length, 10);
  for (let r = 0; r < 10; r++) {
    assert.equal(new Set(TABLE[r]).size, 10);              // each row a permutation
    assert.equal(new Set(TABLE.map(x => x[r])).size, 10);   // each column a permutation
  }
});

check('the diagonal is all zeros (required for Damm)', () => {
  for (let i = 0; i < 10; i++) assert.equal(TABLE[i][i], 0);
});

check('canonical vector: check digit of 572 is 4', () => {
  assert.equal(dammGenerate('572'), 4);
  assert.equal(dammValidate('5724'), true);
});

check('appendCheck concatenates the digit', () => {
  assert.equal(appendCheck('572'), '5724');
});

check('generate then validate round-trips for many numbers', () => {
  for (const num of ['0', '7', '42', '1000', '999999', '10203040', '84736251', '123456789012']) {
    assert.equal(dammValidate(appendCheck(num)), true, 'failed for ' + num);
  }
});

check('detects EVERY single-digit error', () => {
  const valid = appendCheck('123456789');
  for (let pos = 0; pos < valid.length; pos++) {
    for (let d = 0; d <= 9; d++) {
      if (String(d) === valid[pos]) continue;
      const corrupted = valid.slice(0, pos) + d + valid.slice(pos + 1);
      assert.equal(dammValidate(corrupted), false, 'missed single-digit error at ' + pos);
    }
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
      if (dammValidate(s)) missed++;
    }
  }
  assert.equal(missed, 0, missed + ' of ' + total + ' transpositions slipped through');
});

check('a wrong check digit fails validation', () => {
  for (let d = 0; d <= 9; d++) { if (d === 4) continue; assert.equal(dammValidate('572' + d), false); }
});

check('leading zeros are handled', () => {
  assert.equal(dammValidate(appendCheck('007')), true);
  assert.equal(dammValidate(appendCheck('00')), true);
});

check('validation: non-digits throw', () => {
  assert.throws(() => dammGenerate('12a3'), /digits only/);
  assert.throws(() => dammValidate('12 3'), /digits only/);
  assert.throws(() => dammGenerate(''), /digits only/);
});

console.log(`\n${n} checks passed.`);
