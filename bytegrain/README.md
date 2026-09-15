# Bytegrain

**Drop any file and see its byte-level grain — structure, strings, and entropy, drawn on a space-filling curve.**

Bytegrain is a single self-contained HTML file (zero dependencies, zero build, zero network) that turns any file you drop on it into a picture of its bytes. Each byte becomes one cell laid out along a **Hilbert space-filling curve**, so nearby file offsets stay spatially close — headers, string tables, padding, and compressed payloads each read as their own distinct texture.

## Why it's cool

"binvis"-style tools have a cult following because they make the invisible structure of a binary suddenly obvious. Bytegrain compresses that whole idea into one file you can double-click — no install, no upload, no server. Flip to **entropy mode** and compressed/encrypted regions light up as noise while headers and zero-padding stay calm; the sharp cliff where a container switches from metadata to a packed payload becomes visible at a glance. It's a genuinely useful reverse-engineering / forensics aid and a hands-on way to *see* space-filling curves and Shannon entropy.

Everything runs locally in your browser. **Files never leave the page.** Only small pasted hex snippets are shareable (via the URL `#hash`); real files are non-shareable by design.

## Run it

No build step, no dependencies, no network calls.

- **Easiest:** double-click `index.html` (it runs from `file://`), or
- **Static server** if you prefer: `python3 -m http.server` then open `http://localhost:8000/index.html`

Then drop a file on the map, click **Open file…**, paste hex/text, or click a demo button.

## Controls & usage

| Control | What it does |
|---|---|
| **Drag & drop / Open file…** | Load any file. Analysis is capped at the first 16 MB (a notice appears when a file is truncated). |
| **Paste hex or text** | Paste a hex string (`89 50 4e 47`, `0x89504e47`, commas fine) or plain text. Bare all-letter words are treated as text; odd-length hex falls back to text with a hint. Snippets ≤1 KB sync to the URL `#hash` for sharing. |
| **Hilbert / Linear / Bigram** | Layout toggle. *Hilbert* preserves locality; *Linear* is a zigzag raster scan; *Bigram* is a 256×256 dot-plot of consecutive byte pairs. |
| **Byte class / Entropy** | Color mode. *Byte class* colors by category (null / whitespace / control / printable / high-binary). *Entropy* recolors by local Shannon entropy (cool = ordered, hot = random). Disabled in Bigram view. |
| **Hover** | Reports the exact hex offset, byte value, ASCII glyph, and block entropy under the cursor. |
| **Drag on the map** | Selects a byte range and dumps it as synced hex + ASCII. A single click dumps a small window at that offset. |
| **Format markers** | Auto-detected signatures (PNG, ELF, PDF, JPEG/EXIF, GZIP, ZIP local/central, plus a text heuristic) are listed and ringed on the map. Click one to flash its location; toggle **hide on map** to declutter. |
| **Byte histogram** | 256-bin distribution with a linear/log toggle. Hover a bar to read its byte value and count. |
| **Strings** | Printable runs (adjustable minimum length) with offsets; click to flash the location on the curve. |
| **Demos** | Built-in synthetic samples — a PNG-like header + padding + compressed payload, plain text, and random noise. |

## Byte-class legend

| Color | Class |
|---|---|
| dark indigo | `0x00` null |
| blue | whitespace (tab, LF, CR, space) |
| red | control bytes (`< 0x20`) |
| green | printable ASCII |
| amber | high / binary (`≥ 0x7F`) |

## License

MIT — see [LICENSE](LICENSE).
