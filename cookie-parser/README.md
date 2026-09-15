# CookieParser

**Set-Cookie parser & security audit** — paste a `Set-Cookie` response header and get it broken into name, value, and attributes (Domain, Path, Expires, Max-Age, Secure, HttpOnly, SameSite), plus a hardening audit. One offline HTML file, no signup, no tracking.

👉 **[Open CookieParser](https://awictor.github.io/cookie-parser/)**

## Features
- Full attribute breakdown; value keeps everything after the first `=`
- Case-insensitive attribute names; whitespace tolerant
- **Security audit**: flags missing Secure / HttpOnly / SameSite, `SameSite=None` without Secure, and session cookies
- Dark mode; 100% client-side

## Why
`Set-Cookie` headers are dense and easy to misread, and the security attributes matter. CookieParser structures the header and points out common hardening gaps, offline — nothing (including your session tokens) leaves the browser. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseSetCookie`, `audit`) are covered by headless tests — attribute parsing, `=`-in-value, case-insensitivity, defaults, domain/expires/non-numeric Max-Age, whitespace, and the audit rules (clean, missing flags, SameSite=None). CI runs them on every push.

## License
MIT © Alex Wictor
