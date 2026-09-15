# Life Path Number 🔢

Reduce your birthdate to a numerology **Life Path Number**, preserving the master numbers 11, 22, and 33. Single HTML file, fully offline, nothing leaves your device.

## Why

The Life Path Number is the cornerstone of numerology, and the digit-reduction rules — especially keeping master numbers — trip people up when they do it by hand. This does it correctly and instantly, with the traditional meaning for each result.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/life-path/
- Pick your **birthdate**.
- Read your Life Path Number, its traditional theme, and whether it's a master number.

## How it works

- Sum all digits of the birth month, day, and year, then repeatedly reduce to a single digit.
- Master numbers **11, 22, 33** are kept rather than reduced.
- Example: 1990-07-04 → 1+9+9+0+0+7+0+4 = 30 → 3.
- For fun and reflection — tidy digit arithmetic with a long tradition, not fortune-telling.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
