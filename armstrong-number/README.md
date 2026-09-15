# Armstrong Numbers

Check whether a number is an **Armstrong (narcissistic) number** — equal to the sum of its digits each raised to the power of the digit count — and list all of them up to a limit. `153 = 1³ + 5³ + 3³`. One offline HTML file, no signup, no tracking.

👉 **[Open Armstrong Numbers](https://awictor.github.io/armstrong-number/)**

## Examples
Single digits all qualify; the 3-digit Armstrong numbers are 153, 370, 371, 407; 4-digit ones include 1634, 8208, 9474.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`digitPowerSum`, `isArmstrong`, `armstrongUpTo`) are covered by headless tests: the 153 and 9474 vectors, all four 3-digit numbers, single-digit trivia, non-examples, exponent-is-digit-count, `armstrongUpTo(500)`, consistency with `isArmstrong`, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
