# JSON Key Case

Deeply convert **every key** in a JSON object between **camelCase, snake_case, kebab-case and PascalCase** — recursively through nested objects and arrays, leaving values untouched. Perfect for bridging a snake_case API to camelCase JavaScript (or the reverse). One offline HTML file, no signup, no tracking.

👉 **[Open JSON Key Case](https://awictor.github.io/json-keycase/)**

## How it works
Each key is split into words on underscores, hyphens, spaces and camel-case humps (acronyms handled), then re-joined in your chosen style.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`words`, `recaseKey`, `recaseKeys`) are covered by headless tests — word splitting incl. acronym humps, all four target styles, recursion through nested objects and arrays, untouched values, a snake→camel→snake round-trip, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
