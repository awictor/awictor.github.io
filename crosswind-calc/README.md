# Crosswind Calculator

Calculate **crosswind** and **headwind/tailwind** components from runway heading, wind direction, and wind speed — the check every pilot runs before takeoff and landing.

**[Open the tool →](https://awictor.github.io/crosswind-calc/)**

- Crosswind = wind speed × sin(angle)
- Headwind = wind speed × cos(angle) (negative = tailwind)
- Runway number → heading, compass-aware angle
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Runway 27 (270°) with wind from 300° at 18 kt → 30° off, giving a 9 kt crosswind and ~15.6 kt headwind.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
