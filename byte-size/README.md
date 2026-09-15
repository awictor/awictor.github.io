# ByteSize

**Data size converter & humanizer** — convert between bytes, KB, MB, GB, TB (and PB) in decimal (1000) or binary (1024, KiB/MiB) units, and get a clean human-readable best-fit size. One offline HTML file, no signup, no tracking.

👉 **[Open ByteSize](https://awictor.github.io/byte-size/)**

## Features
- Decimal (KB/MB/GB) and binary (KiB/MiB/GiB) modes
- "Best unit" human-readable output plus a full conversion table
- Exact byte count for any input
- Dark mode, remembers your input
- 100% client-side; works offline

## Why
"Is that 1 GB or 1 GiB?" trips up developers constantly, and the marketing-vs-OS discrepancy (1000 vs 1024) causes real confusion. ByteSize shows both interpretations side by side. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`factorFor`, `toBytes`, `convert`, `humanize`, `parseSize`) are covered by headless regression tests, including binary/decimal boundaries, best-unit selection, rounding, and parsing; CI runs them on every push.

## License
MIT © Alex Wictor
