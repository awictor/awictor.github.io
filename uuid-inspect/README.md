# UuidInspect

**UUID inspector** — validate a UUID and reveal its version, variant, and (for v1 and v7) the embedded timestamp. Recognizes nil and max UUIDs too. One offline HTML file, no signup, no tracking.

👉 **[Open UuidInspect](https://awictor.github.io/uuid-inspect/)**

## Features
- Version (1–8) and variant (RFC 4122, NCS, Microsoft, reserved) detection
- Timestamp extraction for time-based v1 (Gregorian 100-ns) and v7 (Unix ms)
- Flags the nil and max UUIDs; accepts uppercase and trims whitespace
- Preset examples; dark mode; 100% client-side

## Why
When a UUID shows up in a log or database you often want to know "what kind is this, and when was it made?" UuidInspect decodes it instantly and offline — no pasting IDs into a web service. Pairs with the UUID generators in the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The pure `inspectUuid` function is covered by headless tests — invalid input, v1/v3/v4/v5/v7 version detection, all variant ranges, nil/max flags, and v1/v7 timestamp extraction verified by round-tripping a known time. CI runs them on every push.

## License
MIT © Alex Wictor
