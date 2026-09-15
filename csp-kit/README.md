# CSPKit

**Content-Security-Policy builder & auditor** — paste a CSP header value to format it, minify it back to a single line, and audit it for common weaknesses (wildcards, `'unsafe-inline'`, `'unsafe-eval'`, insecure `http:` sources, missing script fallback). One offline HTML file, no signup, no tracking.

👉 **[Open CSPKit](https://awictor.github.io/csp-kit/)**

## Features
- Formats a messy CSP one directive per line, and minifies to a clean header value
- Audit flags high/medium issues with plain-English explanations
- Strict and basic starter policies
- One-click copy for both formats; dark mode; remembers your input
- 100% client-side; works offline — your policy is never uploaded

## Why
A Content-Security-Policy is one of the highest-leverage web defenses, but it's fiddly to write and easy to weaken by accident. CSPKit makes the policy readable and points out the parts that undercut it. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseCsp`, `buildCsp`, `formatMultiline`, `analyze`) are covered by headless regression tests, including round-trip stability and every audit rule; CI runs them on every push.

## License
MIT © Alex Wictor
