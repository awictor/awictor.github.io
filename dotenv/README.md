# DotEnv

**.env ⇄ JSON converter** — parse a `.env` file into JSON (handling comments, quotes, `export` prefixes, and escapes), or turn a JSON object into a `.env`. One offline HTML file, no signup, no tracking.

👉 **[Open DotEnv](https://awictor.github.io/dotenv/)**

## Features
- `.env` → JSON and JSON → `.env`, side by side
- Handles `#` comments, blank lines, and `export ` prefixes
- Double-quoted values unescape `\n \t \r \"`; single-quoted are literal
- Splits on the first `=` (so URLs with `=` survive)
- Serializes back, quoting only values that need it
- Dark mode; one-click copy; remembers each mode's input
- 100% client-side; works offline — your secrets never leave the page

## Why
Moving config between a `.env` file and a JSON settings blob (or a secrets manager) is a routine, error-prone chore. DotEnv does it locally so you never paste credentials into a random web tool. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseEnv`, `toEnv`, `envToJson`, `jsonToEnv`) are covered by headless regression tests: comments/export/quotes/escapes, first-`=` splitting, and `parseEnv(toEnv(obj)) === obj` round-trips; CI runs them on every push.

## License
MIT © Alex Wictor
