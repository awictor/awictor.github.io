# Frequency ↔ Wavelength

Convert between **frequency and wavelength** for electromagnetic waves (radio, light), using the vacuum speed of light, and get the **period** and **quarter/half-wave antenna lengths**. One offline HTML file, no signup, no tracking.

👉 **[Open Frequency ↔ Wavelength](https://awictor.github.io/frequency-wavelength/)**

## Physics
`λ = c / f`, `f = c / λ`, with c ≈ 299,792,458 m/s. A 100 MHz signal ≈ 3 m; visible light is hundreds of nm. Period = 1/f. In cable/air, scale by the medium's velocity factor.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`wavelength`, `frequency`, `period`, `quarterWave`, `halfWave`, `toHz`) are covered by headless tests: the 1 GHz / 100 MHz vectors, inverse relationship, period, antenna lengths, red-light frequency, unit normalization, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
