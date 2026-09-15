# Leap Year Checker

Check whether any year is a **leap year** under the Gregorian rules, and see the days in the year, days in February, the next and previous leap years, and a count across a range.

**[Open the tool →](https://awictor.github.io/leap-year/)**

- Correct century rule: divisible by 4, except centuries not divisible by 400
- Explains *why* (e.g. "a century year not divisible by 400")
- Next / previous leap year and range counts
- Dark mode, 100% offline, no dependencies, no tracking

## Example

2000 ✓ (÷400), 1900 ✗ (century, not ÷400), 2024 ✓. Next leap after 1896 is 1904 (skipping 1900).

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
