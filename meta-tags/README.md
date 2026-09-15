# MetaTags

**Open Graph, Twitter Card & SEO meta tag generator** — fill in your title, description, URL and image and get a ready-to-paste block of `<title>`, SEO, Open Graph, and Twitter Card tags, correctly HTML-escaped. One offline HTML file, no signup, no tracking.

👉 **[Open MetaTags](https://awictor.github.io/meta-tags/)**

## Features
- SEO (`<title>`, description, canonical) + Open Graph + Twitter Card in one block
- Sensible defaults (`og:type=website`, `twitter:card=summary_large_image`)
- Everything HTML-escaped — quotes and angle brackets are safe in attributes
- Live character counts flagging the ~60 (title) and ~155 (description) search limits
- Copy button, dark mode; 100% client-side; works offline

## Why
Every page needs share and search metadata, and hand-writing a dozen `<meta>` tags (getting the `property` vs `name` and escaping right) is tedious and error-prone. MetaTags produces the whole block from a few fields. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`metaTags`, `escapeHtml`, `escapeAttr`) are covered by headless tests, including exact full-document output, attribute escaping, defaults, and conditional-field emission; CI runs them on every push.

## License
MIT © Alex Wictor
