# Quaternion Calculator

Quaternion arithmetic in the browser — the [Hamilton product](https://en.wikipedia.org/wiki/Quaternion), addition, conjugate, norm, normalization, and inverse. Quaternions are the standard, gimbal-lock-free way to represent 3D rotations in games, robotics, aerospace, and graphics.

**[Open the tool →](https://awictor.github.io/quaternion/)**

- Non-commutative Hamilton product (`ij = k`, `ji = −k`)
- Conjugate, norm, unit-normalization, and inverse
- Live results as you type
- Dark mode with persistence
- 100% offline, no dependencies, no tracking

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
