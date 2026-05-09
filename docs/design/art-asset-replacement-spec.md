# Art Asset Replacement Spec

Date: 2026-05-07

Selected direction: `assets/generated/v0.2/bf-v02-duel-stage-layout_001.png`.

The next playable version should fully replace the current placeholder art direction on the live build. The target is not a concept gallery. The target is a playable combat screen whose player, Boss, arena, and pressure feedback all come from the approved stage-layout direction.

## Goal

The online Blade Flow build should stop looking like CSS prototype geometry plus temporary SVG placeholders. It should look like the approved clean ink duel: pale stage, player below, Boss above, clear vertical combat space, controlled red/black marks, green player blade accent, and readable action feedback.

This is a visual replacement pass. Core combat rules, card timing, tuning controls, draw cooldown, roguelike flow, and difficulty presets should not change.

## Source Boards

Use these boards as the art source:

- `assets/generated/v0.2/bf-v02-duel-stage-layout_001.png` as the master style and stage reference.
- `assets/generated/v0.3/bf-v03-player-combat-board_001.png` for player poses.
- `assets/generated/v0.3/bf-v03-boss-combat-board_001.png` for Boss states.
- `assets/generated/v0.3/bf-v03-clean-arena-background_001.png` for the arena background.
- `assets/generated/v0.3/bf-v03-boss-pressure-vfx_001.png` for Boss warning and attack pressure.
- `assets/generated/v0.1/bf-v01-card-icons_001.png` remains the icon-language reference, but card/icon slicing can be a later pass unless needed for consistency.

## Production Asset Set

Create a production asset folder:

`assets/art/stage-layout-v1/`

Required files:

- `arena-bg.webp`: portrait combat stage background, no characters, optimized for the arena.
- `player-idle.png`: player resting stance.
- `player-lunge.png`: player attack/lunge stance.
- `player-hit.png`: player damaged/recover stance.
- `boss-idle.png`: Boss idle hover.
- `boss-charge.png`: Boss core charging or warning state.
- `boss-attack.png`: Boss downward attack state.
- `boss-damaged.png`: Boss damaged or staggered state.
- `vfx-warning-halo.png`: red warning halo.
- `vfx-target-beam.png`: vertical red targeting line.
- `vfx-down-strike.png`: Boss downward strike.
- `vfx-hit-burst.png`: floor or body hit burst.

Transparent PNG should be used for character and VFX assets. WebP can be used for the arena background. If transparent extraction leaves obvious halos or matte fringing, keep the source board and regenerate or clean the asset instead of shipping a broken cutout.

## Replacement Scope

The implementation must replace the current live art, not layer new art behind it.

Remove or stop using:

- `assets/ink-player.svg` as the visible player.
- `assets/ink-boss.svg` as the visible Boss.
- `assets/ink-splatter.svg` as the primary arena or impact art.
- CSS pseudo-body fighter shapes.
- CSS-only slash and impact visuals when a production VFX asset exists for that state.

Keep only what still helps readability:

- Health bars, cards, route panel, combo rank, tuner, notebook, and version overlay.
- Route colors and route icons.
- CSS animation for movement, opacity, hit shake, and timing.

## Combat Screen Integration

At rest, the player should stand near the lower arena and the Boss should hover near the upper arena. Their positions should preserve the approved vertical distance. The arena background should provide mood but stay pale enough for health bars, route feedback, slashes, and cards to remain readable.

When the player attacks, the visible player asset should shift between idle and lunge or use a short transform that reads as a forward burst. The green blade accent must stay visible. The attack should still feel like a card-action combo, not a static illustration.

When the Boss attacks, the Boss should move or swap into the attack state, the red warning/targeting VFX should appear before or during impact, and the player hit feedback should remain obvious without relying only on UI numbers.

When either side is damaged, use the damaged asset or a route-colored VFX overlay. Existing HP bars remain as confirmation, but the main hit should be visible in the arena.

## Versioning

The playable version should become `v0.2.12` with a title such as `美术替换` or `Stage Layout`. The version history should mention that the temporary SVG/CSS art has been replaced by the approved clean ink stage direction.

The Games hub source data should update the score and version title to `v0.2.12`, and the live package under `public/combo-card-roguelike/versions/a/` must include the new `assets/art/stage-layout-v1/` files.

## Performance Budget

The first playable art replacement must stay mobile-safe:

- Initial production asset payload should target under 3 MB after optimization.
- No single transparent character or VFX asset should exceed 700 KB unless there is a visible quality reason.
- The arena background should use WebP and target under 900 KB.
- The page should still load and enter combat without a visible broken-image state on a normal mobile connection.

## Non-Goals

This pass does not need final Steam-quality full asset slicing for every card, relic, talent, weapon, reward, and event. It also does not need animation spritesheets for every frame. The purpose is to replace the current live combat screen with the approved art direction end to end.

## Done State

The pass is done only when the live `games.atou.cc` build shows the new art direction in normal play, the old visible SVG placeholders are gone, all required art assets are present in the deployed package, and the acceptance checklist passes on mobile viewport verification.
