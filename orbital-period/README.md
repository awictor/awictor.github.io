# Orbital Period Calculator

Calculate **orbital period**, **circular orbital velocity**, and **semi-major axis** from Kepler's third law given a central mass.

**[Open the tool →](https://awictor.github.io/orbital-period/)**

- T = 2π√(a³ / GM), plus circular velocity √(GM / r)
- Presets for the Sun, Earth, and Jupiter, or a custom mass
- Solve semi-major axis back from a known period
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Earth's 149.6-million-km orbit around the Sun → ~365 days at ~29.8 km/s.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
