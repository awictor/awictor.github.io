# String Tension & Frequency Calculator

Calculate a vibrating string's **fundamental frequency**, **tension**, or **linear density** from Mersenne's law.

**[Open the tool →](https://awictor.github.io/string-tension/)**

- f = (1 / 2L)·√(T / μ); solve for f, T, or μ
- Tension scales with the square of frequency (octave up = 4× pull)
- For luthiers picking string gauges and tunings
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 0.5 m string at 100 N with 0.01 kg/m linear density rings at 100 Hz.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
