import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { toPascal, pyFieldName, jsonToPython } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('toPascal and pyFieldName', () => {
  assert.equal(toPascal('user_address'), 'UserAddress');
  assert.equal(pyFieldName('firstName'), 'firstName');
  assert.equal(pyFieldName('first-name'), 'first_name');
  assert.equal(pyFieldName('2cool'), '_2cool');
});

check('primitive field types', () => {
  const r = jsonToPython({ id: 42, name: 'x', score: 9.5, active: true });
  assert.match(r, /id: int/);
  assert.match(r, /name: str/);
  assert.match(r, /score: float/);
  assert.match(r, /active: bool/);
});

check('imports and dataclass decorator', () => {
  const r = jsonToPython({ a: 1 }, 'Thing');
  assert.match(r, /from dataclasses import dataclass/);
  assert.match(r, /from typing import Any, List, Optional/);
  assert.match(r, /@dataclass\nclass Thing:/);
});

check('future annotations header (order-independent refs)', () => {
  assert.match(jsonToPython({ a: 1 }), /from __future__ import annotations/);
});

check('lists become List[T]', () => {
  assert.match(jsonToPython({ tags: ['a'] }), /tags: List\[str\]/);
  assert.match(jsonToPython({ nums: [1, 2] }), /nums: List\[int\]/);
  assert.match(jsonToPython({ empty: [] }), /empty: List\[Any\]/);
});

check('null becomes Optional[Any]', () => {
  assert.match(jsonToPython({ maybe: null }), /maybe: Optional\[Any\]/);
});

check('nested object creates a second dataclass', () => {
  const r = jsonToPython({ address: { city: 'Paris' } });
  assert.match(r, /address: Address/);
  assert.match(r, /class Address:/);
  assert.match(r, /city: str/);
});

check('empty object class uses pass', () => {
  const r = jsonToPython({ meta: {} });
  assert.match(r, /class Meta:\n    pass/);
});

check('invalid identifier keys are sanitized', () => {
  const r = jsonToPython({ 'first name': 1 });
  assert.match(r, /first_name: int/);
});

check('top-level must be an object', () => {
  assert.throws(() => jsonToPython([1, 2, 3]), /must be an object/);
});

console.log(`\n${n} checks passed.`);
