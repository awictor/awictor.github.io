# Changelog

## 0.1.0
- First release. Verhoeff check-digit generator and validator.
- Uses the correct permutation table (many copy-pasted versions have a corrupted row 2 that leaks transpositions); verified to catch all single-digit errors and all adjacent transpositions.
- 100% client-side, dark mode, theme persistence.
- Headless test suite (10 checks incl. an exhaustive transposition sweep) + CI.
