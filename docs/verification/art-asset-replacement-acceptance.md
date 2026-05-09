# Art Asset Replacement Acceptance

Date: 2026-05-07

This checklist defines what must be true before the art replacement can be considered shipped.

## File Acceptance

The source project must contain:

- `assets/art/stage-layout-v1/arena-bg.webp`
- `assets/art/stage-layout-v1/player-idle.png`
- `assets/art/stage-layout-v1/player-lunge.png`
- `assets/art/stage-layout-v1/player-hit.png`
- `assets/art/stage-layout-v1/boss-idle.png`
- `assets/art/stage-layout-v1/boss-charge.png`
- `assets/art/stage-layout-v1/boss-attack.png`
- `assets/art/stage-layout-v1/boss-damaged.png`
- `assets/art/stage-layout-v1/vfx-warning-halo.png`
- `assets/art/stage-layout-v1/vfx-target-beam.png`
- `assets/art/stage-layout-v1/vfx-down-strike.png`
- `assets/art/stage-layout-v1/vfx-hit-burst.png`

Every PNG must open with an alpha channel when transparency is expected. The WebP background must open and match portrait arena usage. No production file can be zero bytes, corrupt, or still only present in `assets/generated/`.

## Replacement Acceptance

The shipped source and public package must not visibly depend on the old temporary art:

- `index.html`, `styles.css`, and `src/game.js` should not reference `assets/ink-player.svg`, `assets/ink-boss.svg`, or `assets/ink-splatter.svg` for visible combat art.
- The public package under `public/combo-card-roguelike/versions/a/` must include `assets/art/stage-layout-v1/`.
- The deployed live page must return HTTP 200 for every production asset path.

## Visual Acceptance

Mobile viewport checks must pass at 390 x 844 and 430 x 932.

At rest:

- Player is below, Boss is above.
- The center of the arena has clear open combat space.
- Player, Boss, HP bars, route panel, combo rank, combat log, cards, and draw bar are readable.
- The image does not return to the dirty first-pass look.

During player attack:

- Player movement or pose change is visible.
- Blade/VFX feedback is visible in the arena.
- Route color still matches the selected route.
- Combo feedback is readable and not hidden by the new art.

During Boss pressure and hit:

- Boss warning or attack VFX appears in the arena.
- Boss motion or state change is visible.
- Player damage is visibly communicated in the arena, not only by the HP number.
- Health bars still update correctly.

## Interaction Acceptance

A browser check must complete these flows without console errors:

- Open the live version.
- Choose `风暴太刀`.
- Play one tap card.
- Swipe one card upward.
- Swipe one card rightward.
- Swipe one defensive card leftward if available, or verify the left-swipe gesture on any available card.
- Wait for a Boss attack or force the pressure path through gameplay.
- Open and close the version log.
- Open and close the tuner.

The run does not need to be won. The goal is to prove that new art does not break the current playable loop.

## Deployment Acceptance

Before deployment:

- `node --check src/game.js` passes.
- Games hub checks pass with `npm run check-games`, `npm run prepare-games`, and `npm run check-games-ui`.

After deployment:

- `https://games.atou.cc/combo-card-roguelike/versions/a/?v=0212` loads the new version label.
- A live browser check confirms every required art asset has non-zero natural dimensions.
- The live Games hub data reports `v0.2.12`.

## Failure Conditions

The replacement fails if any of these happen:

- Any required production asset is missing or broken.
- The live combat screen still shows the old SVG player or Boss.
- The arena becomes too busy for cards, HP bars, or route feedback.
- Boss pressure cannot be seen without reading the combat log.
- The implementation ships only local files but does not update the deployed `games.atou.cc` package.
