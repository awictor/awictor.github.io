# Hyphae

**Cultivate a single mycelial colony until it eats the whole dish — then sporulate and start richer.**

A compact, zero-dependency growth incremental about tending one living fungal colony in a petri dish. Biomass accretes continuously from your hyphal network; you reinvest it into five compounding upgrades that grow the colony faster and faster. When growth stalls, you **Sporulate** — a prestige that wipes biomass and upgrades but releases Spores that grant a permanent, stacking growth multiplier so every run reaches farther.

## Why it's cool

The whole game is one screen and one organism. A live `<canvas>` draws the mycelium as radial branching filaments that lengthen, thicken, and fill the dish as your numbers climb — progress you *see*, not just read. Glowing fruiting-body tips pulse, milestones pop rings into the agar, prestige bursts a shower of spores, and the strain re-tints its hue each rebirth. It's a single HTML file you can open and star in ten seconds: no build, no dependencies, no network.

## Features

- **One compounding resource** — Biomass accrues per second from your hyphal network.
- **Five escalating upgrades** (each costs ×1.15 per buy):
  - **Hyphal Tips** — +1.2 base growth each
  - **Moisture** — ×1.15 growth per level
  - **Nutrient Broth** — ×1.28 growth per level
  - **Enzymes** — ×1.22 growth per level
  - **Anastomosis** — each level multiplies growth by ×(1 + 0.08 · tips), so tips and network scale together
- **Sporulate prestige** — release Spores earned from lifetime biomass (`floor(sqrt(lifetime / 1e6))`); each Spore adds a permanent +0.5× to growth and advances the strain tier. A progress bar tracks lifetime toward your next spore.
- **Live canvas visual** — deterministic branching filaments sized by `log(biomass)`, breathing glow, milestone pops, a prestige spore-burst, a glass rim, and a hand-labeled strain sticker.
- **Offline progress** — computed on load (capped at 12h) with a friendly "while you were away" summary.
- **Decision-support HUD** — live growth/sec, a ranked **★ best** next-buy hint by payback time, and a rebirth preview of spores-if-you-sporulate-now.
- **Tasteful number formatting** — K / M / B / T, then e-notation.
- **Autosaves** to `localStorage` every 4s (and on close). HiDPI-crisp and responsive down to phone widths.

## Run it

Open `index.html` in any modern browser. That's it — no build, no dependencies, no network. Progress autosaves to your browser's `localStorage`.

```
# optional: serve it locally instead of opening the file directly
python3 -m http.server 8000   # then visit http://localhost:8000
```

## How to play

- Watch **Biomass** tick up from your growth rate.
- Click an upgrade to buy it (greyed out until you can afford it). Follow the **★ best** marker for the fastest payback.
- Growth compounds, so early buys snowball the later ones.
- When growth stalls, **Sporulate**. The button shows how many spores you'll get and your new multiplier; the first time, it asks you to tap again to confirm (so a stray click can't wipe an unprestiged run).
- Each rebirth resets biomass and upgrades but keeps your spores and their permanent multiplier — so every run reaches farther and the strain shifts hue.

## License

MIT — see [LICENSE](LICENSE).
