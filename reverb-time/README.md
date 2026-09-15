# Reverb Time (RT60) Calculator

Calculate a room's **reverberation time** (RT60) with the Sabine formula from volume and absorption — and the extra absorption needed to hit a target.

**[Open the tool →](https://awictor.github.io/reverb-time/)**

- RT60 = 0.161 × V ÷ A (Sabine)
- Volume and surface area from room dimensions
- Absorption needed for a target RT60
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 5 × 4 × 3 m room (60 m³, 94 m²) at coefficient 0.2 has ~0.51 s RT60. To reach 0.5 s you need ~19.3 sabins.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
