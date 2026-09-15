# Typography

**Smart quotes, em dashes & ellipses converter** — turn straight quotes into curly ones, `--` into em dashes, and `...` into a proper ellipsis, or straighten them all back for code and plain text. One offline HTML file, no signup, no tracking.

👉 **[Open Typography](https://awictor.github.io/smart-quotes/)**

## Features
- Context-aware curly quotes (opening vs closing) and apostrophes
- `--` / `---` → em dash, `...` → … ellipsis
- Toggle each transform independently; reverse "straighten" mode
- Live output + copy; dark mode; 100% client-side

## Why
Publishing tools expect real typographic punctuation, but keyboards produce straight quotes and hyphens. Typography cleans a passage up in one paste — and can undo it when you need plain ASCII for code. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`curlyQuotes`, `emDashes`, `ellipses`, `typographer`, `straighten`) are covered by headless tests — opening/closing quote context, apostrophes, hyphen runs, ellipsis collapsing, per-option toggles, straighten round-trips, and safe coercion of non-string input. CI runs them on every push.

## License
MIT © Alex Wictor
