# Vertical Jump Calculator

Calculate vertical **jump height** from hang time (or the reverse) and **takeoff velocity**, using projectile physics.

**[Open the tool →](https://awictor.github.io/vertical-jump/)**

- Hang time t = 2·√(2h/g); height h = g·t²/8
- Takeoff speed √(2gh)
- Time a jump on video to back-solve your vertical
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 60 cm vertical is ~0.7 s of hang time and a ~3.4 m/s takeoff.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
