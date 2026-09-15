# Slipway

**A procedural starship drydock that fabricates crisp, annotated blueprint schematics from a single seed.**

Type or roll a seed and Slipway deterministically builds an original spacecraft — hull, plating, greebles, thrusters, sensor masts, weapon hardpoints — and renders it as a full engineering blueprint: orthographic top / side / front views drawn as razor-sharp SVG line art, laid over a drafting grid inside a proper title block with a generated ship name, class designation, registry number, service record, and live spec table.

## Why it's cool

One parametric ship model, projected into three consistent orthographic views — not three unrelated drawings. The blueprint framing (grid, dimension leaders, callouts, first-angle projection symbol, title block, generated lore) makes every output read like a real spec sheet from a fictional shipyard. Same seed always yields the same ship, and the entire configuration lives in the URL hash, so any blueprint you make is one paste away for anyone else. Zero dependencies, zero network calls, one file.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a browser window. There is no build step and no server.

Append a shared hash to reproduce a specific ship, e.g. `index.html#seed=nova-1234&fac=military&class=cruiser`. The **⧉ Link** button copies the current URL for exactly this purpose.

## Features

- **Seeded, deterministic generation** — same seed produces an identical ship; the full state is encoded in the URL hash for instant sharing.
- **Modular hull synthesis** — the seed picks a hull class (interceptor / frigate / cruiser / carrier / hauler) and grows a mirrored fuselage from spline-defined sections, with fins, nacelles, engine clusters, sensor masts, containers, and paneling.
- **Greeble & panel-line layer** — adjustable-density surface detailing (frames, longerons, hatches, rivets, windows) for hand-drawn technical texture.
- **True blueprint presentation** — three orthographic projections over a drafting grid, dimension leaders, callout labels, a specification sheet, and a title block with generated name, registry, class, commissioning date/sector, motto, and service record.
- **Era / faction presets** — Standard Registry, Retro Patent, Military Stencil, Alien Organic, Industrial Hauler each reshape geometry, fonts, stroke weight, greeble style, and default palette.
- **Fleet Sheet mode** — render 4 / 6 / 9 / 12 hulls as a single shareable shipyard catalog poster.
- **Animated ink reveal** — an optional line-drawing animation on new ships (draws frame → top → side → front, then inks the title block).
- **Themes** — Classic Cyan Blueprint, Dark Schematic, Ivory Patent Drawing.
- **Export** — download the current schematic as a standalone SVG or a rasterized PNG (2×), plus Copy Link for the seeded URL.

## Controls

| Control | What it does |
|---|---|
| **Seed** field + **⟳ Roll** | Type a seed and commit (Enter or blur), or roll a random one. Empty commits keep the current seed. |
| **Presentation Mode** | Toggle SINGLE DRAFT vs FLEET SHEET. |
| **Fleet Size** | Number of hulls on the fleet catalog (fleet mode only). |
| **Hull Class** | Force a class, or let the seed decide. |
| **Era / Faction Style** | Preset that reshapes geometry, fonts, and default theme. |
| **Blueprint Theme** | Cyan / Dark / Ivory palette. Picking one manually locks it against faction defaults. |
| **Engine Count** | Force engine count, or let the seed decide (single-draft mode). |
| **Greeble Density** | Surface-detail density, 0×–2×. |
| **Bilateral symmetry** | Mirror the fit-out, or allow asymmetric detailing. |
| **Animated ink reveal** | Master on/off for the draw-in animation. |
| **⧉ Link / ↓ SVG / ↓ PNG** | Copy shareable URL, download SVG, download PNG. |

The reveal animation only replays on intentional new-ship events (load, Roll, seed change, mode/fleet switch, opening a shared link); incidental tweaks like theme or greeble redraw instantly.

## Sharing & reproducibility

Everything needed to rebuild a ship — seed, class, faction, theme, engine count, greeble density, symmetry, mode, fleet size — is serialized into the URL hash. Copy the link and anyone who opens it gets the exact same blueprint. This is the app's core promise, so the seeded random sequence is treated as a stable contract.

## Tech

Single self-contained `index.html`: a seeded PRNG (xmur3 + mulberry32), a parametric ship-geometry synthesizer working in metres, a shared orthographic projector feeding the three views, an SVG blueprint renderer, the control-panel UI, URL-hash state sync, and dependency-free SVG/PNG export. No frameworks, no build, no network.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
