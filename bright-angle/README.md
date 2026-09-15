# Bright Angle

**An interactive optics essay that traces sunlight through a single raindrop to show why every rainbow sits at 42°.**

Most rainbow explainers *draw* a colored arc. Bright Angle **simulates** one. You drag a real ray of light into a magnified water droplet and watch it refract, reflect, and exit under actual geometric optics — then you watch the rainbow fall out of the math. It's a physics-honest rainbow you build with your own hands, and any configuration is one shareable link away.

## The physics in three lines

- Light entering a spherical drop obeys **Snell's law**, reflects once off the back wall, and refracts out; its total deviation is `Δ = 180° + 2θᵢ − 4θᵣ`.
- `Δ` has a **minimum** near an impact parameter `b ≈ 0.86`, so parallel rays pile up there into a bright edge (a *caustic*) — that concentration of light **is** the rainbow, at `180° − Δ_min ≈ 42°`.
- Water's refractive index depends on wavelength, so each color minimizes at a slightly different angle (**red ≈ 42.4°, violet ≈ 40.6°**) and the caustic smears into a spectral band.

Everything on screen is computed, not painted: real per-ray **Fresnel coefficients** make the primary bow bright, the secondary faint, and Alexander's dark band dark.

## Features

- **Single-ray inspector** — drag the entry point on a glass droplet; see live Snell refraction, internal reflection, exit, and a running deviation readout in the HUD.
- **Ray-fan caustic** — fire dozens of parallel rays and watch light bunch at the minimum-deviation angle. The rainbow "appears."
- **Descartes deviation plot** — a linked chart of deviation vs. impact parameter with the analytic minimum marked, tying the abstract curve to the ray picture.
- **Dispersion / wavelength slider** — change color, watch the index and minimum angle shift, and paint the full red→violet band.
- **Full-sky assembly** — the complete arc: primary bow, reversed-color secondary bow, and Alexander's dark band. Lower the sun and the bow rises.
- **Scrollytelling narrative** — six captioned steps walk one ray → many rays → the curve → color → the sky, each driving the same live simulation.
- **Shareable URL-hash state** — every configuration (mode, ray, wavelength, sun altitude, bow, colorblind mode, step) is serialized to the hash. Copy the link, land someone on the exact frame.
- **Accessibility** — colorblind-safe (cividis) color mapping, keyboard controls, visible focus rings, and full `prefers-reduced-motion` support.

## Run it

Open `index.html` in any modern browser — double-click it or drag it into a tab. Zero dependencies, zero build, zero network calls.

To preset the app, append a hash. Examples:

- `index.html#m=sky&sun=8&bow=both&cb=0` — full double-bow sky
- `index.html#m=fan&fan=72&wl=590&bow=primary` — the caustic forming
- `index.html#m=dispersion&wl=450` — the red-vs-violet band

Hash keys: `m` (mode: `ray`/`fan`/`plot`/`dispersion`/`sky`), `b` (impact parameter), `wl` (wavelength nm), `sun` (altitude °), `fan` (ray count), `bow` (`primary`/`secondary`/`both`), `cb` (`0`/`1` colorblind-safe), `step`.

## Controls

| Input | Action |
|-------|--------|
| Drag on the drop | Move the ray's entry point (impact parameter) |
| `↑` / `↓` | Nudge the ray |
| `←` / `→` | Change wavelength (color) |
| `space` | Start / pause the guided auto-play tour |
| Mode buttons | Single ray · Ray fan · Deviation curve · Dispersion · Sky view |
| Bow buttons | Primary · Secondary · Both |
| Color: CIE / CVD-safe | Toggle CIE spectral colors vs. colorblind-safe mapping |
| Copy share link | Copy the current configuration as a URL |

The sliders dim in modes where they have no effect, so it's always clear which knob matters.

## License

MIT — see [LICENSE](LICENSE).
