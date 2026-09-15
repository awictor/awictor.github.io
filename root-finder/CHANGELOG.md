# Changelog

## v0.1.0 — 2026-09-11

Initial release.

- Solve f(x) = 0 by bisection (bracketed) or Newton's method (from a guess)
- Embedded recursive-descent parser for f(x): powers, functions, constants (no eval)
- Shows the residual at the found root; guards against bad brackets and stalled derivatives
- Dark mode with persistence, fully offline, no dependencies
- 10 self-tests including √2, cos roots, a cubic, and no-sign-change handling
