# MacAddress

**MAC address formatter & inspector** — paste a MAC in any format and get it in colon, hyphen, Cisco-dot, and bare forms, with validation and unicast/multicast + universal/local flags. One offline HTML file, no signup, no tracking.

👉 **[Open MacAddress](https://awictor.github.io/mac-address/)**

## Features
- Accepts any separator (`:`, `-`, `.`, none) and reformats to all four styles
- Copy buttons per format; shows the OUI (vendor prefix)
- Flags **unicast vs multicast** (bit 0) and **universal vs locally administered** (bit 1)
- Dark mode; 100% client-side

## Why
MAC addresses show up in a dozen notations across tools, and normalizing or reformatting them by hand is error-prone. MacAddress does it instantly and decodes the address-type bits, offline. Pairs with IPv6 and SubnetCalc in the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`normalize`, `format`, `isValid`, `info`) are covered by headless tests — separator stripping, all four output styles, length/char validation, and the multicast/locally-administered bit decoding. CI runs them on every push.

## License
MIT © Alex Wictor
