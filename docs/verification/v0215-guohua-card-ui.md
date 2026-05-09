# v0.2.15 Guohua Card UI Verification

Date: 2026-05-07

Scope: replace the v0.2.14 clean ink UI pass with the selected fifth guohua direction for card reading, route stamps, card grade surfaces, weapon choices, and the live `games.atou.cc` build.

## Acceptance

PASS.

The playable build now reports `v0.2.15 国画读牌`. Combat cards use `ui-guohua-v2` grade card backs. Route sigils and weapon modifier chips use the generated route stamp assets. The live page loads the new assets and accepts a real card action after weapon selection.

## Checks

Command:

```bash
node --check src/game.js
```

Result: PASS.

Command:

```bash
npm run check-games && npm run prepare-games && npm run check-games-ui
```

Observed:

```text
Validated 12 games in data/games-source.json
Generated 12 playable game pages for https://games.atou.cc
Validated back-home invariant for 12 game pages
```

Result: PASS.

Command:

```bash
npm run publish-games
```

Observed:

```text
Uploaded 19 files
games.atou.cc (custom domain)
Current Version ID: 2ad26743-c7f8-4430-94dd-207b12741753
```

Result: PASS.

Command:

```bash
curl -fsS https://games.atou.cc/combo-card-roguelike/versions/a/ | rg "v0.2.15|国画读牌"
curl -fsSI https://games.atou.cc/combo-card-roguelike/versions/a/assets/art/ui-guohua-v2/card-legendary.webp
curl -fsSI https://games.atou.cc/combo-card-roguelike/versions/a/assets/art/ui-guohua-v2/stamp-counter.webp
```

Observed: page contains `v0.2.15 国画读牌`; both sampled WebP assets return HTTP 200.

Result: PASS.

Browser checks:

```text
Local 390x844: version v0.2.15, card grade class present, card background uses ui-guohua-v2, card sigil uses route stamp, weapon chip uses route stamp, console errors 0.
Local 430x932: cards use guohua assets, sigils use stamp assets, console errors 0.
Live 390x844: version v0.2.15, card grade class present, card background uses ui-guohua-v2, card sigil uses route stamp, weapon chip uses route stamp, console errors 0.
Live action probe: selected 风暴太刀, clicked first card, combo became 1, draw cooldown changed to 1s, one empty hand slot appeared, enemy HP changed from 117 to 100, overlays 0.
Live 430x932: all card backgrounds still resolve to ui-guohua-v2, console errors 0.
```

Result: PASS.

## Notes

One issue was found during local verification: route stamp URLs inside inline style attributes were broken by quoted `url("./...")` values, so weapon chips lost their image background. The fix changed inline route stamp values to unquoted `url(./...)`, then the same local and live checks passed.
