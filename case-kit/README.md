# CaseKit

**Text case converter** — turn any text into camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, Title Case, Sentence case, or a URL slug. One offline HTML file, no signup, no tracking.

👉 **[Open CaseKit](https://awictor.github.io/case-kit/)**

## Features
- Nine case styles at once, updated live as you type
- Smart tokenizer: handles camelCase humps, acronyms, and any separators
- Click any result to copy it
- Dark mode, remembers your input
- 100% client-side; works offline

## Why
Renaming variables, building slugs, or matching a style guide means converting between cases all day. CaseKit shows every common form at once so you can grab the one you need. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`tokens`, `toCamel`, `toSnake`, `toKebab`, `toConstant`, …) are covered by headless regression tests, including acronym handling; CI runs them on every push.

## License
MIT © Alex Wictor
