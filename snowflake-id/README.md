# SnowflakeId

**Snowflake ID decoder** — paste a 64-bit Snowflake ID (Discord, Twitter/X) and see its embedded timestamp, worker id, process id, and per-millisecond increment. One offline HTML file, no signup, no tracking.

👉 **[Open SnowflakeId](https://awictor.github.io/snowflake-id/)**

## Features
- Decode into timestamp (UTC), worker, process, and increment
- Toggle between the Discord (2015) and Twitter/X (2010) epochs
- Handles the full 64-bit range via BigInt (no precision loss)
- Encode helper to build an ID from parts; dark mode; 100% client-side

## Why
Snowflake IDs from Discord, Twitter, Instagram, and similar systems embed their creation time — so an ID *is* a timestamp. SnowflakeId unpacks it offline, which is handy for debugging, moderation, and data forensics. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`decode`, `encode`) are covered by headless tests — epoch constants, the zero-id = epoch case, encode/decode round-trips, field masks and maxima, a real Discord ID landing in 2016, the epoch offset, BigInt-range ids, the 12-bit increment rollover, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
