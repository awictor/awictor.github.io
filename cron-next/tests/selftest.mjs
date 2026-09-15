// Headless regression tests for CronNext — cron parsing & next-run computation.
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
const { parseField, parseCron, matches, nextRuns } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const keys = (obj) => Object.keys(obj).map(Number).sort((a, b) => a - b);
const iso = (arr) => arr.map(d => d.toISOString().replace('.000Z', 'Z'));
const REF = new Date('2024-01-01T00:00:00Z'); // Monday

check('parseField — star, list, range, step', () => {
  assert.deepEqual(keys(parseField('*', 0, 5)), [0, 1, 2, 3, 4, 5]);
  assert.deepEqual(keys(parseField('1,3,5', 0, 59)), [1, 3, 5]);
  assert.deepEqual(keys(parseField('9-12', 0, 23)), [9, 10, 11, 12]);
  assert.deepEqual(keys(parseField('*/15', 0, 59)), [0, 15, 30, 45]);
  assert.deepEqual(keys(parseField('0-20/5', 0, 59)), [0, 5, 10, 15, 20]);
});

check('parseField — rejects out-of-range / malformed', () => {
  assert.throws(() => parseField('99', 0, 59));
  assert.throws(() => parseField('5-3', 0, 59));   // lo > hi
  assert.throws(() => parseField('*/0', 0, 59));
  assert.throws(() => parseField('x', 0, 59));
});

check('parseCron — requires 5 fields', () => {
  assert.throws(() => parseCron('* * * *'));
  assert.throws(() => parseCron('* * * * * *'));
  const c = parseCron('*/15 * * * *');
  assert.deepEqual(keys(c.minute), [0, 15, 30, 45]);
  assert.equal(c.domStar, true);
});

check('parseCron — weekday 7 normalizes to 0 (Sunday)', () => {
  const c = parseCron('0 0 * * 7');
  assert.ok(c.dow[0]);
  assert.equal(c.dowStar, false);
});

check('nextRuns — every 15 minutes', () => {
  assert.deepEqual(iso(nextRuns('*/15 * * * *', REF, 4)),
    ['2024-01-01T00:15:00Z', '2024-01-01T00:30:00Z', '2024-01-01T00:45:00Z', '2024-01-01T01:00:00Z']);
});

check('nextRuns — daily midnight skips the just-passed minute', () => {
  assert.deepEqual(iso(nextRuns('0 0 * * *', REF, 2)),
    ['2024-01-02T00:00:00Z', '2024-01-03T00:00:00Z']);
});

check('nextRuns — 9am on Mondays', () => {
  assert.deepEqual(iso(nextRuns('0 9 * * 1', REF, 2)),
    ['2024-01-01T09:00:00Z', '2024-01-08T09:00:00Z']);
});

check('nextRuns — 1st of the month', () => {
  assert.deepEqual(iso(nextRuns('0 0 1 * *', REF, 2)),
    ['2024-02-01T00:00:00Z', '2024-03-01T00:00:00Z']);
});

check('nextRuns — weekdays 9am (range dow)', () => {
  // From Mon 2024-01-01 00:00Z: Mon..Fri at 09:00
  assert.deepEqual(iso(nextRuns('0 9 * * 1-5', REF, 5)),
    ['2024-01-01T09:00:00Z', '2024-01-02T09:00:00Z', '2024-01-03T09:00:00Z',
     '2024-01-04T09:00:00Z', '2024-01-05T09:00:00Z']);
});

check('matches — DOM/DOW OR when both restricted', () => {
  const c = parseCron('0 0 13 * 5'); // 13th OR Friday, at 00:00
  assert.equal(matches(new Date('2024-09-13T00:00:00Z'), c), true); // Friday the 13th
  assert.equal(matches(new Date('2024-01-13T00:00:00Z'), c), true); // 13th (Saturday)
  assert.equal(matches(new Date('2024-01-05T00:00:00Z'), c), true); // Friday, not 13th
  assert.equal(matches(new Date('2024-01-06T00:00:00Z'), c), false); // Saturday, not 13th
});

check('nextRuns — count is respected and ascending', () => {
  const runs = nextRuns('* * * * *', REF, 5); // every minute
  assert.equal(runs.length, 5);
  for(let i = 1; i < runs.length; i++) assert.ok(runs[i] > runs[i - 1]);
  assert.equal(runs[0].toISOString(), '2024-01-01T00:01:00.000Z');
});

console.log(`\n${n} checks passed.`);
