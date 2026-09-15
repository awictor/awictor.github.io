# Repoussé

**A pin-art desk toy in your browser — press a raised metal relief into a field of thousands of shimmering pins, and the board holds it.**

Repoussé recreates the classic pin-point impression desk toy: a board of steel pins that pops out into a 3D relief when you press something against the back. Here the whole thing is a lit field of metallic pins rendered in Canvas 2D. Drag anywhere and you push a smooth relief *up* out of the board (repoussé = shaping metal by hammering from behind), and — like the real toy — the board **keeps** the impression. A draggable light source rakes across the pins so the raised shapes catch a moving metallic sheen and cast tiny shadows, selling real depth from nothing but shaded dots.

## Why it's cool

The illusion is pure lighting math: every pin is a plain circle shaded by the local height gradient — Lambert diffuse + a half-vector specular highlight + valley ambient occlusion + a contact-shadow dot cast opposite the light. Move the light and every pin's highlight and shadow shift in real time, so a flat grid of dots reads as genuinely sculpted metal. No WebGL, no dependencies, no build step — one HTML file.

## Features

- **Press-and-hold relief** — drag to push a smooth Gaussian bump up out of the board; the impression is permanent and holds its shape. Push *in* to carve.
- **Draggable raking light** — grab the orange glow and drag it to sweep the metallic sheen across the raised shapes.
- **Four materials** — brushed brass, chrome, black steel, copper, each with its own base color, specular exponent, ambient, and highlight strength.
- **Emboss text** — type a word and it stamps as a raised relief, sampled from an offscreen text render onto the pin grid.
- **Randomize / Invert / Flatten** — value-noise rolling terrain, height inversion, and a double-click "shake flat" that jiggles the board clear.
- **PNG export** — save the current relief as a clean still frame (the light handle is hidden in the export).
- **Record loop → WebM** — sweeps the light in a full orbit and records a looping video (Chrome, Edge, or Firefox).
- **Shareable URL** — an embossed word or noise seed plus the chosen material are written to the URL hash, so a link reopens the exact relief.

## Run it

No install, no server, no network. Just open the file:

```
open index.html      # macOS
start index.html     # Windows
xdg-open index.html  # Linux
```

Or double-click `index.html` in a file browser. Any modern browser works; use Chrome, Edge, or Firefox if you want the WebM record loop.

## Controls

| Action | Gesture |
|---|---|
| Raise a relief | drag on the board |
| Push/carve in | hold **Alt** (or right-drag / **Shift**), or flip the **Raise / Carve** toggle |
| Move the light | drag the orange **glow** |
| Shake the board flat | double-click |
| Emboss a word | type in the field, hit **Enter** or **Emboss** |
| Adjust brush size / press strength | the **R** and **Force** sliders |

The **Raise / Carve** toggle makes push-in reachable on touch devices, where modifier keys aren't available.

## License

MIT © Alex Wictor
