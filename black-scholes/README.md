# Black-Scholes Option Pricer

A single-file, offline **Black-Scholes-Merton** option pricer. Enter spot, strike, volatility, rate, and time to expiry to get European call and put prices plus the full Greeks — Delta, Gamma, Vega, Theta, and Rho — with a live put-call parity check.

**Live:** https://awictor.github.io/black-scholes/

## Features

- **Call & put prices** for European options
- **Greeks** — Delta, Gamma, Vega (per 1% vol), Theta (per day), Rho (per 1% rate)
- **Put-call parity** sanity check: `C − P = S − K·e^(−rT)`
- Standard-normal CDF via the Abramowitz-Stegun approximation (~1e-7 accuracy)
- Dark mode, 100% offline, zero dependencies

## Formula

```
d1 = [ln(S/K) + (r + σ²/2)·T] / (σ·√T)
d2 = d1 − σ·√T
Call = S·N(d1) − K·e^(−rT)·N(d2)
Put  = K·e^(−rT)·N(−d2) − S·N(−d1)
```

## Tests

```
node tests/selftest.mjs
```

10 checks including the textbook vector (S=K=100, σ=20%, r=5%, T=1 → Call ≈ 10.4506, Put ≈ 5.5735) and exact put-call parity. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
