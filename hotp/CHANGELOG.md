# Changelog

## 0.1.0
- First release. HOTP (RFC 4226) one-time password generator.
- From-scratch SHA-1, HMAC-SHA1, and dynamic truncation; Base32 or ASCII secret; 6/7/8 digits.
- 100% client-side. Dark mode, theme persistence.
- Headless test suite (10 checks: SHA-1, HMAC-SHA1 RFC 2202, all HOTP RFC 4226 vectors) + CI.
