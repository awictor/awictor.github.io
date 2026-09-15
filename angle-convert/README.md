# AngleConvert

**Angle unit converter** — convert an angle between degrees, radians, gradians, turns, arcminutes, and arcseconds, and see it in every unit at once. One offline HTML file, no signup, no tracking.

👉 **[Open AngleConvert](https://awictor.github.io/angle-convert/)**

## Features
- Six units: degrees, radians, gradians (400/turn), turns, arcminutes, arcseconds
- Convert between any pair, plus an all-units table
- Exact factors (180° = π rad, 1 turn = 2π rad, 1° = 60′ = 3600″)
- Dark mode; 100% client-side

## Why
Switching between degrees and radians is constant in graphics, robotics, and math, and gradians/arcseconds show up in surveying and astronomy. AngleConvert does them all, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toRadians`, `fromRadians`, `convert`, `allUnits`) are covered by headless tests — deg↔rad, turns, gradians, arcmin/arcsec, identity, inverse round-trips, transitivity, the all-units table, and unknown-unit errors. CI runs them on every push.

## License
MIT © Alex Wictor
