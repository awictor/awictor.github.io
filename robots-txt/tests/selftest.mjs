import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { generate, lines } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. Basic disallow group.
check('basic disallow', generate({ groups: [{ userAgents: ['*'], disallow: ['/admin'] }] }) === 'User-agent: *\nDisallow: /admin');
// 2. Empty group => allow-all default (Disallow:).
check('allow all default', generate({ groups: [{ userAgents: ['*'] }] }) === 'User-agent: *\nDisallow:');
// 3. Block all.
check('block all', generate({ groups: [{ userAgents: ['*'], disallow: ['/'] }] }) === 'User-agent: *\nDisallow: /');
// 4. Sitemap appended after a blank line.
check('sitemap', generate({ groups: [{ userAgents: ['*'], disallow: ['/x'] }], sitemaps: ['https://s/sitemap.xml'] })
  === 'User-agent: *\nDisallow: /x\n\nSitemap: https://s/sitemap.xml');
// 5. Multiple user-agents in one group.
check('multi UA', generate({ groups: [{ userAgents: ['Googlebot', 'Bingbot'], disallow: ['/no'] }] })
  === 'User-agent: Googlebot\nUser-agent: Bingbot\nDisallow: /no');
// 6. Crawl-delay line.
check('crawl delay', generate({ groups: [{ userAgents: ['*'], disallow: ['/a'], crawlDelay: 10 }] })
  === 'User-agent: *\nDisallow: /a\nCrawl-delay: 10');
// 7. Two groups separated by a blank line.
check('two groups', generate({ groups: [{ userAgents: ['A'], disallow: ['/1'] }, { userAgents: ['B'], disallow: ['/2'] }] })
  === 'User-agent: A\nDisallow: /1\n\nUser-agent: B\nDisallow: /2');
// 8. Allow directive present.
check('allow directive', generate({ groups: [{ userAgents: ['*'], disallow: ['/'], allow: ['/public'] }] })
  === 'User-agent: *\nDisallow: /\nAllow: /public');
// 9. Empty config yields empty string.
check('empty config', generate({}) === '');
// 10. lines() trims and drops blanks.
check('lines helper', JSON.stringify(lines('  /a \n\n /b \n')) === JSON.stringify(['/a', '/b']));

console.log(passed + ' checks passed.');
