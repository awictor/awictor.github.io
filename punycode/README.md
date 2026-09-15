# Punycode / IDN Converter

**Convert internationalized domain names between Unicode and Punycode (`xn--`).** Implements the RFC 3492 bootstring algorithm, converting each domain label in both directions. One offline HTML file, no signup, no tracking.

👉 **[Open Punycode / IDN](https://awictor.github.io/punycode/)**

## Features
- Unicode → ASCII (`münchen.de` → `xn--mnchen-3ya.de`)
- ASCII → Unicode (`xn--n3h.com` → `☃.com`)
- Per-label conversion — pure-ASCII labels pass through unchanged
- Homograph / look-alike warning when an `xn--` host decodes to non-ASCII
- Dark mode; 100% client-side

## Why
DNS is ASCII-only, so IDN domains are encoded to `xn--` + Punycode. Decoding a suspicious `xn--` host reveals its real characters — useful for spotting phishing/homograph domains that impersonate trusted brands with confusable Unicode.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`encode`, `decode`, `toASCII`, `toUnicode`) are covered by headless tests — the canonical `bücher`→`bcher-kva`, `münchen`→`mnchen-3ya`, `☃`→`n3h` vectors, round trips across scripts, per-label domain handling, and inverse composition. CI runs them on every push.

## License
MIT © Alex Wictor
