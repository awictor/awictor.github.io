# Shutter Angle Calculator

Convert between **shutter angle** and **shutter speed** for any frame rate — the 180-degree rule and beyond.

**[Open the tool →](https://awictor.github.io/shutter-angle/)**

- shutter speed = angle / (360 × fps)
- Solve speed from angle, or angle from speed
- 180° at 24 fps → 1/48 s (natural motion blur)
- Dark mode, 100% offline, no dependencies, no tracking

## Example

180° at 24 fps → 1/48 s. Keep the angle fixed when you change frame rate to preserve the look.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
