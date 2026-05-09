# v0.2.58 Act BGM Suno Record

Date: 2026-05-09

Final files:

- `assets/audio/bgm/blade-flow-act1-dry-blade-loop.mp3`
- `assets/audio/bgm/blade-flow-act2-red-string-loop.mp3`
- `assets/audio/bgm/blade-flow-act3-mirror-duel-loop.mp3`

Selected Suno outputs:

- Act 1 uses two clean instrumental sections concatenated into one 63.55 second stage track.
  - `4eac533c-0272-48a4-b733-e40ab1c9f161` / `Blade Flow Act 1 - Full Opening Stage.mp3`
  - `c6e3bc9c-cc09-4f6e-8190-78554ed2d714` / `Blade Flow Act 1 - Full Opening Stage-2.mp3`
- Act 2 uses `ff386aef-1c15-4a26-8768-f17e4b165930` / `Blade Flow Act 2 - Full Redline Stage.mp3`, 76.92 seconds.
- Act 3 uses `41d98fe0-39b7-45cc-a316-283f435017b0` / `Blade Flow Act 3 - Mirror Duel Loop.mp3`, 63.74 seconds.

Prompt policy:

- No named artists, songs, films, games, or copyrighted recordings.
- Use `instrumental only`, `no vocals`, and `no lyrics` in tags.
- Final selected source LRC/SRT sidecars are empty, except Act 1 which is an instrumental concat from two empty-sidecar sections.

Rejected outputs:

- Early custom-mode Act 1 and Act 2 candidates with prompt text written into LRC sidecars were rejected.
- Short clean instrumental candidates under 60 seconds were rejected for final act-level BGM use.
