# CacheControl

**HTTP Cache-Control header builder** — toggle the directives (public/private, no-store, no-cache, must-revalidate, immutable) and set max-age / s-maxage to get a correct `Cache-Control` header, with human-readable durations. One offline HTML file, no signup, no tracking.

👉 **[Open CacheControl](https://awictor.github.io/cache-control/)**

## Features
- All the common directives, combined in a sensible, stable order
- `no-store` correctly overrides everything else
- max-age / s-maxage with duration presets (1 hour, 1 day, 1 year, …) and a humanized readout
- Copy-ready header; dark mode; 100% client-side

## Why
`Cache-Control` is easy to get subtly wrong — mixing `no-store` with `max-age`, forgetting `immutable`, or fumbling `s-maxage`. CacheControl assembles a valid header and tells you how long `max-age` actually is, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`cacheControl`, `humanizeSeconds`) are covered by headless tests — common combinations, `no-store` dominance, directive ordering, empty options, non-integer/negative rejection, and duration humanization. CI runs them on every push.

## License
MIT © Alex Wictor
