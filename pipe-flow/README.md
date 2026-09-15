# Pipe Flow Rate Calculator

Calculate pipe **flow rate** from diameter and velocity, or **velocity** from flow rate, with cross-sectional area.

**[Open the tool →](https://awictor.github.io/pipe-flow/)**

- Q = A·v with A = π(d/2)²
- Solve flow rate (L/min) or required velocity
- Flow scales with the square of diameter
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 50 mm pipe at 2 m/s carries ~236 L/min. For plumbing and irrigation; assumes the pipe runs full.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
