# Rowing Split Calculator

Convert between rowing **500m split**, **power (watts)**, and **calories/hour** with the Concept2 formula — and find your split from any distance and time.

**[Open the tool →](https://awictor.github.io/rowing-split/)**

- watts = 2.80 ÷ pace³ (pace in s/m)
- 500m split = time × 500 ÷ distance
- cal/hr = 4 × watts × 0.8604 + 300
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 2,000 m row in 8:00 is a 2:00/500m split ≈ 203 W ≈ 998 cal/hr.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
