# Autokey Cipher

Encrypt and decrypt with the **Autokey cipher** — Vigenère's 1586 self-keying variant that continues the keystream with the **plaintext itself** instead of repeating the keyword, defeating the period an attacker would otherwise find. One offline HTML file, no signup, no tracking.

👉 **[Open Autokey Cipher](https://awictor.github.io/autokey-cipher/)**

## How it works
Keystream = `keyword + plaintext`. Each letter is shifted by its keystream letter (A=0…Z=25, mod 26). Decryption is sequential — recover a plaintext letter, then feed it back to decrypt the next.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`clean`, `autokeyEncrypt`, `autokeyDecrypt`) are covered by headless tests — normalization, a hand-computed vector (`HELLO`/`KEY`→`RIJSS`), round-trips, non-letter stripping, case-insensitive keywords, an over-long keyword, a single-letter keyword, length preservation, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
