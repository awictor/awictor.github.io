import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { coffeeFromWater, waterFromCoffee, waterForCups } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('coffee from water at 1:16', () => {
  near(coffeeFromWater(500, 16), 31.25, 1e-9);
  near(coffeeFromWater(1000, 16), 62.5, 1e-9);
});

check('water from coffee at 1:16', () => {
  near(waterFromCoffee(30, 16), 480, 1e-9);
  near(waterFromCoffee(60, 16), 960, 1e-9);
});

check('the two are inverses', () => {
  near(waterFromCoffee(coffeeFromWater(750, 15), 15), 750, 1e-9);
  near(coffeeFromWater(waterFromCoffee(18, 2), 2), 18, 1e-9);
});

check('espresso 1:2', () => {
  near(coffeeFromWater(36, 2), 18, 1e-9);
});

check('cold brew 1:8', () => {
  near(coffeeFromWater(1000, 8), 125, 1e-9);
});

check('stronger ratio (smaller N) means more coffee', () => {
  assert.ok(coffeeFromWater(500, 12) > coffeeFromWater(500, 16));
});

check('water for cups (250 mL default)', () => {
  near(waterForCups(2), 500, 1e-9);
  near(waterForCups(4, 240), 960, 1e-9);
});

check('zero water → zero coffee', () => {
  assert.equal(coffeeFromWater(0, 16), 0);
});

check('ratio scales linearly with water', () => {
  near(coffeeFromWater(2000, 16), 2 * coffeeFromWater(1000, 16), 1e-9);
});

check('validation', () => {
  assert.throws(() => coffeeFromWater('x', 16), /numbers/);
  assert.throws(() => coffeeFromWater(500, 0), /positive/);
  assert.throws(() => waterFromCoffee(30, -1), /positive/);
});

console.log(`\n${n} checks passed.`);
