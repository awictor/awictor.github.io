# LinkExtract

**URL & markdown link extractor** — paste a blob of text or markdown and pull out every link, deduplicated, with the option to see all links, markdown links only, or bare URLs only. Copy them as a plain list or as markdown. One offline HTML file, no signup, no tracking.

👉 **[Open LinkExtract](https://awictor.github.io/link-extract/)**

## Features
- Finds bare `http(s)` URLs and `[text](url)` markdown links
- Strips trailing punctuation from bare URLs; dedups across both kinds
- Modes: all / markdown-only / bare-only; copy as URL list or markdown
- Dark mode; 100% client-side

## Why
Auditing content or cleaning up notes often means "give me every link in here." LinkExtract does it instantly and offline — no pasting private docs into a web tool. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`extractUrls`, `extractMarkdownLinks`, `extractAll`) are covered by headless tests — bare-URL detection, trailing-punctuation stripping, query strings, markdown text/url capture, dedup across kinds and repeats, and empty input. CI runs them on every push.

## License
MIT © Alex Wictor
