# Template

**Fill `{{placeholders}}` / mail merge** — paste a template and a set of variables (JSON *or* `key = value` lines) and get the filled-in text. Supports nested keys and shows which placeholders are missing. One offline HTML file, no signup, no tracking.

👉 **[Open Template](https://awictor.github.io/template-fill/)**

## Features
- `{{key}}` substitution with optional whitespace (`{{ key }}`) and nested keys (`{{order.id}}`)
- Variables from a JSON object, `key = value` / `key: value` lines, or both merged
- Missing keys: keep the `{{placeholder}}` or blank them out
- Live "missing placeholder" highlighting; copy button; dark mode; 100% client-side

## Why
Mail merges, config boilerplate, and canned replies all boil down to "replace the placeholders." Template does it instantly and locally, with a clear view of anything you forgot to supply. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`fillTemplate`, `getPath`, `extractKeys`, `parseVars`, `parseVarsMerged`) are covered by headless tests — nested keys, missing modes, null/number handling, and JSON+lines merging; CI runs them on every push.

## License
MIT © Alex Wictor
