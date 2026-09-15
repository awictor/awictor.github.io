# Cyclonis

**A seeded gas-giant portrait generator — turbulent zonal bands and great storms on a projected sphere, in one HTML file.**

Cyclonis paints a Jupiter-style gas giant from a seed. It splits latitude into alternating belts and zones, each with its own zonal jet, then horizontally shears and domain-warps a seeded fractal-noise field by those jets so the bands smear into the streaky, marbled look of a real Jovian atmosphere. A handful of oval vortices (Great-Red-Spot-style storms) swirl in at band boundaries. The whole flat cloud field is projected onto a sphere with limb darkening, a day/night terminator, an atmospheric backscatter rim, and a starfield behind it.

Reseed for a new planet, tune the physics, export a PNG, and share the exact world via the seed in the URL hash.

## Why it's cool

Most generative-art toys are flat 2D patterns. Cyclonis takes a flat sheared-noise field and sells it as a *lit spherical planet*, so tiny tweaks to wind and turbulence produce wildly different but always-plausible worlds. It's physically motivated (zonal jets, band-boundary storms, a terminator) yet trivially small: zero dependencies, no build step, no network calls.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. That's the whole install. Everything runs client-side on a 2D canvas.

## How it works

- **Bands & jets** — latitude is divided into alternating belts/zones; a `sin(lat * bands)` term gives each an alternating zonal wind.
- **Turbulent clouds** — a seeded integer-hash value-noise fbm field is horizontally advected and domain-warped by those winds, producing the sheared, marbled bands.
- **Storms** — N oval vortices are placed at band boundaries and rendered by rotating/swirling the sampled field around each storm center, with a radial falloff so they blend into the surrounding bands. Eyes are tinted with the palette accent.
- **Sphere & light** — the flat field is projected per-pixel onto a sphere with limb darkening, a smooth day/night terminator driven by the sun angle, an atmospheric rim/backscatter tint, an anti-aliased limb, and a seeded starfield backdrop. Optional tilted ring and 0–3 sun-lit moons.

## Controls

| Control | What it does |
|---|---|
| **Palette** | Jovian ochre / ice-giant cyan / sulfur yellow / muted monochrome / hot brown-dwarf |
| **Turbulence** | How hard the jets shear and warp the cloud field |
| **Band density** | Number of belts/zones across latitude |
| **Storms** | Count of oval vortices at band boundaries |
| **Sun angle** | Moves the day/night terminator and limb darkening (readout in degrees) |
| **Moons** | 0–3 sun-lit moons; may cast a shadow eclipse spot on the day side |
| **Ring system** | Toggle a tilted Saturn-style ring |
| **Animate / spin** | Cloud drift + planet rotation via requestAnimationFrame |
| **Output size** | 400 / 560 / 720 / 900 px render |
| **Reseed** | New random seed |
| **Export PNG** | Save the current render (pauses animation so the frame is deterministic) |
| **Gallery** | Contact sheet of 12 worlds from sequential seeds — click one to open it full-size |
| **Copy link** | Copies the shareable URL |

### Keyboard shortcuts

- `r` — reseed
- `g` — open the gallery
- `Space` — toggle animation
- `Esc` — close the gallery

## Sharing & reproducibility

The seed and every control are encoded in the URL hash (e.g. `#3941002,0,60,12,3,42,1,1,560`). Reloading the page or opening a shared link reproduces the exact same world. Rendering is fully deterministic from that state — PNG export always captures the current frame, so what you share is what you see.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
