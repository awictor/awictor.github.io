# JsonPath

**Extract a value from JSON by path** — paste a JSON document and a dot/bracket path like `user.addresses[0].city` to pull out exactly the value you want. One offline HTML file, no signup, no tracking.

👉 **[Open JsonPath](https://awictor.github.io/json-path/)**

## Features
- Path syntax: `a.b`, `a[0]`, `a["key with spaces"]`, `a['key']`, optional leading `$`
- Empty path returns the whole document
- Clear handling of missing paths (`undefined`) and type mismatches
- Shows the value's type; copy button; dark mode; 100% client-side

## Why
Digging a single field out of a big API response usually means eyeballing nested braces. JsonPath resolves a precise path and shows just that value — locally, no data leaves your browser. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`tokenizePath`, `query`, `queryJson`, `typeOf`) are covered by headless tests — dot/bracket/quoted tokenizing, array & object navigation, malformed-path rejection, and type-mismatch handling; CI runs them on every push.

## License
MIT © Alex Wictor
