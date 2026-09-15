# Acronym

**Acronym & initialism generator** — turn a phrase into an acronym, skipping common small words, with an optional dotted form. One offline HTML file, no signup, no tracking.

👉 **[Open Acronym](https://awictor.github.io/acronym/)**

## Features
- First-letter acronym from any phrase (uppercased)
- Skips small words by default (of, the, and…) so it produces NASA, not NAASA — toggleable
- Dotted form (N.A.S.A.); one-click copy
- Dark mode; 100% client-side

## Why
Naming a project, team, or feature? Acronym generates a candidate initialism instantly and handles the "do we count 'and'?" question with a toggle. Offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure function `acronym` is covered by headless tests — NASA with/without stopwords, common examples (WHO, PDF, ASAP, LASER), the dotted form, single words, punctuation/hyphen separators, digits, empty/stopword-only input, and case-insensitivity. CI runs them on every push.

## License
MIT © Alex Wictor
