# Lightning Distance

**How far away is the storm?** Count the seconds between the lightning flash and the thunder, and this converts it to distance using the temperature-adjusted speed of sound. One offline HTML file, no signup, no tracking.

👉 **[Open Lightning Distance](https://awictor.github.io/lightning-distance/)**

## How it works
Speed of sound ≈ `331.3 + 0.606 × °C` m/s; distance = speed × delay. Rules of thumb: ~3 s ≈ 1 km, ~5 s ≈ 1 mile. Under ~30 s (≈10 km) the storm is close — seek shelter.

## Features
- km, miles, and metres from the flash-to-thunder delay
- Temperature adjustment; seconds slider
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`speedOfSound`, `distanceMeters`, `distanceKm`, `distanceMiles`) are covered by headless tests — the speed formula, the km/mile rules of thumb, unit consistency, zero delay, temperature effect, linear scaling, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
