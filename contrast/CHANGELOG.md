# Changelog

## 0.2.0
- Suggest a passing color — when the foreground fails AA, one click nudges it toward black or white (whichever needs the least change) until it clears 4.5:1.
- Added pure mix() and suggestColor() helpers.

## 0.1.0
- First release. WCAG color contrast checker: exact ratio + AA/AAA pass-fail for normal and large text.
- WCAG 2.x relative-luminance math; shorthand hex (#abc) supported.
- Native color pickers + hex inputs, swap button, live preview.
- Shareable link (both colors in URL), dark mode, localStorage memory.
- Headless test suite (6 checks against known WCAG values) + CI.
