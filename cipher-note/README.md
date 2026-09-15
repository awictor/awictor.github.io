# CipherNote

**Passphrase text encryption (AES-256-GCM)** — encrypt a note with a passphrase and share the resulting blob; decrypt it anywhere with the same passphrase. All in your browser via the Web Crypto API. One offline HTML file, no signup, no tracking.

👉 **[Open CipherNote](https://awictor.github.io/cipher-note/)**

## Features
- AES-256-GCM authenticated encryption (detects tampering)
- Key derived from your passphrase with PBKDF2 (100k iterations, SHA-256)
- Random salt + IV per message, bundled into one base64 blob
- Encrypt / decrypt modes; one-click copy; dark mode
- 100% client-side; works offline — nothing is ever uploaded

## Security notes
The passphrase never leaves your device and there is **no recovery** — lose it and the note is unrecoverable. Share the blob and the passphrase over separate channels. This is solid, standard cryptography, but for high-stakes secrets use audited, purpose-built tools.

## Why
Sometimes you just need to send a sensitive note through an untrusted channel (chat, email, a sticky note). CipherNote turns it into an opaque blob that only your passphrase can open, with no accounts or servers. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Async tests cover the encrypt→decrypt round-trip, wrong-passphrase failure, tamper detection (GCM auth), too-short input handling, base64 round-tripping, and that repeated encryptions differ (random salt/IV). CI runs them on every push.

## License
MIT © Alex Wictor
