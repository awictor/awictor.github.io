# Gronsfeld Cipher

**Encrypt and decrypt with the Gronsfeld cipher** — a Vigenère variant that uses a *numeric* key. Each successive letter is Caesar-shifted by the next digit of the key (0–9), cycling through the digits. One offline HTML file, no signup, no tracking.

👉 **[Open Gronsfeld Cipher](https://awictor.github.io/gronsfeld/)**

## How it works
`C = (P + digit) mod 26`, decryption subtracts. Case is preserved; non-letters pass through and don't consume a key digit. Because digits shift only 0–9, it's weaker than full Vigenère — great for puzzles and CTFs, not secrets.

## Features
- Encrypt / decrypt with a numeric key
- Case preserved, non-letters untouched, key digits cycle
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`encrypt`, `decrypt`) are covered by headless tests — basic shifts, decrypt inversion, digit-0 identity, Z-wrap, key cycling, case preservation, non-letter handling, round trips, key sanitizing, and empty-key validation. CI runs them on every push.

## License
MIT © Alex Wictor
