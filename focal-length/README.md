# Field of View & Focal Length Calculator

Compute a camera lens's **angle of view** (horizontal, vertical, diagonal) from focal length and sensor size, plus the **crop factor** and **equivalent full-frame focal length**. For photographers, cinematographers, and lens buyers.

**[Open the tool →](https://awictor.github.io/focal-length/)**

- `FOV = 2·arctan(d / 2f)` for all three dimensions
- Sensor presets: full frame, APS-C, Micro 4/3, 1″
- Crop factor and equivalent focal length
- Dark mode with persistence
- 100% offline, no dependencies, no tracking

## Example

A 50mm lens on full frame (36×24mm) gives ≈ 39.6° horizontal, 46.8° diagonal field of view.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
