# GlobToRegex

**Glob → regular expression converter** — turn a shell glob pattern (`*`, `**`, `?`, `[abc]`, `{a,b}`) into an equivalent anchored regex, and test file paths against it live. One offline HTML file, no signup, no tracking.

👉 **[Open GlobToRegex](https://awictor.github.io/glob-to-regex/)**

## Features
- `*` (within a path segment), `**` (crosses `/`), `?`, `[abc]` / `[a-z]` / `[!abc]` classes, `{a,b}` alternation, and `\` escapes
- Copy-ready regex with an optional case-insensitive flag
- Live test panel: paste paths and see which match
- Dark mode; 100% client-side

## Why
Build tools, linters, and `.gitignore`-style configs use globs, but many APIs only take regexes. GlobToRegex translates between them and lets you verify the result against real paths, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`globToRegexSource`, `globToRegExp`, `match`) are covered by headless tests — segment-scoped `*` vs `**`, `?`, character classes and negation, brace alternation, literal-dot and metacharacter escaping, backslash escapes, anchoring, and the case-insensitive flag. CI runs them on every push.

## License
MIT © Alex Wictor
