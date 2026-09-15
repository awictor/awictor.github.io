# Modulo Calculator

Compute `a mod n` **three ways** — truncated (C/Java/JavaScript `%`), floored (Python `%`), and Euclidean (remainder always ≥ 0) — with the matching quotients. Clears up the perennial negative-modulo confusion.

**[Open the tool →](https://awictor.github.io/modulo-calc/)**

- Truncated, floored, and Euclidean remainders side by side
- Shows quotient conventions (round toward zero vs round down)
- Handles negative dividends and divisors correctly
- Dark mode, 100% offline, no dependencies, no tracking

## Example

`-7 mod 3` → **-1** truncated (C/JS), **2** floored (Python), **2** Euclidean.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
