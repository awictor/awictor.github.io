// Headless regression tests for GradientGen pure functions.
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
const { stopStr, linearGradient, radialGradient, buildGradient, autoPositions, withBackground } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('stopStr with and without position', () => {
  assert.equal(stopStr({ color: '#fff', pos: 0 }), '#fff 0%');
  assert.equal(stopStr({ color: 'red', pos: 50 }), 'red 50%');
  assert.equal(stopStr({ color: 'blue' }), 'blue');
  assert.equal(stopStr({ color: 'blue', pos: '' }), 'blue');
});

check('linearGradient exact output', () => {
  assert.equal(
    linearGradient(90, [{ color: '#fff', pos: 0 }, { color: '#000', pos: 100 }]),
    'linear-gradient(90deg, #fff 0%, #000 100%)');
});

check('linearGradient defaults angle to 180 when null', () => {
  assert.equal(
    linearGradient(null, [{ color: 'red', pos: 0 }, { color: 'blue', pos: 100 }]),
    'linear-gradient(180deg, red 0%, blue 100%)');
});

check('linearGradient handles 0deg and empty stops', () => {
  assert.equal(linearGradient(0, [{ color: 'a', pos: 0 }, { color: 'b', pos: 100 }]),
    'linear-gradient(0deg, a 0%, b 100%)');
  assert.equal(linearGradient(90, []), '');
});

check('radialGradient defaults and options', () => {
  assert.equal(
    radialGradient([{ color: '#fff', pos: 0 }, { color: '#000', pos: 100 }]),
    'radial-gradient(circle at center, #fff 0%, #000 100%)');
  assert.equal(
    radialGradient([{ color: 'a', pos: 0 }, { color: 'b', pos: 100 }],
      { shape: 'ellipse', position: 'top left' }),
    'radial-gradient(ellipse at top left, a 0%, b 100%)');
});

check('buildGradient dispatches on type', () => {
  const stops = [{ color: '#fff', pos: 0 }, { color: '#000', pos: 100 }];
  assert.equal(buildGradient({ type: 'linear', angle: 45, stops }),
    'linear-gradient(45deg, #fff 0%, #000 100%)');
  assert.equal(buildGradient({ type: 'radial', stops }),
    'radial-gradient(circle at center, #fff 0%, #000 100%)');
  assert.equal(buildGradient({ stops }),                    // default linear, angle 180
    'linear-gradient(180deg, #fff 0%, #000 100%)');
  assert.equal(buildGradient({}), '');
});

check('autoPositions spaces stops evenly', () => {
  assert.deepEqual(autoPositions([{ color: 'a' }, { color: 'b' }, { color: 'c' }]),
    [{ color: 'a', pos: 0 }, { color: 'b', pos: 50 }, { color: 'c', pos: 100 }]);
  assert.deepEqual(autoPositions([{ color: 'a' }]), [{ color: 'a', pos: 0 }]);
  assert.deepEqual(autoPositions([{ color: 'a' }, { color: 'b' }]),
    [{ color: 'a', pos: 0 }, { color: 'b', pos: 100 }]);
});

check('autoPositions of 5 rounds to 0,25,50,75,100', () => {
  assert.deepEqual(autoPositions([{c:1},{c:2},{c:3},{c:4},{c:5}].map(x=>({color:x.c})))
    .map(s => s.pos), [0, 25, 50, 75, 100]);
});

check('withBackground wraps the value', () => {
  assert.equal(withBackground('linear-gradient(90deg, #fff, #000)'),
    'background: linear-gradient(90deg, #fff, #000);');
});

console.log(`\n${n} checks passed.`);
