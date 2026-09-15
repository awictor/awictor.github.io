import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { keyStr, zodForValue, toZodSchema } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('scalar types map to the right zod calls', () => {
  assert.equal(zodForValue('hi'), 'z.string()');
  assert.equal(zodForValue(true), 'z.boolean()');
  assert.equal(zodForValue(null), 'z.null()');
});

check('integers get .int(), decimals do not', () => {
  assert.equal(zodForValue(42), 'z.number().int()');
  assert.equal(zodForValue(9.5), 'z.number()');
});

check('arrays use the first element; empty arrays are unknown', () => {
  assert.equal(zodForValue(['a', 'b']), 'z.array(z.string())');
  assert.equal(zodForValue([1, 2]), 'z.array(z.number().int())');
  assert.equal(zodForValue([]), 'z.array(z.unknown())');
});

check('empty object', () => {
  assert.equal(zodForValue({}), 'z.object({})');
});

check('objects render each key with indentation', () => {
  const out = zodForValue({ id: 1, name: 'a' });
  assert.equal(out, 'z.object({\n  id: z.number().int(),\n  name: z.string(),\n})');
});

check('nested objects and arrays', () => {
  const out = zodForValue({ tags: ['x'], meta: { ok: true } });
  assert.ok(out.includes('tags: z.array(z.string())'));
  assert.ok(out.includes('meta: z.object({'));
  assert.ok(out.includes('    ok: z.boolean(),')); // deeper indent (4 spaces)
});

check('keyStr quotes non-identifier keys only', () => {
  assert.equal(keyStr('foo'), 'foo');
  assert.equal(keyStr('_x$1'), '_x$1');
  assert.equal(keyStr('foo-bar'), '"foo-bar"');
  assert.equal(keyStr('123'), '"123"');
});

check('object key order is preserved', () => {
  const out = zodForValue({ b: 1, a: 2, c: 3 });
  assert.ok(out.indexOf('b:') < out.indexOf('a:'));
  assert.ok(out.indexOf('a:') < out.indexOf('c:'));
});

check('toZodSchema wraps with import, export const, and inferred type', () => {
  const out = toZodSchema({ a: 1 }, 'User');
  assert.equal(out,
    "import { z } from 'zod';\n\nexport const User = z.object({\n  a: z.number().int(),\n});\nexport type User = z.infer<typeof User>;");
});

check('validation: schema name must be a valid identifier', () => {
  assert.throws(() => toZodSchema({ a: 1 }, '123bad'), /invalid schema name/);
  assert.throws(() => toZodSchema({ a: 1 }, 'has space'), /invalid schema name/);
});

console.log(`\n${n} checks passed.`);
