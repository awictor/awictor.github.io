# Semver

**Semantic version comparator & range checker** — compare two versions, test a version against an npm-style range (`^`, `~`, comparators, `x`-ranges, `||` unions), sort a list, and see which release level differs. One offline HTML file, no signup, no tracking.

👉 **[Open Semver](https://awictor.github.io/semver/)**

## Features
- **Compare** — full SemVer 2.0.0 precedence, including prerelease rules (`1.0.0-alpha` < `1.0.0`, numeric < alphanumeric)
- **Range check** — `^1.2.3`, `~1.2`, `>=1.0.0 <2.0.0`, `1.2.x`, `1.x`, `*`, and `a || b` unions
- **Sort** — order any list of versions correctly (2 vs 10 numeric, not lexical)
- **Diff** — reports whether two versions differ at major / minor / patch / prerelease
- Dark mode; 100% client-side

## Why
Version strings sort wrong lexically (`1.10.0` < `1.2.0` as text) and range syntax is easy to misread. Semver applies the real SemVer precedence rules and expands npm-style ranges so you can check compatibility offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parse`, `compare`, `cmpIds`, `diff`, `sort`, `satisfies`) are covered by headless tests — parsing, numeric core ordering, prerelease precedence, caret/tilde/comparator/x-range/OR expansion, and sort ordering. CI runs them on every push.

## Scope
Covers the common range grammar; hyphen ranges (`1.2.3 - 2.3.4`) and the full npm prerelease-inclusion nuance are out of scope by design.

## License
MIT © Alex Wictor
