// Headless regression tests for Sparkline — unicode sparkline generation.
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
const { BLOCKS, parseNumbers, sparkline, stats } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b}`);

check('BLOCKS has 8 levels', () => {
  assert.equal([...BLOCKS].length, 8);
  assert.equal(BLOCKS[0], '▁');
  assert.equal(BLOCKS[7], '█');
});

check('sparkline — 1..8 maps to all eight blocks', () => {
  assert.equal(sparkline([1, 2, 3, 4, 5, 6, 7, 8]), '▁▂▃▄▅▆▇█');
});

check('sparkline — two extremes', () => {
  assert.equal(sparkline([0, 100]), '▁█');
});

check('sparkline — flat data -> all lowest', () => {
  assert.equal(sparkline([5, 5, 5]), '▁▁▁');
  assert.equal(sparkline([7]), '▁');
});

check('sparkline — empty / no numbers', () => {
  assert.equal(sparkline([]), '');
});

check('sparkline — ignores non-finite entries', () => {
  assert.equal(sparkline([1, NaN, 8, Infinity]), sparkline([1, 8]));
});

check('sparkline — first/last reflect min/max', () => {
  const s = sparkline([3, 1, 9, 5]);
  assert.equal(s.length, 4);
  assert.equal(s[1], '▁'); // the minimum (1)
  assert.equal(s[2], '█'); // the maximum (9)
});

check('parseNumbers — commas / spaces / newlines', () => {
  assert.deepEqual(parseNumbers('1, 2,3\n4  5'), [1, 2, 3, 4, 5]);
  assert.deepEqual(parseNumbers('1.5 -2 3e2'), [1.5, -2, 300]);
  assert.deepEqual(parseNumbers('a b 7 c'), [7]);
  assert.deepEqual(parseNumbers(''), []);
});

check('stats', () => {
  const s = stats([1, 2, 3, 4]);
  assert.equal(s.count, 4);
  assert.equal(s.min, 1);
  assert.equal(s.max, 4);
  near(s.mean, 2.5);
  assert.equal(s.sum, 10);
  assert.equal(stats([]), null);
});

check('end-to-end parse -> sparkline', () => {
  assert.equal(sparkline(parseNumbers('0 0 0 100')), '▁▁▁█');
});

console.log(`\n${n} checks passed.`);
