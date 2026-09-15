# Projectile Motion

A single-file, offline projectile calculator. Enter launch speed and angle to get the range, maximum height, and time of flight — with the trajectory plotted and adjustable gravity.

**Live:** https://awictor.github.io/projectile-motion/

## Features

- **Range** `R = v²·sin(2θ)/g`
- **Max height** `H = v²·sin²θ/(2g)`
- **Time of flight** `T = 2v·sinθ/g`
- Angle slider and adjustable gravity (try the Moon's 1.62 m/s²)
- Live trajectory plot
- Dark mode, 100% offline, zero dependencies

## Good to know

Range peaks at 45°, and complementary angles (30°/60°) travel the same distance. Air resistance is ignored.

## Tests

```
node tests/selftest.mjs
```

10 checks including the 45° maximum, v² scaling, and complementary-angle symmetry. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
