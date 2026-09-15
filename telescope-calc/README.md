# Telescope Calculator

Calculate telescope **magnification**, **focal ratio** (f-number), **exit pupil**, and **maximum useful magnification** from aperture, focal length, and eyepiece.

**[Open the tool →](https://awictor.github.io/telescope-calc/)**

- Magnification = scope focal ÷ eyepiece focal
- Focal ratio = focal ÷ aperture
- Exit pupil = aperture ÷ magnification
- Max useful ≈ 2× aperture (mm)
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 200 mm f/10 scope (2000 mm) with a 20 mm eyepiece = 100×, 2 mm exit pupil. Max useful ≈ 400×.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
