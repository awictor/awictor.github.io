# Beaufort Cipher

Encrypt and decrypt with the **Beaufort cipher** — a polyalphabetic cipher where each output letter is `key − text (mod 26)`. It's **self-reciprocal**: the same operation both enciphers and deciphers, which is why it powered the WWII Hagelin M-209. One offline HTML file, no signup, no tracking.

👉 **[Open Beaufort Cipher](https://awictor.github.io/beaufort-cipher/)**

## How it works
Unlike Vigenère (which adds the key), Beaufort subtracts the text from the key. Because subtraction here is an involution, running ciphertext back through with the same key restores the plaintext. The keyword repeats over the message.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`clean`, `beaufort`, `beaufortEncrypt`, `beaufortDecrypt`) are covered by headless tests — normalization, a hand-computed vector (`HELLO`/`KEY`→`DANZQ`), the involution property, encrypt≡decrypt, round-trips, non-letter stripping, case-insensitive keys, key repetition, length preservation, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
