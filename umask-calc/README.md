# UmaskCalc

**umask → default permissions calculator** — enter a umask and see the permissions new files and directories will actually get, in octal and symbolic (rwx) form. One offline HTML file, no signup, no tracking.

👉 **[Open UmaskCalc](https://awictor.github.io/umask-calc/)**

## Features
- File result from base `666` and directory result from base `777`
- Octal and symbolic (`rw-r--r--`) output for both
- One-click presets (022, 002, 077, 027, 000)
- Dark mode; 100% client-side

## Why
A umask *removes* permission bits, so `umask 022` yields `644` files and `755` directories — easy to get backwards. UmaskCalc shows both results instantly and offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseUmask`, `resultPerms`, `toOctal`, `toSymbolic`, `fileDefault`, `dirDefault`) are covered by headless tests — parsing with leading zeros, the canonical 022/077/002/000/027 results, the base-AND-NOT-umask rule, symbolic mapping, the no-granted-removed-bit invariant, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
