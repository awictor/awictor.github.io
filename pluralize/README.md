# Pluralize

**English plural / singular converter** — turn a word into its plural or singular, handling irregulars (child→children), uncountables (sheep), and the standard spelling rules, plus count agreement ("3 cats" / "1 child"). One offline HTML file, no signup, no tracking.

👉 **[Open Pluralize](https://awictor.github.io/pluralize/)**

## Features
- Regular rules (-es after s/x/z/ch/sh, consonant+y → -ies, f/fe → -ves) plus a table of irregulars and uncountables
- Both directions: pluralize and singularize
- Case preserved (Cat → Cats, CHILD → CHILDREN)
- Count agreement helper; dark mode; 100% client-side

## Why
Code generators, ORMs, and UI copy constantly need the right plural — and English is full of exceptions. Pluralize applies the rules and irregulars so "1 child / 3 children" comes out right, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`pluralize`, `singularize`, `withCount`) are covered by headless tests — the regular rules, irregulars/uncountables, both directions, case preservation, count agreement, and pluralize→singularize round-trips. CI runs them on every push.

## License
MIT © Alex Wictor
