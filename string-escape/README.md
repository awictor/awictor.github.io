# StringEscape

**Multi-target string escaper** — paste a string and escape it for JSON/JavaScript, HTML, URL, regular expressions, or the shell. One offline HTML file, no signup, no tracking.

👉 **[Open StringEscape](https://awictor.github.io/string-escape/)**

## Features
- **JSON / JS** — quotes, backslashes, control characters
- **HTML** — the five entities (`& < > " '`)
- **URL** — percent-encoding (UTF-8)
- **Regex** — escapes every metacharacter so the string matches literally
- **Shell** — safe single-quoted form (handles embedded quotes)
- Copy-ready output; dark mode; 100% client-side

## Why
Every language and context escapes differently, and getting it wrong causes bugs or injection holes. StringEscape gives you the correct escaping for each target instantly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`escapeJson`, `escapeHtml`, `escapeUrl`, `escapeRegex`, `escapeShell`, `escapeFor`) are covered by headless tests — each escaper's rules, a regex round-trip that verifies literal matching, the shell single-quote trick, dispatch, and unknown-target errors. CI runs them on every push.

## License
MIT © Alex Wictor
