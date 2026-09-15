# Nyquist Sampling Calculator

A single-file, offline DSP calculator. Find the Nyquist frequency and minimum sample rate, detect aliasing and compute the folded (aliased) frequency, and get the uncompressed PCM audio data rate.

**Live:** https://awictor.github.io/nyquist-calc/

## Features

- **Nyquist frequency** — `sample rate / 2`
- **Minimum sample rate** — `2 × highest frequency`
- **Aliasing detection** and the perceived folded frequency
- **PCM data rate** — `sample rate × bit depth × channels`, with storage per minute
- Dark mode, 100% offline, zero dependencies

## Example

A 30 kHz tone sampled at 44.1 kHz aliases to 14.1 kHz. CD audio (44.1 kHz / 16-bit / stereo) = 1,411,200 bits/s.

## Tests

```
node tests/selftest.mjs
```

10 checks on the pure functions including the CD-audio data rate and aliasing fold. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
