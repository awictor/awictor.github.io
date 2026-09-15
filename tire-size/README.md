# TireSize

**Tire dimension & speedometer calculator** — decode a metric tire size like `225/45R17` into overall diameter, sidewall height, circumference, and revolutions per mile/km, then compare two sizes to see the speedometer error. One offline HTML file, no signup, no tracking.

👉 **[Open TireSize](https://awictor.github.io/tire-size/)**

## Features
- Parse `width/aspectRrim` (handles `ZR`, spaces, lowercase)
- Overall diameter (mm and inch), sidewall, circumference, revs per mile and per km
- **Compare** two sizes: percentage diameter change and the resulting speedometer reading at a true 60
- Dark mode; 100% client-side

## Why
Swapping tire sizes changes your rolling diameter, which throws off the speedometer and odometer. TireSize does the exact geometry so you can plus-size or replace tires without guesswork, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseTire`, `tireSpec`, `compare`) are covered by headless tests — parsing and validation, sidewall/diameter/circumference geometry, revs per mile/km, and the speedometer under/over-read direction for larger and smaller tires. CI runs them on every push.

## License
MIT © Alex Wictor
