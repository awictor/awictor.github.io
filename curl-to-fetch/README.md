# CurlToFetch

**Convert curl to JavaScript fetch()** — paste a `curl` command and get the equivalent `fetch()` call, with the method, headers, body, and basic auth carried over. One offline HTML file, no signup, no tracking.

👉 **[Open CurlToFetch](https://awictor.github.io/curl-to-fetch/)**

## Features
- Handles `-X/--request`, `-H/--header`, `-d/--data*`, `-A`, `-b`, `-e`, and `-u` (→ Basic auth)
- Infers `POST` when a data flag is present, `GET` otherwise
- Quote-aware tokenizer with backslash line-continuation support
- Ignores boolean flags (`-s`, `-L`, `--compressed`); copy-ready output; dark mode; 100% client-side

## Why
Copying a `curl` snippet from docs or DevTools into browser/Node code means re-typing method, headers, and body by hand. CurlToFetch does it instantly, offline, so request details never leave your machine. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`tokenize`, `parseCurl`, `toFetch`, `curlToFetch`) are covered by headless tests — quote handling, line continuations, GET/POST inference, multi-colon header values, `-u` Basic auth, ignored flags, and the emitted fetch code. CI runs them on every push.

## License
MIT © Alex Wictor
