// Headless regression tests for Entropy — Shannon entropy.
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
  classList:{add(){},remove(){},toggle(){}},
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
const { frequencies, shannonEntropy, totalBits, metrics } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b}`);

check('frequencies', () => {
  assert.deepEqual(frequencies('aab'), { a: 2, b: 1 });
  assert.deepEqual(frequencies(''), {});
  assert.deepEqual(frequencies('aaa'), { a: 3 });
});

check('shannonEntropy — degenerate cases', () => {
  assert.equal(shannonEntropy(''), 0);
  assert.equal(shannonEntropy('a'), 0);
  assert.equal(shannonEntropy('aaaa'), 0);   // single symbol -> 0 bits
});

check('shannonEntropy — uniform distributions', () => {
  near(shannonEntropy('ab'), 1);       // 2 equal symbols -> 1 bit
  near(shannonEntropy('abcd'), 2);     // 4 equal -> 2 bits
  near(shannonEntropy('aabb'), 1);     // still 2 symbols equal
  near(shannonEntropy('abcdefgh'), 3); // 8 equal -> 3 bits
});

check('shannonEntropy — skewed distribution (3:1)', () => {
  // p=.75/.25 -> H = -(.75 log2 .75 + .25 log2 .25) ≈ 0.8112781
  near(shannonEntropy('aaab'), 0.8112781244591328, 1e-9);
});

check('totalBits = entropyPerChar * length', () => {
  near(totalBits('abcd'), 8);        // 2 bits * 4
  near(totalBits('aabb'), 4);        // 1 bit * 4
  assert.equal(totalBits(''), 0);
});

check('metrics', () => {
  const m = metrics('aabbc');
  assert.equal(m.length, 5);
  assert.equal(m.unique, 3);
  near(m.totalBits, m.entropyPerChar * 5);
});

check('entropy never exceeds log2(unique)', () => {
  ['hello world', 'abcabcabc', 'xyz123', 'aaaaab'].forEach(s => {
    const u = Object.keys(frequencies(s)).length;
    assert.ok(shannonEntropy(s) <= Math.log2(u) + 1e-9);
  });
});

check('order independent (entropy is a function of distribution)', () => {
  near(shannonEntropy('aabbc'), shannonEntropy('abcab'));
  near(shannonEntropy('abcab'), shannonEntropy('cbaba'));
});

console.log(`\n${n} checks passed.`);
