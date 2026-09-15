# Dipole Antenna Calculator

Calculate a **half-wave dipole** length (total and each leg) and a **quarter-wave vertical** from frequency, in feet and meters — using the ham-radio 468 rule.

**[Open the tool →](https://awictor.github.io/dipole-antenna/)**

- Half-wave dipole: 468 / f (MHz) feet
- Each leg / quarter-wave vertical: 234 / f
- Feet-and-inches plus meters
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 40 m dipole at 7.1 MHz is about 66 ft tip to tip (33 ft per leg). Cut long and trim for lowest SWR.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
