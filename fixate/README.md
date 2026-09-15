# Fixate

**Fixation reading formatter** — bold the leading letters of every word so your eyes latch onto each word's shape and skim the rest. Adjustable strength, live preview, and copy-as-HTML for pasting into docs. One offline HTML file, no signup, no tracking.

👉 **[Open Fixate](https://awictor.github.io/fixate/)**

## Features
- Bolds a length-scaled prefix of each word (short words get just the first letter)
- Adjustable strength slider (30–70%)
- Live preview and one-tap **Copy HTML** for docs, email, or a CMS
- HTML-safe (escapes your text), dark mode, remembers your input
- 100% client-side; works offline

## Why
Fixation formatting (popularized as "bionic reading") can help some people read faster by anchoring the eye to the front of each word. Fixate applies a transparent, adjustable rule locally and hands you clean HTML — it's a generic formatter, not affiliated with any trademarked product. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`boldLen`, `splitWord`, `fixateHTML`, `escapeHtml`) are covered by headless tests, including length-scaling, HTML escaping, punctuation/whitespace preservation, and digit handling; CI runs them on every push.

## License
MIT © Alex Wictor
