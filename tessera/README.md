# Tessera

**A real, scannable QR code you can actually style — encoder, error correction, and all, in one HTML file with zero dependencies.**

Most "styled QR" tools are wrappers around a library, or they draw decorative grids that don't scan. Tessera implements the QR standard itself — byte/numeric/alphanumeric encoding, Reed–Solomon error correction over GF(256), all eight data masks with penalty scoring, and finder/alignment/timing/format/version placement — then renders it with shapes, colors, and a center logo on top. Every code is round-trip decoded and RS-syndrome-checked in the browser before it's shown, so the "Verified scannable" badge means the data actually reads back.

## Why it's cool

- The encoder is written from scratch (no `qrcode.js`, no network, no build step). Format-info and version-info bit patterns were validated against the published ISO/IEC 18004 tables.
- It self-verifies: after picking the best mask, it reads the rendered matrix back, de-interleaves the blocks, and confirms the Reed–Solomon syndromes are clean.
- Styling is layered on real modules, not faked — and it tells you when a style choice (low contrast, inverted colors, no quiet zone, or a large logo) is likely to defeat a phone camera even though the data is valid.
- Everything — payload and every style option — round-trips through the URL hash, so a styled code is just a shareable link.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. No server, no install, no network access. That's the whole app.

## Usage

**Content (left panel, three tabs):**
- **Text / URL** — any text or link.
- **Wi-Fi** — SSID, password, security type (WPA/WEP/None), hidden flag. Builds a spec-correct `WIFI:...` string that phones recognize as a join prompt.
- **Contact** — name, phone, email, organization. Builds a vCard.

**Styling:**
- **Module shape** — square, rounded, or dots.
- **Foreground / background** color pickers.
- **Subtle gradient fill** toggle.
- **Quiet zone** slider (0–8 modules). Scanners need margin; below 2 the badge warns you.
- **Error correction level** — L / M / Q / H. Higher levels sacrifice data capacity for damage tolerance.
- **Center logo** — pick an emoji or upload/drop an image. Tessera clears a padded knockout behind it and auto-bumps the ECC level to Q when a logo is present. The "Logo vs. correction budget" gauge shows how much of the error-correction headroom the logo consumes.

**The badge:**
- Green — data round-trips and the render is scanner-safe.
- Amber — data is valid but a render choice (low contrast, inverted light-on-dark, or no quiet zone) may stop real scanners.
- Red — verification failed or the content is too long for versions 1–10.

**Export & share:**
- **Download PNG** — rasterized from the canvas at higher scale for crisp printing.
- **Download SVG** — hand-built vector (rects/circles), sharp at any size, with a logo image embedded via both `href` and `xlink:href` for broad viewer compatibility.
- **Copy share link** — copies the current URL (payload + style live in the hash); falls back to a manual-copy path where the Clipboard API is blocked.

**Batch mode:** expand *Batch mode & print sheet*, paste one entry per line, and open a print-ready sheet of labeled vector codes using the current tab's format and styling.

## Scope & limitations

- Supports QR versions 1–10 with the standard alignment-pattern table — enough for typical URLs, Wi-Fi, and short vCards. Longer content prompts you to shorten it or lower the ECC level.
- Aggressive dot/rounded styling combined with a large logo at low ECC can still hurt scannability; the budget gauge, the amber badge, and the auto-bump to Q are the guardrails. Test a real scan before printing at size.

## License

MIT — see [LICENSE](LICENSE).
