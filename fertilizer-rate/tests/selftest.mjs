import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { productPer1000, totalProduct, nitrogenApplied } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 1 lb N from a 20%-N product needs 5 lb of product per 1000 sq ft.
check('per1000', productPer1000(1, 20) === 5);
// 2. A 10%-N product needs 10 lb for the same nitrogen.
check('per1000 10', productPer1000(1, 10) === 10);
// 3. 5 lb/1000 over 5000 sq ft is 25 lb total.
check('total', totalProduct(5, 5000) === 25);
// 4. A higher-nitrogen product needs less product.
check('higher n less', productPer1000(1, 30) < productPer1000(1, 20));
// 5. A bigger area needs more total product.
check('bigger area more', totalProduct(5, 8000) > totalProduct(5, 5000));
// 6. Applying 25 lb of 20%-N over 5000 sq ft delivers 1 lb N/1000.
check('applied', near(nitrogenApplied(25, 20, 5000), 1));
// 7. A non-positive nitrogen % is rejected.
let a = false; try { productPer1000(1, 0); } catch (e) { a = true; }
check('npct guard', a);
// 8. A negative target N is rejected.
let b = false; try { productPer1000(-1, 20); } catch (e) { b = true; }
check('target guard', b);
// 9. A non-positive area is rejected by nitrogenApplied.
let c = false; try { nitrogenApplied(25, 20, 0); } catch (e) { c = true; }
check('area guard', c);
// 10. A negative area is rejected by totalProduct.
let d = false; try { totalProduct(5, -1); } catch (e) { d = true; }
check('total area guard', d);

console.log(passed + ' checks passed.');
