# Half-Life Calculator

A single-file, offline exponential-decay calculator. Enter an initial amount, half-life, and elapsed time to get the amount remaining, decay constant, mean lifetime, and the time to reach any fraction.

**Live:** https://awictor.github.io/half-life/

## Features

- **Amount remaining** `N = N₀·(½)^(t/T)`
- **Decay constant** `λ = ln2/T` and **mean lifetime** `τ = T/ln2`
- **Half-lives elapsed** and fraction remaining
- **Time to fraction** — inverse solve for any target fraction
- Works for radioactivity, drug clearance, and capacitor discharge
- Dark mode, 100% offline, zero dependencies

## Example

Carbon-14 (half-life 5730 yr): after 5730 years, half remains — the basis of radiocarbon dating.

## Tests

```
node tests/selftest.mjs
```

10 checks including the e^(−λt) equivalence and time-to-fraction inversion. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
