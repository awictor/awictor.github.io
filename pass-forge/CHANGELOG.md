# Changelog

## 0.3.0
- Passphrase mode — generate memorable multi-word passphrases (461-word list) with a choice of separator, capitalization, and an appended number, each with its own entropy estimate.
- Fixed a coverage bug where character-set guarantee could overwrite an already-covered set; now guaranteed by construction (seed one per set, fill, shuffle).
- Added pure joinPassphrase(), passphraseEntropy(), generatePassphrase().

## 0.2.0
- Guaranteed character coverage — a generated password now always includes at least one character from every selected set (when length allows), so "require symbols" is actually enforced.
- Added pure setsFor() and hasAllSets() helpers.

## 0.1.0
- First release. Password generator with cryptographically-secure randomness (`crypto.getRandomValues`).
- Adjustable length (4–128) and character sets (lower, upper, digits, symbols); exclude look-alikes.
- Live strength meter: entropy in bits, strength label, and estimated offline crack time.
- One-tap copy, dark mode, localStorage memory.
- Headless test suite (6 checks) + CI.
