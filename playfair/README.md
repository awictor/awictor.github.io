# Playfair Cipher

**Encrypt & decrypt with the classic Playfair cipher** — the 1854 5×5 digraph cipher. Enter a keyword and message; see the live key square, the digraph breakdown, and the result. One offline HTML file, no signup, no tracking. Great for puzzles, CTFs, and escape rooms.

👉 **[Open Playfair Cipher](https://awictor.github.io/playfair/)**

## How it works
The keyword fills a 5×5 grid (duplicates dropped, I/J merged), then the rest of the alphabet. Text is split into letter pairs; doubled letters get an **X** filler (**Z** if the letter is X) and an odd final letter is padded. Each pair is enciphered by the same-row (shift right), same-column (shift down), or rectangle (swap columns) rule. Decryption shifts left/up.

## Features
- Encrypt and decrypt modes
- Live 5×5 key square + digraph breakdown
- Standard filler / padding / I-J handling
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`buildSquare`, `prepareText`, `encrypt`, `decrypt`) are covered by headless tests — the canonical `PLAYFIREXMBCDGHKNOQSTUVWZ` square, the classic `HIDETHEGOLD…` → `BMODZBXDNABEKUDMUIXMMOUVIF` vector, the rectangle rule, filler/padding, I/J folding, and decrypt-inverts-encrypt round trips. CI runs them on every push.

## License
MIT © Alex Wictor
