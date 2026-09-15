# SubnetCalc

**IPv4 / CIDR subnet calculator** — enter an IP address and prefix (or paste `192.168.1.10/24`) to get the network address, broadcast, usable host range, subnet mask, wildcard mask, host counts, IP class, and public/private scope. One offline HTML file, no signup, no tracking.

👉 **[Open SubnetCalc](https://awictor.github.io/subnet-calc/)**

## Features
- Network + broadcast address, usable host range
- Subnet mask and wildcard (inverse) mask
- Total addresses and usable host count (RFC 3021 aware for /31, /32)
- IP class (A–E) and private / loopback vs public scope
- Paste a full CIDR into the IP field — the prefix auto-fills
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Every network engineer, sysadmin, and dev laying out a VPC needs the same quick answer: "what's the range for this CIDR?" SubnetCalc gives it instantly, offline, with no ads or trackers. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`ipToInt`, `intToIp`, `parseCidr`, `maskInt`, `subnetInfo`, `ipClass`, `isPrivate`) are covered by headless regression tests against known CIDR vectors; CI runs them on every push.

## License
MIT © Alex Wictor
