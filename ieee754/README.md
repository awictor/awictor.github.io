# IEEE754

**Floating-point bit inspector** — type any number and see exactly how it's stored in IEEE 754: the sign, exponent, and mantissa bits for both 32-bit (float) and 64-bit (double), the hex encoding, the number's class, and the exact stored value with rounding error. One offline HTML file, no signup, no tracking.

👉 **[Open IEEE754](https://awictor.github.io/ieee754/)**

## Features
- Color-coded sign / exponent / mantissa fields for 32- and 64-bit
- Hex encoding, biased and unbiased exponent, and the actual stored value
- Class detection: normal, subnormal, zero, infinity, NaN
- Flags precision loss (e.g. `0.1` can't be stored exactly) — dark mode; 100% client-side

## Why
"Why is 0.1 + 0.2 ≠ 0.3?" lives inside these bits. IEEE754 shows the real encoding your CPU uses (via `DataView`), so floating-point behavior stops being mysterious. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`bitsOf`, `classify`) are covered by headless tests against known encodings — `1.0`, `-2.0`, `0.5`, `0.1`, bias values, infinity/NaN/subnormal classes, exact round-trips, and 32-bit precision loss. CI runs them on every push.

## License
MIT © Alex Wictor
