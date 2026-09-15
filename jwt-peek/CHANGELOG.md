# Changelog

## 0.1.0
- First release. Offline JWT decoder: header, payload, and signature, all decoded locally.
- Claims summary with algorithm, subject/issuer/audience, issued-at, not-before, and expiry (valid/expired badge).
- base64url + UTF-8 safe; handles 2- or 3-part tokens; clear errors for malformed input.
- Dark mode, localStorage memory.
- Headless test suite (5 checks incl the canonical jwt.io token) + CI.
