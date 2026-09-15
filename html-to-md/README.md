# HtmlToMd

**HTML → Markdown converter** — paste HTML and get clean Markdown. Handles headings, bold/italic, links, ordered & unordered lists, inline code, code blocks, blockquotes, horizontal rules, line breaks, and HTML entities. One offline HTML file, no signup, no tracking.

👉 **[Open HtmlToMd](https://awictor.github.io/html-to-md/)**

## Features
- Headings `h1`–`h6`, `strong`/`b`, `em`/`i`, `a`, `ul`/`ol`/`li`, `code`, `pre`, `blockquote`, `hr`, `br`
- Decodes HTML entities (`&amp;`, `&lt;`, …)
- Dependency-free — no DOM, no libraries; works fully offline
- Copy-ready Markdown; dark mode; 100% client-side

## Why
Pasting rich HTML into a Markdown editor leaves a mess. HtmlToMd converts the common tags to clean Markdown locally, so content never leaves your browser. Complements [MdPreview](https://awictor.github.io/md-preview/) in the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`decode`, `fmt`, `htmlToMd`) are covered by headless tests — headings, bold/italic, links, lists, inline and block code, blockquote/hr, entity decoding, and `<br>`/block separation. CI runs them on every push.

## License
MIT © Alex Wictor
