# robots.txt Generator

Build a valid **robots.txt** file — user-agent groups, allow/disallow rules, crawl-delay, and sitemap lines — with one-click presets for allow-all, block-all, and blocking common private paths.

**[Open the tool →](https://awictor.github.io/robots-txt/)**

- User-agent groups with Disallow / Allow rules
- Crawl-delay and multiple Sitemap URLs
- Presets: allow all, block all, block admin/private
- Copy to clipboard; correct blank-line/formatting rules
- Dark mode, 100% offline, no dependencies, no tracking

## Example

```
User-agent: *
Disallow: /admin/
Disallow: /private/

Sitemap: https://example.com/sitemap.xml
```

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
