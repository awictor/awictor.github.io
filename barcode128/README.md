# Barcode

**Code 128 barcode generator** — type any text and get a scannable Code 128 (subset B) barcode as crisp, downloadable SVG. The check digit is computed automatically. One offline HTML file, no signup, no tracking.

👉 **[Open Barcode](https://awictor.github.io/barcode128/)**

## Features
- Encodes all printable ASCII (space through `~`) as Code 128-B with a correct mod-103 check digit
- Vector SVG output — stays sharp at any size for labels and print
- Adjustable bar width and height; optional human-readable text line
- Download or copy the SVG; dark mode; 100% client-side; works offline

## Why
Printing a batch of SKUs, asset tags or ticket numbers shouldn't require an online service that watermarks or rate-limits you. Barcode generates clean, standards-correct Code 128 SVG locally. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`encode128B`, `check128`, `barModules`, `isEncodable`, `CODE128`) are covered by headless tests — pattern-table integrity, a known "HI" checksum/code sequence, and start/stop module patterns; CI runs them on every push.

## License
MIT © Alex Wictor
