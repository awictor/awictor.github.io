# Vector Calculator

A single-file, offline 2D/3D vector calculator. Compute dot and cross products, magnitude, the angle between two vectors, sums, and unit vectors.

**Live:** https://awictor.github.io/vector-calculator/

## Features

- **Add / subtract / scale**
- **Dot product** `A·B = |A||B|cosθ`
- **Cross product** (3D) — perpendicular, area-magnitude, anti-commutative
- **Magnitude**, **angle between**, and **normalize** (unit vector)
- Dark mode, 100% offline, zero dependencies

## Tests

```
node tests/selftest.mjs
```

10 checks including cross-product perpendicularity/anti-commutativity, the dot=|a||b|cosθ identity, and normalization. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
