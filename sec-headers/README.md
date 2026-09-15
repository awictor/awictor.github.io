# SecHeaders

**HTTP security headers analyzer** — paste a site's response headers and get a per-header pass / warn / fail audit plus a letter grade. Checks the headers that matter for XSS, clickjacking, TLS, and privacy. One offline HTML file, no signup, no tracking.

👉 **[Open SecHeaders](https://awictor.github.io/sec-headers/)**

## Checks
- **Strict-Transport-Security** — present with a max-age ≥ 6 months
- **Content-Security-Policy** — present
- **X-Frame-Options** (or CSP `frame-ancestors`) — clickjacking protection
- **X-Content-Type-Options** — `nosniff`
- **Referrer-Policy** and **Permissions-Policy** — privacy / feature lockdown

## Why
Security headers are the cheapest hardening you can ship, but they're easy to forget and awkward to eyeball across a `curl -I` dump. SecHeaders scores them instantly and offline, so you never paste a production response into a third-party site. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseHeaders`, `analyze`, `grade`) are covered by headless tests — header parsing with colon-bearing values, grade thresholds, a fully hardened 100/A response, an empty 0/F response, short-HSTS warnings, CSP `frame-ancestors` clickjacking coverage, case-insensitivity, and pre-parsed input. CI runs them on every push.

## License
MIT © Alex Wictor
