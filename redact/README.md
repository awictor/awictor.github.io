# Redact

**Mask PII in text** — paste logs, tickets, or a snippet and automatically mask emails, phone numbers, credit-card numbers, US SSNs and IP addresses before you share it. One offline HTML file, no signup, no tracking.

👉 **[Open Redact](https://awictor.github.io/redact/)**

## Features
- Detects & masks emails, phones, 13–16 digit card numbers, SSNs (`###-##-####`), and IPv4 addresses
- Toggle each category on/off; live count of what was found
- Two masking styles: category labels (`[EMAIL]`) or length-preserving bullets (`•••`)
- Copy button, dark mode; **100% client-side — nothing is uploaded**

## Why
Pasting a stack trace or a customer record into a chat or bug report is a routine data leak. Redact scrubs the obvious identifiers first, locally, so you can share safely. Part of the [Toolkit](https://awictor.github.io/toolkit/).

> Pattern-based, not a guarantee. Always review the output before sharing sensitive data.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`redact`, `findPii`, `PATTERNS`) are covered by headless tests across all five categories, both masking styles, independent category selection, and clean-text no-ops; CI runs them on every push.

## License
MIT © Alex Wictor
