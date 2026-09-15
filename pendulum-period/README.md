# Pendulum Period

A single-file, offline simple-pendulum calculator. Get the period and frequency from a pendulum's length, or find the length for a target period — with adjustable gravity.

**Live:** https://awictor.github.io/pendulum-period/

## Features

- **Period** `T = 2π·√(L/g)` and frequency
- **Length for a target period** (inverse solve)
- Adjustable gravity (try the Moon's 1.62 m/s²)
- Dark mode, 100% offline, zero dependencies

## Good to know

Period depends on length and gravity, not mass. A 1 m pendulum swings in ~2.006 s; a "seconds pendulum" (T = 2 s) is ~0.994 m — the heart of the pendulum clock.

## Tests

```
node tests/selftest.mjs
```

10 checks including the √L scaling, the seconds-pendulum length, and inverse consistency. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
