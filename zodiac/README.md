# Zodiac

**Star sign & Chinese zodiac finder** — enter a birthdate and get the Western zodiac (star sign, with its date range) and the Chinese zodiac (animal + element). One offline HTML file, no signup, no tracking.

👉 **[Open Zodiac](https://awictor.github.io/zodiac/)**

## Features
- Western sign from month/day with correct cusp boundaries
- Chinese zodiac: 12-animal cycle + 5-element (10-year) cycle, with positive-modulo handling for any year
- Symbols and date ranges; dark mode; 100% client-side

## Why
A fun, shareable lookup that gets the tricky cusp dates right (e.g. Aries starts Mar 21, Capricorn wraps the year) and pairs the Western sign with the Chinese animal+element. Part of the [Toolkit](https://awictor.github.io/toolkit/).

> Note: the Chinese zodiac uses the Gregorian year, which is approximate for births in late January/February before the lunar new year.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`westernZodiac`, `chineseZodiac`) are covered by headless tests — cusp boundaries, the year-wrapping Capricorn, input validation, the animal and element cycles (Wood Rat 1984, Metal Rat 2020, Wood Dragon 2024), and far-from-epoch years. CI runs them on every push.

## License
MIT © Alex Wictor
