# PasswordPolicy

**Password policy checker** — check a password against a configurable set of rules (length, uppercase, lowercase, digit, symbol, no spaces) with per-rule pass/fail. One offline HTML file, no signup, no tracking.

👉 **[Open PasswordPolicy](https://awictor.github.io/password-policy/)**

## Features
- Toggle the rules you need; set min/max length
- Per-rule ✓/✗ and an overall verdict
- Symbol = any non-alphanumeric (incl. Unicode); no-spaces check
- Dark mode; 100% client-side — the password never leaves your browser

## Why
Signup forms enforce specific composition rules, and it's handy to check a candidate password against them before submitting. PasswordPolicy does exactly that, offline. For *strength* (entropy, crack time) see [StrengthCheck](https://awictor.github.io/strength-check/). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure function `check` is covered by headless tests — all-pass, each failing class, length rules, no-spaces, the AND-of-rules verdict, selective rules, empty policy, the symbol definition, and length-bound edge cases. CI runs them on every push.

## License
MIT © Alex Wictor
