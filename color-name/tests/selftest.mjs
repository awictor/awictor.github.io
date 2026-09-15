// Headless regression tests for ColorName — nearest CSS color name.
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
const { CSS_COLORS, hexToRgb, dist2, nearestColor, nearestList } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('CSS_COLORS — >=100 entries, all valid 6-hex', () => {
  const names = Object.keys(CSS_COLORS);
  assert.ok(names.length >= 100, 'only ' + names.length);
  names.forEach(k => assert.match(CSS_COLORS[k], /^#[0-9a-f]{6}$/, k + ' bad hex'));
});

check('exact matches', () => {
  assert.equal(nearestColor('#ff0000').name, 'red');
  assert.equal(nearestColor('#ff0000').exact, true);
  assert.equal(nearestColor('#000000').name, 'black');
  assert.equal(nearestColor('#ffffff').name, 'white');
  assert.equal(nearestColor('#008080').name, 'teal');
});

check('near matches (not exact)', () => {
  const r = nearestColor('#fe0000');
  assert.equal(r.name, 'red');
  assert.equal(r.exact, false);
  assert.ok(r.distance > 0 && r.distance < 5);
});

check('nearestColor — 3-digit hex', () => {
  assert.equal(nearestColor('#f00').name, 'red');
  assert.equal(nearestColor('#fff').name, 'white');
});

check('nearestColor — invalid -> null', () => {
  assert.equal(nearestColor('nope'), null);
  assert.equal(nearestColor('#12'), null);
});

check('nearestList — sorted ascending, length capped', () => {
  const list = nearestList('#4a90d9', 5);
  assert.equal(list.length, 5);
  for(let i = 1; i < list.length; i++) assert.ok(list[i].distance >= list[i - 1].distance);
});

check('nearestList — first equals nearestColor', () => {
  assert.equal(nearestList('#123456', 3)[0].name, nearestColor('#123456').name);
});

check('hexToRgb / dist2', () => {
  assert.deepEqual(hexToRgb('#010203'), { r: 1, g: 2, b: 3 });
  assert.equal(dist2({ r: 0, g: 0, b: 0 }, { r: 3, g: 4, b: 0 }), 25);
  assert.equal(dist2({ r: 5, g: 5, b: 5 }, { r: 5, g: 5, b: 5 }), 0);
});

check('a bright green maps to a green-ish name', () => {
  assert.ok(/green|lime|chartreuse/.test(nearestColor('#22dd22').name));
});

console.log(`\n${n} checks passed.`);
