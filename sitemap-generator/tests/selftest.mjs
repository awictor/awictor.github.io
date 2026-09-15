import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { escapeXml, urlEntry, generateSitemap } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

const xml = generateSitemap(['https://a.com/']);
// 1. Includes the URL's loc.
check('has loc', xml.includes('<loc>https://a.com/</loc>'));
// 2. Starts with the XML declaration.
check('xml decl', xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
// 3. Has the urlset namespace.
check('urlset ns', xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
// 4. Closes the urlset.
check('closes urlset', xml.trim().endsWith('</urlset>'));
// 5. Ampersands are XML-escaped.
check('escapes ampersand', generateSitemap(['https://a.com/?x=1&y=2']).includes('<loc>https://a.com/?x=1&amp;y=2</loc>'));
// 6. lastmod line when provided.
check('lastmod', urlEntry({ loc: 'https://a.com/', lastmod: '2026-09-11' }).includes('<lastmod>2026-09-11</lastmod>'));
// 7. changefreq line when provided.
check('changefreq', urlEntry({ loc: 'https://a.com/', changefreq: 'daily' }).includes('<changefreq>daily</changefreq>'));
// 8. priority line when provided.
check('priority', urlEntry({ loc: 'https://a.com/', priority: '0.5' }).includes('<priority>0.5</priority>'));
// 9. One <loc> per URL.
check('loc count', (generateSitemap(['https://a/', 'https://b/', 'https://c/']).match(/<loc>/g) || []).length === 3);
// 10. escapeXml handles all five special characters.
check('escapeXml', escapeXml(`&<>"'`) === '&amp;&lt;&gt;&quot;&apos;');

console.log(passed + ' checks passed.');
