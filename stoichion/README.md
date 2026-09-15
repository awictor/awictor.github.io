# Stoichion

Balance real chemical equations by feel — live atom tallies, instant verdict, shareable puzzles.

## Why it's cool

Balancing equations is the chemistry chore every student grinds through, and most web tools just print the answer. Stoichion turns it into a tactile puzzle: nudge each species' coefficient and watch a per-element atom ledger flip red-to-green as both sides converge. Under the hood it ships a real linear-algebra balancer — an **exact-fraction Gaussian null-space solver**, no floats — so it can both hint and verify that your answer is in lowest whole-number terms. Every board is a URL, so a puzzle is a link you can share.

One self-contained HTML file. No dependencies, no build step, no network calls.

## Features

- **~37 curated real reactions** across 7 classes: combustion, synthesis, decomposition, single & double displacement, acid–base, and redox.
- **Live atom ledger** — a left-vs-right tally per element that highlights red when unequal, green when matched, and pops on change.
- **Exact-rational balancer** — Gaussian elimination over fractions (not floats) finds the smallest positive-integer coefficients; powers both the reveal hint and lowest-terms grading.
- **Molar-mass strip + mass bars** — per-species molar mass from a baked-in IUPAC atomic-weight table, with a two-sided mass bar that equalizes when balanced.
- **Formula parser** handles nested parentheses, multi-digit subscripts, and hydrate dots (e.g. `CuSO4.5H2O`).
- **Streak + par scoring** — solve at or under par without revealing to keep your streak going; the next puzzle auto-deals.
- **Daily puzzle** — a deterministic board seeded by the date.
- **Difficulty tiers + class filter** — auto-derived from the answer, filterable from the toolbar.
- **Shareable boards** — full state (reaction id or encoded custom equation + coefficient vector + par) lives in the URL hash.
- **Custom mode** — type your own `A + B -> C + D` and it parses, tallies, and can balance it.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. That's the whole setup.

To share a specific board, click **Share board** to copy the current URL (or just copy it from the address bar), then send the link. Opening that link restores the exact puzzle and coefficients.

## Controls

Mouse: use each species' `−` / `+` steppers, or click a coefficient field and type a number (1–99).

Keyboard:

| Key | Action |
|-----|--------|
| `←` `→` `↑` `↓` | Nudge the focused species' coefficient |
| `1`–`9` | Focus a species |
| `Enter` | Check / commit |
| `R` | Reset all coefficients to 1 |
| `N` | Deal the next puzzle |

Toolbar buttons: **Deal** (next puzzle), **Daily** (today's seeded board), **Reset**, **Reveal (resets streak)**, **Share board**, plus a class filter, difficulty filter, and the custom-equation input.

The arrow locks green and your streak ticks up when every element balances **and** the coefficients are in lowest whole-number terms. **Reveal** fills in the answer but resets your streak — it's a real hint, not a free look.

## How it works

`index.html` is a single self-contained file: a `<style>` block for the dark lab UI, the markup shell, and a `<script>` containing the atomic-weight table, reaction deck, formula parser, a compact `Fraction` helper + Gaussian null-space balancer, render/verdict logic, and URL-hash encode/decode.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
