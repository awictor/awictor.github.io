# Switchyard

A live regex playground that draws your pattern as a railroad diagram, explains it in plain English, and highlights matches as you type — all in one HTML file with zero dependencies.

## Why it's cool

Railroad (syntax) diagrams are one of the clearest ways to read a gnarly regular expression, but they usually need a build step or a server. Switchyard does the hard part — a hand-written regex parser that turns your pattern into an AST — right in the browser, then renders it as an SVG diagram next to a token-by-token explanation. Matching itself runs on the browser's native `RegExp`, so results are always accurate. It's a single file you can bookmark, share by URL, and use offline.

## Features

- **Railroad diagram** — a from-scratch recursive-descent parser builds an AST and renders it as an SVG flow diagram (groups, alternation, quantifier loops/bypasses, classes, anchors, lookaround, backrefs).
- **Plain-English explanation** — every token described in words; hovering a diagram node highlights its explanation row and vice versa.
- **Live match highlighting** — matches painted over an editable sample, with per-character **color-coded capture groups** (uses `RegExp` match indices where available, degrades gracefully where not).
- **Capture group table** — numbered and named groups with their values and offsets, plus a match navigator that highlights and scrolls to the selected match.
- **Flags** — toggle `g i m s u y`.
- **Replace preview** — apply a replacement template (`$1`, `$<name>`, `$&`, `` $` ``, `$'`) live, with the changed regions highlighted.
- **ReDoS analyzer** — flags nested/overlapping unbounded quantifiers that can cause catastrophic backtracking, and points at the risky sub-pattern on the diagram.
- **Step-through debugger** — walk the engine's backtracking on your sample, step by step, with a tape view and play/pause.
- **Snippet generator** — ready-to-paste JavaScript, Python, and Go, each with copy-to-clipboard (Go notes when it hits RE2's lookaround/backref limits).
- **Test bench** — add strings you expect to match (or not) for a quick pass/fail check.
- **Presets** — email, URL, IPv4, ISO date, semver, hex color, US phone, and a ReDoS demo.
- **Shareable state** — pattern, flags, sample text, replacement, and tests are encoded in the URL hash.
- **Light / dark theme** and a syntax **cheatsheet** drawer.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. There is no build step, no server, and no network access required.

If you prefer to serve it (e.g. to test URL-hash sharing over `http://`):

```sh
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Tested against current Chrome, Firefox, and Safari. Some visuals use CSS `color-mix()` (Chrome 111+, Safari 16.2+, Firefox 113+, all 2023); on older engines the app still works and falls back to solid colors.

## Usage

1. Type a pattern in the top bar and toggle flags on the right.
2. Edit the **Sample text** panel to test against your own input — matches highlight live.
3. Read the **railroad diagram** and the **Explain** tab; hover either to cross-highlight.
4. Use the tabs under the diagram for the **Debugger**, **Replace** preview, **Snippets**, and **Tests**.
5. Click **Share** to copy a URL that restores the full session.

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `?` | Open the cheatsheet |
| `Ctrl`/`Cmd` + `S` | Copy a shareable link |
| `Esc` | Close the cheatsheet drawer |

## How sharing works

State is JSON-encoded and base64'd into the URL fragment (`#…`), so nothing is ever sent to a server — the link itself carries the pattern, flags, sample text, replacement template, and test cases. Open a shared link and Switchyard restores exactly what you saw.

## Notes

- The parser targets the JavaScript regex dialect (e.g. `[]` is an empty class, `[^]` matches any character, possessive quantifiers are rejected). Matching always uses the native engine, so the highlighted results are the source of truth.
- Everything lives in `index.html`: the parser, diagram renderer, match engine, explainer, debugger, analyzer, and snippet generators.

## License

MIT — see [LICENSE](LICENSE).
