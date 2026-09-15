// Headless regression tests for Template — {{placeholder}} filling.
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
const { getPath, extractKeys, fillTemplate, parseVars, parseVarsMerged } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('fillTemplate — basic replacement', () => {
  assert.equal(fillTemplate('Hi {{name}}!', { name: 'Alex' }), 'Hi Alex!');
  assert.equal(fillTemplate('{{a}}-{{b}}', { a: '1', b: '2' }), '1-2');
});

check('fillTemplate — whitespace inside braces', () => {
  assert.equal(fillTemplate('{{ name }}', { name: 'Bo' }), 'Bo');
});

check('fillTemplate — missing keeps or blanks', () => {
  assert.equal(fillTemplate('{{a}} {{b}}', { a: '1' }), '1 {{b}}');
  assert.equal(fillTemplate('{{a}} {{b}}', { a: '1' }, { missing: 'blank' }), '1 ');
});

check('fillTemplate — nested keys', () => {
  assert.equal(fillTemplate('{{user.name}} in {{user.city}}', { user: { name: 'Sam', city: 'NYC' } }), 'Sam in NYC');
  assert.equal(fillTemplate('{{a.b.c}}', { a: { b: { c: 'deep' } } }), 'deep');
});

check('fillTemplate — null becomes empty, numbers stringified', () => {
  assert.equal(fillTemplate('{{x}}', { x: 0 }), '0');
  assert.equal(fillTemplate('{{x}}', { x: null }), '');
  assert.equal(fillTemplate('{{x}}', { x: false }), 'false');
});

check('getPath', () => {
  assert.equal(getPath({ a: { b: 1 } }, 'a.b'), 1);
  assert.equal(getPath({ a: 1 }, 'a.b'), undefined);
  assert.equal(getPath(null, 'a'), undefined);
});

check('extractKeys — unique, in order', () => {
  assert.deepEqual(extractKeys('{{a}} {{b}} {{a}} {{c.d}}'), ['a', 'b', 'c.d']);
  assert.deepEqual(extractKeys('no placeholders'), []);
});

check('parseVars — key=value / key: value lines', () => {
  assert.deepEqual(parseVars('name = Alex\nrole: dev'), { name: 'Alex', role: 'dev' });
  assert.deepEqual(parseVars('x=1'), { x: '1' });
});

check('parseVars — JSON object', () => {
  assert.deepEqual(parseVars('{"x":1,"y":"z"}'), { x: 1, y: 'z' });
  assert.deepEqual(parseVars(''), {});
});

check('parseVarsMerged — combines lines and a JSON block', () => {
  const merged = parseVarsMerged('name = Alex\n{"order": {"id": "A-1"}}');
  assert.equal(merged.name, 'Alex');
  assert.deepEqual(merged.order, { id: 'A-1' });
});

check('end-to-end merge fill', () => {
  const vars = parseVarsMerged('name = Alex\ncity = Seattle\n{"order": {"id": "A-1042"}}');
  assert.equal(fillTemplate('{{name}} / {{city}} / {{order.id}}', vars), 'Alex / Seattle / A-1042');
});

console.log(`\n${n} checks passed.`);
