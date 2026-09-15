# Sitemap.xml Generator

Turn a list of URLs into a valid **sitemap.xml** with optional `lastmod`, `changefreq`, and `priority` — XML-escaped and ready to upload. Pairs with the [robots.txt Generator](https://awictor.github.io/robots-txt/).

**[Open the tool →](https://awictor.github.io/sitemap-generator/)**

- Paste URLs, one per line
- Default change frequency, priority, and last-modified date
- Automatic XML escaping (e.g. `&` → `&amp;`)
- Copy to clipboard; dark mode
- 100% offline, no dependencies, no tracking

## Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
