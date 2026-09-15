# QuotedPrintable

**Quoted-Printable encoder / decoder** — encode and decode Quoted-Printable (RFC 2045), the `=XX` encoding used throughout email. UTF-8 safe, handles soft line breaks. One offline HTML file, no signup, no tracking.

👉 **[Open QuotedPrintable](https://awictor.github.io/quoted-printable/)**

## Features
- Encode: keeps ASCII readable, escapes `=` → `=3D`, 8-bit/control bytes → `=XX`, and trailing whitespace
- Decode: reverses `=XX`, drops soft line breaks (`=` at end of line), lowercase hex OK
- UTF-8 correct (é → `=C3=A9`); newlines preserved
- Dark mode; 100% client-side

## Why
Quoted-Printable is everywhere in raw email (bodies and `=?UTF-8?Q?` headers), and reading it by eye is painful. QuotedPrintable converts both ways offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`encode`, `decode`) are covered by headless tests — passthrough, `=3D`, UTF-8 `=XX`, trailing-whitespace escaping, decoding, soft line breaks, round-trips (incl. emoji), lone `=`/bad hex, newline preservation, and lowercase hex. CI runs them on every push.

## License
MIT © Alex Wictor
