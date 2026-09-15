# Mordant

**A subtractive-color dye-vat arcade: catch pigments, mix the exact hue, fill the order before it dries.**

Mordant turns the color theory you half-remember from art class into a twitch game. You run a dye vat at the bottom of the screen while cyan, magenta, yellow, and solvent drops fall down four lanes. Catch a drop and it stirs into your vat using real subtractive (CMY) color math — cyan cuts red, magenta cuts green, yellow cuts blue, solvent lifts everything back toward white. A queue of fabric orders demands specific target colors; steer the vat, nudge your mix into tolerance, and deliver before each order dries out and costs you a life.

## Why it's cool

- **The mixing is real, not faked.** Every caught pigment is a genuine multiply-absorption step, and matches are scored in CIELAB (CIE76 ΔE) — perceptual color distance, not naive RGB. You literally watch cyan + yellow crawl toward the green an order wants.
- **You plan, not guess.** Each lane shows a live ghost swatch previewing what your vat becomes *after* catching that lane's pigment, and the ring around the vat tightens as your ΔE drops (and turns green in tolerance).
- **Seeded and shareable.** The drop and order sequence is driven by a deterministic seed stored in the URL hash, so you can race a friend on the exact same run with zero backend.

## Run it

No build, no server, no dependencies. Open `index.html` in any modern browser (double-click it, or drag it into a tab). That's the whole app — one file.

## Controls

| Action | Keys |
|---|---|
| Steer the vat | `←` / `→` or `A` / `D` (or move the pointer / drag) |
| Deliver to the highlighted order | `Space` (or tap / the **Deliver** button) |
| Rinse-dump the vat to white | `R` (or the **Rinse-dump** button) |
| Toggle colorblind aid | `C` |
| Start / replay | any key or tap |

## How it plays

- **Match & deliver.** The order card with the accent (`▸`) outline is the one `Space` will fill — it's whichever on-screen order your current vat color is closest to. When its ΔE drops within tolerance the card gets a green ring; deliver then to score.
- **Perfect batches build combos.** Delivering well inside tolerance chains a combo streak that multiplies points and raises the audio pitch. A sloppy-but-valid delivery resets the streak.
- **Rinse is an escape hatch with a cost.** `R` resets the vat to white so you can start a mix clean — but it dries *every* active order about 2 seconds faster, so use it deliberately.
- **It ramps.** As your score climbs, drops fall faster, more orders stack up at once, and the delivery tolerance shrinks. A brief on-canvas toast announces each new level.
- **Lives.** Letting an order dry out costs a life. Three dried orders ends the run.

## Sharing a run

Click **Share seed** to copy the current URL (it encodes the seed and your best score). Anyone who opens that link plays the identical drop/order sequence. On a `file://` origin where the clipboard is blocked, the seed is still written into the address bar — just copy it manually.

## Accessibility

- **Colorblind aid (`C`)** adds numeric H/S/L readouts to every swatch and distinct diagonal-stripe patterns to the order cards, on top of the always-on ΔE numbers.
- **Reduced motion.** If your OS requests reduced motion (`prefers-reduced-motion`), the screen shake and full-screen flash are suppressed in favor of a subtle accent border pulse.

## License

MIT — see [LICENSE](LICENSE).
