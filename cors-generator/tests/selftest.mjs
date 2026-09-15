import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { resolveOrigin, corsHeaders, credentialWildcardConflict } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. Wildcard origin.
check('wildcard origin', resolveOrigin(['*']) === '*');
// 2. Single origin echoed.
check('single origin', resolveOrigin(['https://a.com']) === 'https://a.com');
// 3. Empty origins default to *.
check('empty origin default', resolveOrigin([]) === '*');
// 4. Basic headers include origin and methods.
const h = corsHeaders({ origins: ['*'], methods: ['GET', 'POST'] });
check('origin + methods', h.includes('Access-Control-Allow-Origin: *') && h.includes('Access-Control-Allow-Methods: GET, POST'));
// 5. Allowed headers line.
check('allow headers', corsHeaders({ origins: ['*'], headers: ['Content-Type', 'Authorization'] }).includes('Access-Control-Allow-Headers: Content-Type, Authorization'));
// 6. Credentials line only when enabled.
check('credentials line', corsHeaders({ origins: ['https://a.com'], credentials: true }).includes('Access-Control-Allow-Credentials: true'));
// 7. No credentials -> no credentials line.
check('no credentials line', !corsHeaders({ origins: ['*'] }).some(l => l.startsWith('Access-Control-Allow-Credentials')));
// 8. Max-Age line.
check('max age', corsHeaders({ origins: ['*'], maxAge: 3600 }).includes('Access-Control-Max-Age: 3600'));
// 9. Credentials + wildcard is flagged as a conflict.
check('conflict detected', credentialWildcardConflict({ origins: ['*'], credentials: true }) === true);
// 10. Credentials with a specific origin is fine.
check('no conflict single origin', credentialWildcardConflict({ origins: ['https://a.com'], credentials: true }) === false);

console.log(passed + ' checks passed.');
