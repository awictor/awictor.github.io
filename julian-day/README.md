# Julian Day Converter

Convert between a **Gregorian date** and the **Julian Day Number (JDN)** used in astronomy — both directions — plus Modified Julian Day, day of week, and day of year. Exact integer conversion via the Fliegel–Van Flandern algorithm.

**[Open the tool →](https://awictor.github.io/julian-day/)**

- Date → JDN, MJD, weekday, day-of-year
- JDN → Gregorian date
- Known epochs: J2000 = 2451545, Unix = 2440588, MJD epoch = 2400001
- Dark mode, 100% offline, no dependencies, no tracking

## Example

`2000-01-01` → JDN **2451545** (Saturday, day 1 of the year), MJD 51544.5.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
