# DataURI

**Data URI generator & decoder** — turn text, SVG, CSS, or JSON into a `data:` URI (base64 or URL-encoded, UTF-8 safe) for inline embedding, and decode `data:` URIs back to their content. One offline HTML file, no signup, no tracking.

👉 **[Open DataURI](https://awictor.github.io/data-uri/)**

## Features
- Base64 or URL-encoded output, with a MIME-type picker
- UTF-8 safe both ways (emoji, accents, non-Latin scripts round-trip)
- Paste a `data:` URI to decode it automatically
- Character count; copy button; dark mode; 100% client-side

## Why
Inlining a small SVG icon or CSS asset as a `data:` URI avoids an extra request, but getting the encoding right (especially UTF-8 and SVG) is error-prone. DataURI does it correctly, offline, both directions. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toDataUri`, `fromDataUri`) are covered by headless tests — base64 and URL encoding, default and empty MIME, UTF-8 round-trips both ways, SVG round-trip, and rejection of non-data URIs. CI runs them on every push.

## License
MIT © Alex Wictor
