# HttpStatus

**HTTP status code reference & lookup** — search any status code or phrase and see its meaning and category, color-coded by class. One offline HTML file, no signup, no tracking.

👉 **[Open HttpStatus](https://awictor.github.io/http-status/)**

## Features
- Search by number (a prefix like `40` matches 400–431), by phrase, or by category name
- ~60 codes across 1xx–5xx with the standard reason phrases (yes, including 418)
- Color-coded classes: info / success / redirect / client error / server error
- Dark mode; remembers your query; 100% client-side; works offline

## Why
"What's a 428 again?" shouldn't need a web search that logs your query. HttpStatus is an instant, offline reference. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`lookup`, `search`, `categoryOf`, `allCodes`, `STATUS`) are covered by headless tests — known codes, category classing, numeric-prefix / phrase / category search, and unknown handling; CI runs them on every push.

## License
MIT © Alex Wictor
