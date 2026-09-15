# SemVer

**Semantic version parser, comparator & bumper** — parse any semver 2.0.0 string into its parts, compare two versions with full prerelease precedence, sort a whole list, and preview major/minor/patch/prerelease bumps. One offline HTML file, no signup, no tracking.

👉 **[Open SemVer](https://awictor.github.io/semver-tool/)**

## Features
- Parse `major.minor.patch`, prerelease (`-alpha.1`), and build metadata (`+build.9`); rejects leading zeros and malformed input
- Spec-correct precedence: release outranks prerelease, numeric identifiers below alphanumeric, more fields win ties
- Sort a list of versions by precedence
- One-click preview of major / minor / patch / prerelease bumps; dark mode; 100% client-side

## Why
Version comparison rules are subtle — `1.0.0-beta.11` really is newer than `1.0.0-beta.2`, and build metadata is ignored entirely. SemVer applies the spec exactly so you don't have to remember the edge cases. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parse`, `compare`, `bump`, `format`, `sortVersions`) are covered by headless tests — parsing and validation, the canonical spec ordering chain, numeric-vs-alphanumeric prerelease rules, build-metadata equivalence, and all four bump types. CI runs them on every push.

## License
MIT © Alex Wictor
