# Changelog

## 0.1.0
- First release. JWT encoder & HMAC signer.
- HS256/HS384/HS512 signing via Web Crypto; alg read from header.
- Live color-coded token, JSON validation, copy button, dark mode, localStorage memory.
- Secret never leaves the browser.
- Headless test suite (9 checks incl. canonical jwt.io HS256 vector) + CI.
