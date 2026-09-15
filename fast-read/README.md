# FastRead

**Fixation (bionic-style) reading converter** — bold the leading part of every word so your eyes fixate and skim faster. Adjust the fixation strength and copy the HTML into notes, docs, or a blog. One offline HTML file, no signup, no tracking.

👉 **[Open FastRead](https://awictor.github.io/fast-read/)**

## Features
- Adjustable fixation ratio (20–80%) with a live preview
- HTML-safe output — special characters in your text are escaped, entities never get mangled
- Word count and a rough reading-time estimate
- Copy-ready HTML; dark mode; 100% client-side

## Why
Fixation reading (bolding word beginnings) can help some readers move through text faster and stay focused. FastRead applies it to any passage locally, and gives you clean HTML you can paste anywhere. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`escapeHtml`, `boldWord`, `bionic`, `wordCount`) are covered by headless tests — the ceil-based bold length, spacing preservation, HTML escaping in gaps (entities like `&amp;` are never bolded internally), ratio bounds, number handling, and word counting. CI runs them on every push.

## License
MIT © Alex Wictor
