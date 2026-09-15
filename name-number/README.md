# Name Number 🔠

Turn a name into its numerology **Expression Number** using the Pythagorean letter system, preserving master numbers. Single HTML file, fully offline, nothing leaves your device.

## Why

Where the Life Path Number comes from your birthdate, the Expression Number comes from your name — and the letter-to-number mapping plus master-number rules are fiddly to do by hand. This computes it deterministically and shows the traditional meaning.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/name-number/
- Type a **full name**.
- Read the Expression Number, its theme, and the raw letter total.

## How it works

- Pythagorean mapping: A–I = 1–9, J–R = 1–9, S–Z = 1–8 (cycling every nine letters).
- Sum every letter's value, then reduce to a single digit — keeping master numbers 11, 22, 33.
- Non-letters (spaces, hyphens, apostrophes) are ignored.
- For fun and reflection — deterministic letter arithmetic with a long tradition.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
