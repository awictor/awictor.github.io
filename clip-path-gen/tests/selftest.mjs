// Headless regression tests for ClipPath — CSS clip-path string builders.
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
const { insetPath, circlePath, ellipsePath, polygonPath, withProperty, POLYGONS } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('circlePath', () => {
  assert.equal(circlePath('50%', '50%', '50%'), 'circle(50% at 50% 50%)');
  assert.equal(circlePath('30px', '10px', '20px'), 'circle(30px at 10px 20px)');
});

check('ellipsePath', () => {
  assert.equal(ellipsePath('40%', '30%', '50%', '50%'), 'ellipse(40% 30% at 50% 50%)');
});

check('insetPath — with and without round', () => {
  assert.equal(insetPath('10%', '20%', '10%', '20%'), 'inset(10% 20% 10% 20%)');
  assert.equal(insetPath('10%', '20%', '10%', '20%', '8px'), 'inset(10% 20% 10% 20% round 8px)');
  assert.equal(insetPath('0', '0', '0', '0', ''), 'inset(0 0 0 0)'); // blank round omitted
});

check('polygonPath — joins points as x% y%', () => {
  assert.equal(polygonPath([[50, 0], [100, 100], [0, 100]]), 'polygon(50% 0%, 100% 100%, 0% 100%)');
  assert.equal(polygonPath([[0, 0]]), 'polygon(0% 0%)');
});

check('withProperty', () => {
  assert.equal(withProperty('circle(50%)'), 'clip-path: circle(50%);');
});

check('POLYGONS presets are valid point arrays', () => {
  const names = Object.keys(POLYGONS);
  assert.ok(names.includes('triangle') && names.includes('hexagon') && names.includes('star'));
  names.forEach(k => {
    const pts = POLYGONS[k];
    assert.ok(Array.isArray(pts) && pts.length >= 3, k + ' needs >=3 points');
    pts.forEach(p => {
      assert.equal(p.length, 2);
      assert.ok(p[0] >= 0 && p[0] <= 100 && p[1] >= 0 && p[1] <= 100, k + ' point in range');
    });
  });
});

check('triangle preset renders expected polygon', () => {
  assert.equal(polygonPath(POLYGONS.triangle), 'polygon(50% 0%, 100% 100%, 0% 100%)');
});

check('rhombus preset renders expected polygon', () => {
  assert.equal(polygonPath(POLYGONS.rhombus), 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)');
});

console.log(`\n${n} checks passed.`);
