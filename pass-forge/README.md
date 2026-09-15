# PassForge

**Password generator & strength meter** — generate strong random passwords and see their real entropy and estimated crack time. One offline HTML file, no signup, no tracking. Passwords are generated locally with `crypto.getRandomValues` and never leave your device.

👉 **[Open PassForge](https://awictor.github.io/pass-forge/)**

## Features
- Cryptographically-random passwords (`crypto.getRandomValues`)
- Adjustable length (4–128) and character sets: lower, upper, digits, symbols
- Exclude look-alike characters (O/0, I/l/1, |)
- Live strength meter: **entropy in bits** + **estimated crack time** against a fast offline attacker (~100B guesses/sec)
- One-tap copy, dark mode, remembers your options
- 100% client-side; works offline

## Why
Password managers generate passwords, but rarely show you *why* one is strong. PassForge makes entropy and crack time visible so you can pick a length you can trust. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`buildCharset`, `poolSize`, `entropyBits`, `strengthLabel`, `crackTimeText`, `generatePassword`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
