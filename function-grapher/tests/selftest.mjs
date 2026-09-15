import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { compile, sample, extent } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Sampling yields n+1 points.
check('point count', sample('x^2', -2, 2, 4).length === 5);
// 2. y values of x^2 at -2..2.
const s = sample('x^2', -2, 2, 4);
check('y values', s.map(p => p.y).join(',') === '4,1,0,1,4');
// 3. x values are uniformly spaced.
check('x spacing', s.map(p => p.x).join(',') === '-2,-1,0,1,2');
// 4. Endpoints are exact.
const l = sample('x', 0, 10, 10);
check('endpoints', l[0].x === 0 && l[10].x === 10 && l[10].y === 10);
// 5. compile builds f(x).
check('compile', near(compile('sin(x)')(0), 0) && near(compile('cos(x)')(0), 1));
// 6. Linear function samples correctly.
check('linear samples', sample('2*x+1', 0, 4, 4).map(p => p.y).join(',') === '1,3,5,7,9');
// 7. extent returns min/max over finite y.
const e = extent(sample('x^2', -3, 3, 6));
check('extent', e.min === 0 && e.max === 9);
// 8. Non-finite values appear (1/x at x=0).
const inv = sample('1/x', -1, 1, 2); // x = -1, 0, 1 -> y includes Infinity at 0
check('non-finite present', inv.some(p => !isFinite(p.y)));
// 9. extent ignores the non-finite point.
check('extent ignores inf', extent(inv) !== null && isFinite(extent(inv).min));
// 10. General point count for larger n.
check('count n=100', sample('x', 0, 1, 100).length === 101);

console.log(passed + ' checks passed.');
