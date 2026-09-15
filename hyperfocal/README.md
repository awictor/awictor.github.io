# Hyperfocal Distance & Depth of Field Calculator

Compute the **hyperfocal distance** and **depth of field** (near limit, far limit, total) from focal length, aperture, circle of confusion, and focus distance. For landscape and portrait photographers who want maximum — or precisely controlled — sharpness.

**[Open the tool →](https://awictor.github.io/hyperfocal/)**

- `H = f²/(N·c) + f`, with near/far limits from the focus distance
- Circle-of-confusion presets by sensor (full frame, APS-C, M4/3, 1″)
- Infinite far limit reported when focused at or beyond H
- Dark mode with persistence
- 100% offline, no dependencies, no tracking

## Example

50mm at f/8 on full frame → hyperfocal ≈ 10.5 m. Focus at 3 m and everything from ≈ 2.3 m to ≈ 4.2 m is sharp.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
