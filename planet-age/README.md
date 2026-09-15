# PlanetAge

**Your age on every planet** — enter your birthdate and see how old you'd be on Mercury, Venus, Mars, Jupiter, and the rest, based on each planet's orbital period. One offline HTML file, no signup, no tracking.

👉 **[Open PlanetAge](https://awictor.github.io/planet-age/)**

## Features
- Age in "years" for all eight planets (one orbit = one year)
- Uses sidereal orbital periods; Earth years are Julian years (365.25 days)
- Shows when your next birthday lands on each planet
- Dark mode; 100% client-side

## Why
A "year" is just one trip around the Sun — so on fast little Mercury you're four times older, and on Neptune you may not have had a single birthday yet. PlanetAge makes the idea tangible, offline. A fun, shareable science tool. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`earthYearsBetween`, `ageOnPlanet`, `allAges`) are covered by headless tests — the Julian-year baseline, linear scaling, Mercury older / outer-planet younger, Earth identity, all-eight enumeration, monotonicity, ordered periods, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
