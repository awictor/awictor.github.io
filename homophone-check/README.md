# Homophone Checker

Scan your writing for commonly **confused homophones** — *their/there/they're*, *your/you're*, *to/too/two*, *affect/effect*, *lose/loose* and 40+ more groups — so you can double-check each one before you publish. One offline HTML file, no signup, no tracking.

👉 **[Open Homophone Checker](https://awictor.github.io/homophone-check/)**

## What it does
It highlights the risky words and shows their alternatives. It doesn't decide whether you're right (that needs the meaning) — it just makes sure you paused on the ones people get wrong.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`normalizeWord`, `homophonesOf`, `findHomophones`) are covered by headless tests — normalization, group lookup, the to/too/two group, flagging with alternatives, no false positives, case/apostrophe handling, multiple flags, self-exclusion, group integrity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
