import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cylinderVolume, rectangularVolume, circularSegmentArea, horizontalCylinderPartial, litersToGallons } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Unit cylinder volume is π.
check('cyl unit', near(cylinderVolume(1, 1), Math.PI));
// 2. Cylinder scales with r² and h.
check('cyl 2,3', near(cylinderVolume(2, 3), Math.PI * 4 * 3));
// 3. Rectangular volume.
check('rect', rectangularVolume(2, 3, 4) === 24);
// 4. Circular segment: half full (h = r) is half the circle area.
check('segment half', near(circularSegmentArea(1, 1), Math.PI / 2));
// 5. Circular segment: full (h = 2r) is the whole circle.
check('segment full', near(circularSegmentArea(1, 2), Math.PI));
// 6. Circular segment: empty is 0.
check('segment empty', circularSegmentArea(1, 0) === 0);
// 7. Horizontal cylinder full = π r² L.
check('hcyl full', near(horizontalCylinderPartial(1, 10, 2), 10 * Math.PI));
// 8. Horizontal cylinder half = half of full.
check('hcyl half', near(horizontalCylinderPartial(1, 10, 1), 5 * Math.PI));
// 9. More fill depth -> more volume.
check('monotonic fill', horizontalCylinderPartial(1, 10, 0.5) < horizontalCylinderPartial(1, 10, 1.5));
// 10. Litres to US gallons.
check('gallons', near(litersToGallons(3.785411784), 1));

console.log(passed + ' checks passed.');
