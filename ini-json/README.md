# INI ⇄ JSON

Convert **INI config files to JSON and back**. Sections become nested objects, root keys stay at the top, and `;`/`#` comments are ignored. Values stay as strings so a round-trip is lossless. One offline HTML file, no signup, no tracking.

👉 **[Open INI ⇄ JSON](https://awictor.github.io/ini-json/)**

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseINI`, `toINI`) are covered by headless tests — section nesting, root keys, comment/blank-line skipping, whitespace trimming, first-`=` splitting, string values, the `[section]` output order, a lossless round-trip, section-only input, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
