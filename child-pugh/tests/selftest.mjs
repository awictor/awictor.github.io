import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { bilirubinPoints, albuminPoints, inrPoints, ascitesPoints, encephalopathyPoints, classOf, score } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('bilirubin thresholds: <2 / 2-3 / >3', () => {
  assert.equal(bilirubinPoints(1.9), 1);
  assert.equal(bilirubinPoints(2), 2);
  assert.equal(bilirubinPoints(3), 2);
  assert.equal(bilirubinPoints(3.1), 3);
});

check('albumin thresholds: >3.5 / 2.8-3.5 / <2.8', () => {
  assert.equal(albuminPoints(3.6), 1);
  assert.equal(albuminPoints(3.5), 2);
  assert.equal(albuminPoints(2.8), 2);
  assert.equal(albuminPoints(2.7), 3);
});

check('INR thresholds: <1.7 / 1.7-2.3 / >2.3', () => {
  assert.equal(inrPoints(1.6), 1);
  assert.equal(inrPoints(1.7), 2);
  assert.equal(inrPoints(2.3), 2);
  assert.equal(inrPoints(2.4), 3);
});

check('ascites and encephalopathy map to 1/2/3', () => {
  assert.deepEqual([ascitesPoints('none'), ascitesPoints('mild'), ascitesPoints('moderate')], [1, 2, 3]);
  assert.deepEqual([encephalopathyPoints('none'), encephalopathyPoints('grade1-2'), encephalopathyPoints('grade3-4')], [1, 2, 3]);
});

check('classOf boundaries: A 5-6, B 7-9, C 10-15', () => {
  assert.equal(classOf(5), 'A');
  assert.equal(classOf(6), 'A');
  assert.equal(classOf(7), 'B');
  assert.equal(classOf(9), 'B');
  assert.equal(classOf(10), 'C');
  assert.equal(classOf(15), 'C');
});

check('best-case inputs score 5 points, Class A', () => {
  const r = score({ bilirubin: 1.0, albumin: 4.0, inr: 1.0, ascites: 'none', encephalopathy: 'none' });
  assert.equal(r.points, 5);
  assert.equal(r.class, 'A');
});

check('worst-case inputs score 15 points, Class C', () => {
  const r = score({ bilirubin: 5, albumin: 2.0, inr: 3, ascites: 'moderate', encephalopathy: 'grade3-4' });
  assert.equal(r.points, 15);
  assert.equal(r.class, 'C');
});

check('a mixed case totals correctly and is Class B', () => {
  // bili 2.5(2) + alb 3.0(2) + inr 1.5(1) + mild ascites(2) + no enceph(1) = 8
  const r = score({ bilirubin: 2.5, albumin: 3.0, inr: 1.5, ascites: 'mild', encephalopathy: 'none' });
  assert.equal(r.points, 8);
  assert.equal(r.class, 'B');
});

check('score includes an interpretation string for the class', () => {
  assert.match(score({ bilirubin: 1, albumin: 4, inr: 1, ascites: 'none', encephalopathy: 'none' }).interpretation, /compensated/i);
});

check('validation: bad numbers and unknown categories throw', () => {
  assert.throws(() => bilirubinPoints('x'), /finite number/);
  assert.throws(() => ascitesPoints('huge'), /unknown ascites/);
  assert.throws(() => encephalopathyPoints('grade5'), /unknown encephalopathy/);
  assert.throws(() => classOf(4), /between 5 and 15/);
});

console.log(`\n${n} checks passed.`);
