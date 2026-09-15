import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { roundup, baseScore, severityRating, toVector, parseVector } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const score = v => baseScore(parseVector(v));

check('roundup returns smallest 1-decimal value ≥ input', () => {
  assert.equal(roundup(4.001), 4.1);
  assert.equal(roundup(4.0), 4.0);
  assert.equal(roundup(5.299), 5.3);
  assert.equal(roundup(9.76), 9.8);
});

check('critical: full-impact network vector = 9.8', () => {
  assert.equal(score('CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H'), 9.8);
});

check('scope change can reach 10.0', () => {
  assert.equal(score('AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H'), 10.0);
});

check('medium: single low-confidentiality disclosure = 5.3', () => {
  assert.equal(score('AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N'), 5.3);
});

check('no impact scores 0.0', () => {
  assert.equal(score('AV:L/AC:H/PR:H/UI:R/S:U/C:N/I:N/A:N'), 0);
});

check('local, confidentiality-only impact = 6.2', () => {
  assert.equal(score('AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N'), 6.2);
});

check('severity rating bands', () => {
  assert.equal(severityRating(0), 'None');
  assert.equal(severityRating(3.9), 'Low');
  assert.equal(severityRating(4.0), 'Medium');
  assert.equal(severityRating(6.9), 'Medium');
  assert.equal(severityRating(7.0), 'High');
  assert.equal(severityRating(8.9), 'High');
  assert.equal(severityRating(9.0), 'Critical');
  assert.equal(severityRating(10.0), 'Critical');
});

check('toVector / parseVector round-trip', () => {
  const m = { AV:'N', AC:'L', PR:'N', UI:'N', S:'U', C:'H', I:'H', A:'H' };
  const v = toVector(m);
  assert.equal(v, 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H');
  assert.deepEqual(parseVector(v), m);
});

check('parseVector tolerates missing CVSS prefix and lowercase', () => {
  assert.deepEqual(
    parseVector('av:n/ac:l/pr:n/ui:n/s:u/c:h/i:h/a:h'),
    { AV:'N', AC:'L', PR:'N', UI:'N', S:'U', C:'H', I:'H', A:'H' }
  );
});

check('validation: incomplete vector and bad values throw', () => {
  assert.throws(() => parseVector('AV:N/AC:L'), /missing metric/);
  assert.throws(() => baseScore({ AV:'N', AC:'L', PR:'N', UI:'N', S:'U', C:'X', I:'H', A:'H' }), /C\/I\/A/);
});

console.log(`\n${n} checks passed.`);
