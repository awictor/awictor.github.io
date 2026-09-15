# MdToc

**Markdown table-of-contents generator** — paste Markdown and get a nested table of contents with GitHub-style anchor links. One offline HTML file, no signup, no tracking.

👉 **[Open MdToc](https://awictor.github.io/md-toc/)**

## Features
- Extracts `#`–`######` headings into a nested list
- GitHub-style anchor slugs, with `-1`, `-2` suffixes for duplicates
- Skips headings inside fenced code blocks
- Ordered (numbered) or bulleted output
- One-click copy; dark mode; remembers your input
- 100% client-side; works offline

## Why
READMEs and long docs need a TOC, and matching GitHub's exact anchor slugs (including duplicate handling) by hand is error-prone. MdToc generates it correctly and instantly. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`ghSlug`, `extractHeadings`, `buildToc`, `generateToc`) are covered by headless regression tests: slug rules, duplicate dedup, code-fence skipping, nesting, and ordered output; CI runs them on every push.

## License
MIT © Alex Wictor
