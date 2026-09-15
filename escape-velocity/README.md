# Escape Velocity Calculator

A single-file, offline calculator for **escape velocity** and circular **orbital velocity** of any celestial body — `v = √(2GM/r)`.

**Live:** https://awictor.github.io/escape-velocity/

## Features

- **Escape velocity** `√(2GM/r)`
- **Orbital velocity** `√(GM/r)` — exactly escape ÷ √2
- Presets: Earth, Moon, Mars, Jupiter, Sun
- Dark mode, 100% offline, zero dependencies

## Reference

Earth ≈ 11.2 km/s escape, ≈ 7.9 km/s low orbit; the Moon ≈ 2.4 km/s.

## Tests

```
node tests/selftest.mjs
```

10 checks including the Earth/Moon/Sun values, the escape = orbital·√2 relation, and √M / 1/√r scaling. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
