# Everywhen

**See the shape of a cron schedule.**

Everywhen is a zero-dependency, single-file cron explainer that does one thing crontab.guru can't: it renders the *fire fingerprint* of any schedule as a glanceable heatmap grid — so you can literally see whether your backup runs too often, clusters at 3am, or never fires at all.

## Why it's cool

A cron string is an abstract, error-prone token soup. Everywhen turns it into something you can read at a glance and recognize by silhouette. Type an expression and you instantly get plain English, the next 10 fire times in your timezone, a per-field breakdown, and a day-of-week × hour density grid painted on canvas. A lonely single cell versus a dense stripe of every-minute tells you more than any text ever will — and it's shareable via URL.

## Features

- **Robust 5-field parser** — ranges (`1-5`), steps (`*/15`, `5/10`), lists (`1,3,5`), names (`MON`, `JAN`), and `@hourly`/`@daily`/`@weekly`/`@monthly`/`@yearly` macros, with precise per-field error messages.
- **Plain-English translation** — e.g. `30 3 * * 1,5` → *"At 03:30 on Monday and Friday."*
- **Live-ticking next 10 fire times** — computed in the browser in your chosen timezone, with a live countdown and UTC-offset / DST-caveat badges.
- **Fire fingerprint** — a 7×24 (day-of-week × hour) canvas heatmap whose cell intensity shows how often the schedule fires in each slot over a full reference year. Correctly implements the classic *"DOM and DOW are OR when both restricted"* rule, so impossible dates (e.g. Feb 30) show as *never fires*.
- **Health readout** — fires-per-week, mean gap, longest quiet gap, and a status chip that flags pathological schedules (never fires / fires every minute / high frequency).
- **Diff mode** — overlay two schedules on the fingerprint (A = cyan, B = orange, both = purple) and get a full side-by-side of English, field chips, health, and next fires for each.
- **Export & share** — PNG and SVG fingerprint export, copy the raw cron, copy a crontab line with a human-readable `# comment`, and a URL-hash share link. A categorized preset gallery (Backups / Polling / Business hours / Cleanup) gets you started fast.

## Run it

No build, no dependencies, no network calls.

- **Double-click `index.html`** (or drag it into a browser tab).

Optionally deep-link a schedule via the URL hash:

```
index.html#a=30%203%20*%20*%201,5&tz=America/New_York
```

Hash params: `a` (schedule A), `b` (schedule B), `diff=1` (enable diff mode), `tz` (IANA timezone).

> **Clipboard note:** the copy/share buttons work best on Chromium and over `http(s)`/`localhost`. Firefox does not reliably expose the async Clipboard API on the `file://` origin; Everywhen falls back to a legacy copy path, but if a copy fails, serve the file locally (e.g. `python -m http.server`) and reload.

## Usage

- **Type** a cron expression in the top box; everything updates live.
- **Timezone picker** recomputes next-fire times and badges in the selected zone.
- **⇄ Diff** reveals a second input and compares two schedules.
- **⭳ PNG / ⭳ SVG** export the fingerprint; **⧉** buttons copy the cron or a commented crontab line; **🔗** copies a shareable link.
- **Preset gallery** loads common schedules with one click.

## Caveats

Next-fire stepping is wall-clock local time. Around daylight-saving transitions, local fire times may skip (spring-forward) or repeat (fall-back) — Everywhen surfaces a DST badge for zones that observe it rather than over-engineering the edge.

## License

MIT — see [LICENSE](LICENSE).
