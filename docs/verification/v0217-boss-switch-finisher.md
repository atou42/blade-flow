# v0.2.17 Boss Switch And Finisher Verification

Date: 2026-05-07

Scope: fix Boss-form residue when entering the next encounter and delay victory settlement until the finishing strike visuals have played.

## Acceptance

PASS.

The build now reports `v0.2.17 切换收刀`. Boss-form assets are preloaded, combat visuals are reset at encounter start, and the new Boss image is forced through even if the previous encounter left an art lock. Lethal card plays now mark the fight ended immediately, keep the reward overlay hidden while the card ghost and slash are still visible, and show settlement after the finishing motion completes.

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
Validated 13 games in data/games-source.json
Generated 13 playable game pages for https://games.atou.cc
Validated back-home invariant for 13 game pages
```

Result: PASS.

Command:

```bash
npm run publish-games
```

Observed:

```text
Uploaded 4 files
games.atou.cc (custom domain)
Current Version ID: c3375b10-c183-49b6-b233-03d9ffb8e0b6
```

Result: PASS.

Browser checks:

```text
Local 390x844: version v0.2.17, all five boss-form assets preloaded, console errors 0.
Local locked-switch probe: forced redline image plus a 5000ms art lock, then started 后巷守卫; src immediately became shield-guard. Repeated from shield to 铁歌队长; src immediately became storm-captain.
Local lethal probe: after a lethal card, overlays stayed 0 while pendingEndTimer was active and slash/card ghost were visible. After the delay, overlay became 风格结算 and slash/card ghost were removed.
Live 390x844: version v0.2.17, all five boss-form assets preloaded, console errors 0.
Live locked-switch probe: redline -> 后巷守卫 switched immediately to shield-guard despite art lock; shield -> 铁歌队长 switched immediately to storm-captain.
Live lethal probe: immediate overlays 0, pending true, slash 1, ghost 1, HP 0. After the delay overlays 1, pending false, heading 风格结算, slash 0, ghost 0.
```

Result: PASS.
