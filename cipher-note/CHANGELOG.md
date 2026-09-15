# Changelog

## 0.1.0
- First release. Passphrase text encryption.
- AES-256-GCM with PBKDF2 key derivation (100k iterations, SHA-256).
- Random salt + IV per message; encrypt/decrypt modes; tamper detection.
- Dark mode, one-click copy. All client-side via Web Crypto.
- Headless async test suite (7 checks: round-trip, wrong pass, tamper) + CI.
