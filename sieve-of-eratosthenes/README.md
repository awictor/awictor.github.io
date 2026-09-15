# Sieve of Eratosthenes

A single-file, offline prime generator. List every prime up to N with the classic sieve, count them (π(N)), find the nth prime, and test primality.

**Live:** https://awictor.github.io/sieve-of-eratosthenes/

## Features

- **Primes up to N** — `O(N log log N)` sieve (up to 5,000,000)
- **π(N)** prime count
- **nth prime** (1-indexed)
- **isPrime** trial-division test
- Dark mode, 100% offline, zero dependencies

## Reference

25 primes below 100, 168 below 1000, 1229 below 10,000. The 1000th prime is 7919.

## Tests

```
node tests/selftest.mjs
```

10 checks including known π(N) counts, nth-prime values, and sieve↔isPrime agreement. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
