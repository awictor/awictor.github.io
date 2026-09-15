# SetOps

**Compare two lists** — paste List A and List B and get their union, intersection, difference (A − B / B − A), or symmetric difference — deduplicated, with counts. One offline HTML file, no signup, no tracking.

👉 **[Open SetOps](https://awictor.github.io/set-ops/)**

## Features
- Union, intersection, A−B, B−A, and symmetric difference
- Lines trimmed; blanks and in-list duplicates ignored; results keep first-seen order
- Optional case-insensitive comparison
- `|A|`, `|B|`, and result counts; copy button; dark mode; 100% client-side

## Why
"Which emails are in both lists? Which are only in the new one?" is a constant data chore that people do by hand or in a spreadsheet. SetOps answers it instantly and privately. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`union`, `intersection`, `difference`, `symmetricDifference`, `uniq`, `parseLines`, `compute`) are covered by headless tests — ordering, case-insensitive mode, all five operations, and a `__proto__`-as-value safety case; CI runs them on every push.

## License
MIT © Alex Wictor
