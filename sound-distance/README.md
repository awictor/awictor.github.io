# Sound Level & Distance Calculator

Calculate how a sound level (**dB**) drops with distance by the inverse-square law, the **distance** for a target level, and the **combined** level of two sources.

**[Open the tool →](https://awictor.github.io/sound-distance/)**

- Level drop = 20 × log₁₀(d₂ ÷ d₁) — 6 dB per doubling
- Back-solve distance for a target level
- Combine two sources (equal = +3 dB)
- Dark mode, 100% offline, no dependencies, no tracking

## Example

100 dB at 1 m is ~82 dB at 8 m. To reach 80 dB you'd need 10 m. Two 100 dB sources make 103 dB.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
