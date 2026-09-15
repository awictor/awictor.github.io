# Bcrypt Inspector

**Break a bcrypt hash into its parts** — variant, cost factor, salt, and hash — and read off the **work factor** (2^cost). Useful for auditing how strong a password-storage setup is. One offline HTML file, no signup, no tracking.

👉 **[Open Bcrypt Inspector](https://awictor.github.io/bcrypt-inspector/)**

## Format
`$2<variant>$<cost>$<22-char salt><31-char hash>`. The cost factor sets 2^cost key-expansion rounds — each +1 doubles the work. Cost 10 = 1,024 rounds; 12+ (4,096+) is a common modern recommendation. Variants: 2a / 2b / 2x / 2y (2b is current).

## Features
- Color-coded breakdown of each segment
- Cost → work-factor (rounds) with thousands formatting
- Validates the bcrypt format; dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`isBcrypt`, `parseBcrypt`) are covered by headless tests — parsing a known hash, salt/hash lengths, 2^cost work factor, all variants, validity checks, whitespace tolerance, and rejection of wrong prefixes/lengths/cost formats. CI runs them on every push.

## License
MIT © Alex Wictor
