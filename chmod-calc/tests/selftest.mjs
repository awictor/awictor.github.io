// Headless regression tests for ChmodCalc — octal <-> symbolic <-> human.
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
  classList:{add(){},remove(){}},
  addEventListener(){},querySelectorAll(){return[];},querySelector(){return null;},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(), querySelector: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const {
  normalizeOctal, digitToPerm, permToDigit,
  octalToSymbolic, symbolicToOctal, describeOctal, humanReadable
} = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('normalizeOctal pads 3-digit to 4', () => {
  assert.equal(normalizeOctal('755'), '0755');
  assert.equal(normalizeOctal('644'), '0644');
  assert.equal(normalizeOctal('4755'), '4755');
  assert.equal(normalizeOctal(' 700 '), '0700');
});

check('normalizeOctal rejects garbage', () => {
  assert.throws(() => normalizeOctal('89'));
  assert.throws(() => normalizeOctal('rwx'));
  assert.throws(() => normalizeOctal('75555'));
  assert.throws(() => normalizeOctal(''));
});

check('digitToPerm / permToDigit round-trip all 8 digits', () => {
  for(let d = 0; d <= 7; d++){
    assert.equal(permToDigit(digitToPerm(d)), d);
  }
  assert.deepEqual(digitToPerm(7), { r:true, w:true, x:true });
  assert.deepEqual(digitToPerm(5), { r:true, w:false, x:true });
  assert.deepEqual(digitToPerm(0), { r:false, w:false, x:false });
});

check('octalToSymbolic — common modes', () => {
  assert.equal(octalToSymbolic('755'), 'rwxr-xr-x');
  assert.equal(octalToSymbolic('644'), 'rw-r--r--');
  assert.equal(octalToSymbolic('600'), 'rw-------');
  assert.equal(octalToSymbolic('777'), 'rwxrwxrwx');
  assert.equal(octalToSymbolic('000'), '---------');
});

check('octalToSymbolic — special bits (s/S/t/T)', () => {
  assert.equal(octalToSymbolic('4755'), 'rwsr-xr-x'); // setuid + owner x
  assert.equal(octalToSymbolic('4655'), 'rwSr-xr-x'); // setuid, owner x off -> capital S
  assert.equal(octalToSymbolic('2755'), 'rwxr-sr-x'); // setgid + group x
  assert.equal(octalToSymbolic('2745'), 'rwxr-Sr-x'); // setgid, group x off
  assert.equal(octalToSymbolic('1777'), 'rwxrwxrwt'); // sticky + others x
  assert.equal(octalToSymbolic('1776'), 'rwxrwxrwT'); // sticky, others x off
});

check('symbolicToOctal — inverse of octalToSymbolic', () => {
  assert.equal(symbolicToOctal('rwxr-xr-x'), '0755');
  assert.equal(symbolicToOctal('rw-r--r--'), '0644');
  assert.equal(symbolicToOctal('rwsr-xr-x'), '4755');
  assert.equal(symbolicToOctal('rwSr-xr-x'), '4655');
  assert.equal(symbolicToOctal('rwxrwxrwt'), '1777');
  assert.equal(symbolicToOctal('rwxrwxrwT'), '1776');
});

check('symbolicToOctal rejects garbage', () => {
  assert.throws(() => symbolicToOctal('rwxr-xr-'));   // too short
  assert.throws(() => symbolicToOctal('zzzr-xr-x'));  // bad chars
  assert.throws(() => symbolicToOctal('755'));
});

check('full round-trip across every 4-digit octal', () => {
  for(let s = 0; s <= 7; s++){
    for(let a = 0; a <= 7; a++){
      const o = '' + s + a + a + a;
      assert.equal(symbolicToOctal(octalToSymbolic(o)), o);
    }
  }
});

check('describeOctal breaks out per-role actions + flags', () => {
  const d = describeOctal('755');
  assert.deepEqual(d.owner, ['read', 'write', 'execute']);
  assert.deepEqual(d.group, ['read', 'execute']);
  assert.deepEqual(d.others, ['read', 'execute']);
  assert.equal(d.setuid, false);
  const s = describeOctal('4755');
  assert.equal(s.setuid, true);
  assert.equal(describeOctal('1777').sticky, true);
  assert.deepEqual(describeOctal('600').group, []);
});

check('humanReadable — sentence form', () => {
  assert.equal(
    humanReadable('755'),
    'Owner can read, write, execute. Group can read, execute. Others can read, execute.'
  );
  assert.equal(
    humanReadable('600'),
    'Owner can read, write. Group has no permissions. Others has no permissions.'
  );
  assert.match(humanReadable('4755'), /special: setuid\.$/);
});

console.log(`\n${n} checks passed.`);
