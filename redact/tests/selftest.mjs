// Headless regression tests for Redact — PII detection & masking.
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
const { PATTERNS, ORDER, LABELS, redact, findPii } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('email masking', () => {
  assert.equal(redact('Contact jane.doe@example.com now', { categories: ['email'] }),
    'Contact [EMAIL] now');
  assert.equal(redact('a@b.co and c@d.org', { categories: ['email'] }), '[EMAIL] and [EMAIL]');
});

check('SSN masking', () => {
  assert.equal(redact('SSN 123-45-6789.', { categories: ['ssn'] }), 'SSN [SSN].');
});

check('credit card masking (13-16 digits, spaces or dashes)', () => {
  assert.equal(redact('Card 4111 1111 1111 1111', { categories: ['creditcard'] }), 'Card [CARD]');
  assert.equal(redact('4111-1111-1111-1111', { categories: ['creditcard'] }), '[CARD]');
  assert.equal(redact('378282246310005', { categories: ['creditcard'] }), '[CARD]'); // 15-digit amex
});

check('IPv4 masking', () => {
  assert.equal(redact('server 10.0.12.34 down', { categories: ['ipv4'] }), 'server [IP] down');
  assert.equal(redact('192.168.1.1', { categories: ['ipv4'] }), '[IP]');
});

check('phone masking', () => {
  assert.equal(redact('Call (555) 123-4567 today', { categories: ['phone'] }), 'Call [PHONE] today');
  assert.equal(redact('555-123-4567', { categories: ['phone'] }), '[PHONE]');
  assert.equal(redact('+1 555 123 4567', { categories: ['phone'] }), '[PHONE]');
});

check('stars style masks with bullets (non-space length)', () => {
  assert.equal(redact('a@b.com', { categories: ['email'], style: 'stars' }), '•'.repeat(7));
  const r = redact('123-45-6789', { categories: ['ssn'], style: 'stars' });
  assert.equal(r, '•'.repeat(11)); // 9 digits + 2 dashes, no spaces
});

check('category selection is independent', () => {
  const text = 'a@b.com 123-45-6789';
  assert.equal(redact(text, { categories: ['email'] }), '[EMAIL] 123-45-6789');
  assert.equal(redact(text, { categories: ['ssn'] }), 'a@b.com [SSN]');
});

check('default redacts all categories together', () => {
  const text = 'Email a@b.com SSN 123-45-6789 IP 10.0.0.1';
  const out = redact(text);
  assert.ok(out.includes('[EMAIL]'));
  assert.ok(out.includes('[SSN]'));
  assert.ok(out.includes('[IP]'));
  assert.ok(!/@/.test(out));
});

check('findPii — counts per category', () => {
  const counts = findPii('a@b.com and c@d.org, ip 1.2.3.4, ssn 123-45-6789');
  assert.equal(counts.email, 2);
  assert.equal(counts.ipv4, 1);
  assert.equal(counts.ssn, 1);
  assert.equal(counts.creditcard, 0);
});

check('clean text is unchanged', () => {
  const text = 'The quick brown fox jumps over the lazy dog.';
  assert.equal(redact(text), text);
  assert.deepEqual(findPii(text), { email: 0, creditcard: 0, ssn: 0, ipv4: 0, phone: 0 });
});

check('exports shape', () => {
  assert.deepEqual(ORDER.slice().sort(), ['creditcard', 'email', 'ipv4', 'phone', 'ssn']);
  assert.equal(LABELS.email, '[EMAIL]');
  assert.ok(PATTERNS.email instanceof RegExp);
});

console.log(`\n${n} checks passed.`);
