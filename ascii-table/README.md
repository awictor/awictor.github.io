# AsciiTable

**ASCII reference & lookup** — the full ASCII 0–127 table with decimal, hex, octal, binary, character, and control-char names, plus a character ⇄ code lookup that accepts any base. One offline HTML file, no signup, no tracking.

👉 **[Open AsciiTable](https://awictor.github.io/ascii-table/)**

## Features
- All 128 code points with dec / hex / oct / binary / char / name
- Control characters (0–31, 127) shown by name (NUL, HT, LF, CR, ESC, DEL…)
- Lookup box accepts `A`, `65`, `0x41`, `0o101`, `0b1000001`, or a name filter
- Dark mode; 100% client-side

## Why
A quick, complete ASCII reference is something every developer reaches for — codes, escapes, control characters. AsciiTable is the whole table plus a smart lookup, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`charInfo`, `codeOfChar`, `parseLookup`) are covered by headless tests — letters/digits, control names, space/DEL, zero-padding, char↔code round-trips across the printable range, multi-base parsing, and range/empty validation. CI runs them on every push.

## License
MIT © Alex Wictor
