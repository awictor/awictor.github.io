# Day of the Week

A single-file, offline tool that finds the weekday of any Gregorian date using **Zeller's congruence** — a pure formula, so it works for any year without relying on the `Date` object. Also shows the day of the year and leap-year status.

**Live:** https://awictor.github.io/day-of-week/

## Features

- **Weekday** of any date via Zeller's congruence
- **Day of year** (1–365/366)
- **Leap-year** check (÷4, except centuries not ÷400)
- No `Date` object — accurate for far-past and far-future years
- Dark mode, 100% offline, zero dependencies

## Examples

Jan 1 2000 = Saturday · Moon landing (Jul 20 1969) = Sunday · Feb 29 2024 = Thursday.

## Tests

```
node tests/selftest.mjs
```

10 checks with historical anchor dates and leap-year edge cases. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
