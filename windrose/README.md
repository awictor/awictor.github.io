# Windrose

**A single right triangle, subdivided forever — the Radin–Conway pinwheel tiling, where tiles face infinitely many directions.**

Windrose is a zero-dependency, single-file HTML toy that builds the pinwheel tiling: an aperiodic substitution tiling made from one right triangle (legs 1 and 2, hypotenuse √5) that subdivides into five smaller copies of itself. Each substitution step rotates the pieces by arctan(½) — an irrational multiple of π — so tiles end up pointing in ever more distinct orientations, producing a swirling, statistically rotation-invariant weave that never repeats.

## Why it's cool

Most aperiodic tilings (Penrose, Ammann–Beenker) use a handful of fixed tile orientations. The pinwheel is the canonical example that does *not*: crank the depth slider and watch the orientation histogram — the little "windrose" dial in the panel — fill out toward a uniform ring. It's built from one humble triangle by one deterministic rule, yet it looks organic rather than gridded. Click any tile and Windrose highlights its full substitution lineage back to the seed, so the fractal descent becomes visible.

The geometry is exact, not decorative: the five child transforms are affine matrices with determinant −0.2, i.e. scale exactly 1/√5 and a reflection, and the total tile area sums to exactly 1 at every depth (no gaps, no overlaps).

## Run it

No build, no dependencies, no network calls. Any modern browser works.

- **Double-click** `index.html`, or drag it into a browser tab.
- Optional local server (identical result): `python3 -m http.server` then open `http://localhost:8000/`.

Every view is encoded in the URL hash, so copying the address bar (or the 🔗 permalink button) shares the exact tiling, camera, colors, and selection you're looking at.

## Controls

| Action | How |
|---|---|
| Substitution depth (0–7) | Depth slider, or `−` / `+` buttons |
| Animate the inflation | **▶ Inflate** — tweens each triangle unfolding into its 5 children, cycling depths 1→7 |
| Pan | Drag the canvas |
| Zoom (toward cursor) | Mouse wheel |
| Rotate the whole tiling | `[` and `]` keys |
| Trace a tile's lineage | Click a tile (cursor turns to a pointer over tiles); click empty space to clear |
| Color mode | **orientation** (HSL by long-leg angle) · **supertile** (by substitution family) · **chirality** (reflected vs not) |
| Supertile outline | Level slider (0–4) overlays the parent-tile boundaries |
| Recolor | **🎨 recolor** — new random color seed; geometry is unchanged |
| Reframe | **⤢ fit** re-centers the seed triangle |
| Export | **↓ SVG** (true vector polygons) · **↓ PNG** (canvas raster) |
| Gallery | Preset views (Bloom, Families, Deep weave, Nesting, Parity) |

Depth 7 is ~78,000 tiles (5⁷); edge strokes auto-disable above 20,000 tiles to keep rendering smooth. SVG export at high depth produces large files — the toast reports the tile count.

## URL hash schema

State serializes to the hash as query-style params:

`s` seed · `d` depth (0–7) · `m` color mode (0 orientation, 1 supertile, 2 chirality) · `o` supertile-outline level · `sel` selected tile index (−1 = none) · `vs` view scale · `vr` view rotation (rad) · `vx` / `vy` view translation.

Example: `#s=42&d=6&m=0&o=0&sel=-1&vs=180.00&vr=0.0000&vx=...`

## The math

- **Seed:** right triangle with legs 1 and 2, hypotenuse √5.
- **Substitution:** decompose into 5 similar copies at scale 1/√5. Because 5 × (1/√5)² = 1, area is preserved exactly.
- **Rotation:** each step introduces a rotation of arctan(1/2) ≈ 26.565°, which is an irrational multiple of π — so orientations never close into a finite set, and the tiling is *statistically* rotation-invariant.
- Discovered by John Conway; proved to have that statistical rotational symmetry by Charles Radin (1994).

References: Charles Radin, *The pinwheel tilings of the plane*, Annals of Mathematics 139 (1994); Radin & Sadun on substitution tilings; Grünbaum & Shephard, *Tilings and Patterns*.

## License

MIT © 2026 Alex Wictor. See [LICENSE](LICENSE).
