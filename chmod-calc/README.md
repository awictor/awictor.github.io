# ChmodCalc

**Unix file permission calculator** — convert `chmod` permissions between octal (`755`), symbolic (`rwxr-xr-x`), and plain English, with a live checkbox matrix. Supports **setuid**, **setgid**, and the **sticky bit**. One offline HTML file, no signup, no tracking.

👉 **[Open ChmodCalc](https://awictor.github.io/chmod-calc/)**

## Features
- Type octal *or* symbolic, or toggle the read/write/execute/special checkboxes — everything stays in sync
- Handles the special digit: setuid (`s`/`S`), setgid (`s`/`S`), sticky (`t`/`T`)
- Copy-ready `chmod` command and `ls -l` style output
- Plain-English description of who can do what
- Dark mode; remembers your last value; 100% client-side; works offline

## Why
Remembering that `644` means `rw-r--r--` — and what a leading `4` does — is a constant small tax. ChmodCalc converts both ways instantly and spells out the result in English. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`normalizeOctal`, `octalToSymbolic`, `symbolicToOctal`, `describeOctal`, `humanReadable`) are covered by headless tests, including an exhaustive octal↔symbolic round-trip across all 64 base modes and every special-bit combination; CI runs them on every push.

## License
MIT © Alex Wictor
