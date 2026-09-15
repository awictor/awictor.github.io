# Stowaway

**Find the invisible passengers hiding in your text.**

Stowaway is a paste-and-go Unicode X-ray. Drop in any string — a commit message, a JSON key, a password, an LLM answer, a copied URL — and it drags every invisible, control, bidi, and look-alike character into the light. One self-contained HTML file, zero dependencies, no network calls.

## Why it's cool

Two strings look identical but don't compare equal. A pasted snippet has a non-breaking space where a real space should be and the build breaks. Post-LLM, hidden Unicode is also a live security concern: instructions smuggled inside Unicode tag characters, Trojan-Source bidi attacks ([CVE-2021-42574](https://nvd.nist.gov/vuln/detail/CVE-2021-42574)), and homoglyph phishing domains. Stowaway makes all of it visible in one glance, explains each character precisely, and cleans the mess.

## Features

- **Reveal view** — renders the input character by character, with invisible/control/format characters (ZWSP, NBSP, soft hyphen, BOM, word joiner, RLO/LRO, Unicode tag chars, and ~40 more) shown as labeled colored badges inline, so you literally see the hidden passengers.
- **Threat bar** — a live verdict plus counts: invisible chars, bidi controls, control chars, smuggled Unicode-tag payloads, mixed-script words, combining marks, and non-ASCII.
- **Bidi / Trojan-Source detector** — flags RLO/LRO/RLE/LRE/PDF/LRI/RLI/FSI/PDI overrides and warns when the visual order differs from the logical order.
- **Mixed-script / confusable detector** — flags words that mix scripts (e.g. Latin `a` + Cyrillic `а`), the classic phishing/typosquat trick, and names which ASCII letter each homoglyph impersonates.
- **Character inspector** — click (or tab to and press Enter on) any glyph to see its codepoint, curated label, Unicode General Category and Script, UTF-8 bytes, UTF-16 code units, and copy-ready escapes for JS / JSON / HTML / CSS / URL.
- **Compare mode** — character-level LCS diff of two strings that names the exact invisible or homoglyph culprit behind a "looks identical but `!==`" mismatch.
- **Attack gallery** — one-click presets loading real threats (bidi Trojan-Source, Cyrillic homoglyph domain, zero-width URL, smuggled LLM tag payload, NBSP, confusable password, ZWJ + combining, and a clean control sample).
- **Cleaner** — one click strips invisibles and applies NFC normalization, producing sanitized, copyable output with a list of exactly what was removed and where.
- **Shareable + zero-config** — input is encoded in the URL hash; all analysis runs in-browser via `TextEncoder`, `String.normalize`, and Unicode property regex. No data tables, no network.

## Run it

No build, no server, no install.

1. Open `index.html` in any modern browser — double-click it, or drag it onto a browser window.
2. Paste text into the **Scan** box, or click an **Attack gallery** preset.
3. Switch to **Compare** for a two-pane character-level diff of two strings.
4. Click any glyph or badge to open the **Inspector**.

State is saved to the URL hash, so you can bookmark or share a given analysis via the address bar.

> Note on `file://`: some browsers block clipboard writes on pages opened directly from disk. If a copy button reports "Copy failed", Stowaway drops the text into a pre-selected textarea so you can copy it with Ctrl+C / Cmd+C.

## Controls

| Action | How |
| --- | --- |
| Scan a string | Type or paste into the Scan box |
| Compare two strings | Switch to **Compare**, fill A and B |
| Inspect a character | Click a glyph/badge, or Tab to it and press Enter/Space |
| Load a sample attack | Click any chip in the Attack gallery |
| Clean the input | **Strip invisibles + NFC normalize** |
| Copy clean output | **Copy clean output** |
| Export findings | **Copy findings report (JSON)** |

## Limits

- Analysis is capped at 20,000 characters (Scan) and the diff compares the first 2,500 characters of each side; both surface a notice when they truncate.
- Character *names* aren't shown (that needs a large data table, which would break the zero-dependency design). Instead you get a curated label for the ~40 dangerous specials plus the true Unicode General Category and Script from `\p{...}` regex.
- Per-character script detection covers the common confusable scripts: Latin, Greek, Cyrillic, Han, Hiragana, Katakana, Hangul, Arabic, and Hebrew.

## License

MIT — see [LICENSE](LICENSE).
