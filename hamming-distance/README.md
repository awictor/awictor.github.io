# Hamming Distance

Count the positions where two **equal-length strings** differ (Hamming distance), or the differing **bits** between two integers, with the differences highlighted. One offline HTML file, no signup, no tracking.

👉 **[Open Hamming Distance](https://awictor.github.io/hamming-distance/)**

## About
The minimum substitutions to turn one string into another of the same length. For integers it equals the population count of their XOR. Used in error-correcting codes and to compare equal-length DNA sequences. (For differing lengths, use edit distance.)

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hammingDistance`, `hammingDistanceInt`, `diffPositions`) are covered by headless tests: the classic karolin/kathrin/kerstin vectors, binary strings, integer popcount-of-XOR, string↔integer agreement, symmetry, diff positions, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
