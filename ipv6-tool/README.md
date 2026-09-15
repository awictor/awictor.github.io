# IPv6

**IPv6 address expander & compressor** — expand `::` shorthand to the full 8-group form, compress any address to its shortest canonical form, and validate it. One offline HTML file, no signup, no tracking.

👉 **[Open IPv6](https://awictor.github.io/ipv6-tool/)**

## Features
- Expand: fills the `::` gap and zero-pads every group to 4 hex digits
- Compress: drops leading zeros and collapses the longest zero run to `::` (first run wins on ties, RFC 5952 style)
- Validation with clear pass/fail; handy presets
- Copy buttons; dark mode; 100% client-side

## Why
IPv6 has many equivalent spellings of the same address, and comparing or normalizing them by hand is error-prone. IPv6 gives you the canonical expanded and compressed forms instantly, offline. Pairs with SubnetCalc in the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`expand`, `compress`, `isValid`) are covered by headless tests — `::` expansion (including `::1` and `::`), padding, longest-zero-run compression with the first-run tiebreak, the single-zero-group case, round-trips, and rejection of malformed input. CI runs them on every push.

## License
MIT © Alex Wictor
