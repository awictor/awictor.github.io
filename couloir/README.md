# Couloir

A one-key wall-kick ascent up an endless alpine gully — climb faster than the rising scree.

## Why it's cool

Everyone's played a Doodle-Jump-style ascent. Couloir inverts the feel: instead of bouncing on platforms, you actively kick off the rock walls of a narrowing snow gully. Your climber clings to one wall and slides down under gravity — a single tap launches a gravity-arced diagonal leap to the opposite wall. The tension comes from a rising, accelerating wall of scree that punishes hesitation, and from a **clean near-miss combo**: grazing a rock spur without hitting it banks a multiplier, so the game rewards shaving the line past a spur rather than playing it safe. Instantly readable, hard to master, and every run is deterministic from a seed so scores are shareable and grindable.

It's a single self-contained `index.html` — no build step, no dependencies, no network calls.

## Features

- **One-key wall-kick** — tap to arc-leap across the gully; the climber auto-slides down otherwise, so the loop is constant rhythmic tapping.
- **Seeded rock spurs** — chockstones jut from both walls at deterministic intervals. Thread the gap to climb; touch one and you fall.
- **Rising scree floor** — climbs from the bottom and accelerates as you gain altitude. Slide too long and it swallows you.
- **Clean near-miss combo** — grazing a spur tip banks a multiplier that decays each time you re-cling, rewarding tight, aggressive lines.
- **Escalating difficulty** — the gully pinches narrower and the scroll speed ramps as altitude climbs.
- **Biome theming** — the sky and rock palette lerps through Forest → Snowfield → Alpenglow → Aurora/starfield as you climb, with parallax stars and aurora bands up high.
- **Telegraphed wind gusts** — deterministic gusts curve the leap arc, with drift streaks and a whoosh on gust onset.
- **Daily seed + ghost replay** — play the daily seed and race a translucent ghost of your best prior run on that seed.
- **End-of-run summary** — max altitude, best combo, and clean-line %, plus a one-click "Copy seed + score" share string.
- **Persistent high score** (localStorage), one-key restart, and URL-hash seeds for shareable deterministic runs.
- **Juice** — snow-puff cling bursts, chalk-dust trail, near-miss screen shake, hitstop on clean grazes, and short WebAudio blips.
- **Accessibility** — honors `prefers-reduced-motion` (screen shake and combo pulse damped), keyboard focus rings, and an in-game mute toggle.

## Run it

No build, no install. Either:

- **Double-click `index.html`** to open it in any modern browser, or
- Serve the folder and open the URL, e.g. `python -m http.server` then visit `http://localhost:8000`.

Serving over `http://` or `https://` is optional but lets the native Clipboard API handle the share button; on a `file://` origin Couloir falls back to a copy shim and still works.

## Controls

| Action | Key |
|--------|-----|
| Wall-kick / leap | `Space`, `↑`, `W`, click, or tap |
| Restart (from start / game-over) | same leap key, or the on-screen button |
| Mute / unmute | `M` |

## Seeds

- Append `#seed=NAME` to the URL for a shareable deterministic run — the same seed always produces the same spur field.
- Click **Daily** (or use `#daily`) to play the shared daily seed, and race the ghost of your best run on it.
- The seed drives spur placement only, never physics, so runs stay fully reproducible.

## License

MIT — see [LICENSE](LICENSE).
