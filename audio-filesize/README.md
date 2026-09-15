# Audio File Size 🎵

Estimate the **size and bitrate of uncompressed PCM / WAV audio** from sample rate, bit depth, channels, and length. Single HTML file, fully offline, nothing leaves your device.

## Why

Raw audio is huge and predictable, but "how big is a 3-minute 96 kHz/24-bit stereo take?" is annoying to work out on the spot when you're sizing a card, a drive, or a session. This does the multiplication and formats the answer in KB/MB/GB.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/audio-filesize/
- Pick the **sample rate**, **bit depth**, and **channels**.
- Enter the **duration** in minutes.
- Read the file size, the bitrate, and the per-second data rate.

## How it works

- Size = sample rate × (bit depth ÷ 8) × channels × seconds.
- Bitrate = sample rate × bit depth × channels — CD audio is 1,411 kbps.
- CD stereo is about 10 MB per minute; hi-res 96 kHz/24-bit is roughly triple that.
- This is raw PCM. Lossy codecs (MP3, AAC, Opus) are far smaller; lossless (FLAC, ALAC) is roughly half.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
