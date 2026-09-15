# ISBN Tools

Validate an **ISBN-10** or **ISBN-13** and convert between the two with the correct check digit. Handles hyphens and spaces and the ISBN-10 `X` check digit. One offline HTML file, no signup, no tracking.

👉 **[Open ISBN Tools](https://awictor.github.io/isbn/)**

## Features
- Detects and validates ISBN-10 (mod 11) and ISBN-13 (EAN-13 mod 10)
- Converts ISBN-10 → ISBN-13 and 978-prefixed ISBN-13 → ISBN-10
- Copy either form; built-in examples; fully offline with dark mode

## Tests
```
node tests/selftest.mjs
```
Pure functions (`isbn10CheckDigit`, `isbn13CheckDigit`, `isValidISBN10/13`, `toISBN13`, `toISBN10`, `inspect`) are covered by headless tests against the canonical `0306406152 ↔ 9780306406157` vector, an `X` check-digit case, round-trips, wrong-check-digit rejection, and the 979-has-no-ISBN-10 rule. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
