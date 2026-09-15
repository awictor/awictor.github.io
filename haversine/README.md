# Haversine

Great-circle **distance** and **initial bearing** between two latitude/longitude points — the shortest path over a spherical Earth (mean radius 6371 km). The standard math for flight paths, delivery-radius checks, and "how far is X from Y." One offline HTML file, no signup, no tracking.

👉 **[Open Haversine](https://awictor.github.io/haversine/)**

## Features
- Distance in kilometres, miles, or nautical miles
- Initial bearing in degrees plus a compass point (N, NE, E…)
- Built-in example routes (London→Paris, NYC→LA, Tokyo→Sydney)
- Dark mode with persistence; fully offline

## Tests
```
node tests/selftest.mjs
```
Pure functions (`haversineKm`, `distance`, `bearing`, `compass`, `toRad`/`toDeg`) are covered by headless tests using exact spherical identities — quarter-equator = R·π/2, antipodal = R·π, pole-to-pole = R·π — plus a real London→Paris check, bearing/compass cardinals, unit conversion, and input validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
