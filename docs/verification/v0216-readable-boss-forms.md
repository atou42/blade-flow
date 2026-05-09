# v0.2.16 Readability And Boss Forms Verification

Date: 2026-05-07

Scope: restore functional readability after the guohua UI pass and add distinct boss silhouettes for fights, elites, act bosses, and the final rival.

## Acceptance

PASS.

The build now reports `v0.2.16 清晰战斗`. Functional text in the HUD, cards, combat log, weapon overlay, and version overlay uses stronger contrast and text shadow. Boss art now changes by encounter form instead of reusing one silhouette for the full run.

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
Uploaded 10 files
games.atou.cc (custom domain)
Current Version ID: be031ee4-b48b-42bf-a630-84c0d964be08
```

Result: PASS.

Command:

```bash
curl -fsS https://games.atou.cc/combo-card-roguelike/versions/a/ | rg "v0.2.16|清晰战斗|boss-forms-v1"
curl -fsSI https://games.atou.cc/combo-card-roguelike/versions/a/assets/art/boss-forms-v1/redline-rival.png
curl -fsSI https://games.atou.cc/combo-card-roguelike/versions/a/assets/art/boss-forms-v1/storm-captain.png
```

Observed: page contains `v0.2.16 清晰战斗` and the boss-form asset path; sampled boss-form PNG assets return HTTP 200.

Result: PASS.

Browser checks:

```text
Local 390x844: weapon overlay text readable on darkened panels; console errors 0.
Local combat: header, HUD, cards, log, route buttons, and bottom draw bar render with higher contrast.
Local boss mapping: 街头刀手 -> blade-guard, 后巷守卫 -> shield-guard, 镜面重拳 -> mirror-fist, 铁歌队长/断头雨 -> storm-captain, 血色影院/红线宿敌 -> redline-rival.
Live 390x844: version v0.2.16, overlay readable, header text uses dark ink, first boss asset loads from boss-forms-v1, console errors 0.
Live boss mapping: all sampled encounters switched to the expected boss-form assets.
Live final form probe: 红线宿敌 displayed redline-rival, combat log and cards remained readable at mobile size, console errors 0.
```

Result: PASS.
