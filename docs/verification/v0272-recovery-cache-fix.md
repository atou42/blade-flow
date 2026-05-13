# v0.2.72 Recovery And Cache Fix Verification

Date: 2026-05-10

Reason: real phone feedback showed the page still displaying `v0.2.69`, Boss helper bars/dots visible on the fighter, and right-flick cards still chaining too freely.

## Fix

- Added versioned asset URLs: `styles.css?v=0.2.72` and `src/game.js?v=0.2.72`.
- Raised normal action recovery values: right flick now uses `340ms`, tap `220ms`, up `320ms`, left `390ms`, down `520ms`.
- Changed input buffering from a flat 160ms window to a smaller per-action tail window, capped at 160ms.
- Kept Boss helper core and weapon line hidden on phone viewport, and also hides warning/beam bitmap VFX on mobile.

## Local Verification

Mobile viewport `390x844`:

```json
{
  "version": "v0.2.72 后摇实装",
  "coreDisplay": "none",
  "weaponDisplay": "none"
}
```

Right flick recovery probe:

```json
{
  "first": {
    "result": "steady",
    "recovery": 340,
    "remaining": 340
  },
  "blockedAfter120ms": {
    "sameActionAt": true,
    "queued": null,
    "remaining": 170,
    "recentCount": 1
  }
}
```

The second right flick at 120ms did not execute and did not queue.

## Live Verification

Live URL tested:

```text
https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&t=0272
```

Observed:

```json
{
  "version": "v0.2.72 后摇实装",
  "first": {
    "result": "steady",
    "recovery": 340,
    "remaining": 340
  },
  "blocked": {
    "sameActionAt": true,
    "queued": null,
    "remaining": 170,
    "recentCount": 1
  },
  "coreDisplay": "none",
  "weaponDisplay": "none"
}
```

Cloudflare deploy version:

```text
bed29951-86fd-43b4-b080-aa72e3cebc16
```
