# Speed of Sound Calculator

A single-file, offline calculator for the speed of sound in air. Get the speed from temperature, the Mach number for any object speed, and the distance to a lightning strike from the thunder delay.

**Live:** https://awictor.github.io/speed-of-sound/

## Features

- **Speed of sound** `v = 331.3 + 0.606·T` (m/s, km/h, mph)
- **Mach number** and regime (subsonic / transonic / supersonic / hypersonic)
- **Lightning distance** from the flash-to-thunder delay
- Dark mode, 100% offline, zero dependencies

## Handy facts

~343 m/s at 20 °C. Thunder arrives ~3 seconds per kilometre.

## Tests

```
node tests/selftest.mjs
```

10 checks including the 0 °C / 20 °C values, Mach regimes, and the thunder rule. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
