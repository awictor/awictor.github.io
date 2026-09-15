# Heliotrope

**Paint light. Watch it grow toward you.**

Heliotrope is a single-file, zero-dependency procedural growth studio built on the
**space-colonization algorithm**. Paint a field of "light" (or nutrients, or substrate)
onto the canvas; Heliotrope scatters attractor points weighted by what you painted, then
grows a living branching structure toward the light before your eyes — trunk to twig,
thickening as it goes.

## Why it's cool

Space colonization is the algorithm behind believable trees, coral, veins, and lightning —
but you rarely get to *steer* it. Here the growth chases the light you paint, so the same
core produces four completely different organisms depending on how you light the field.

## Morphologies

- **Canopy** — a spreading tree, trunk to twig.
- **Reef** — branching coral.
- **Mycelium** — a fine fungal web.
- **Dendrite** — lightning / crystal growth.

## Features

- Paint an attractor/light field; growth follows where you paint.
- Deterministic from a seed — same seed + field ⇒ same organism.
- Branch thickening, animated grow-in.
- The whole creation (seed, params, and painted field) packs into the URL hash, so any
  growth is a shareable, reproducible link.
- Export a transparent PNG at any moment.

## Run it

No install, no build, no network. Download or clone, then double-click `index.html`
(or drag it into any modern browser). Optionally append a shared `#...` hash to reproduce
a specific growth.

## Note

This edition shipped straight from the build stage (the automated review/polish pass was
interrupted by an auth timeout mid-run). The core is syntax-verified and runs; if you spot
a rough edge, PRs welcome.
