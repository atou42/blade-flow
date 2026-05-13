# v0.2.71 Action Recovery And Boss Read Verification

Date: 2026-05-10

Scope: implement `docs/design/action-recovery-boss-read-spec.md` and `docs/design/action-recovery-audio-spec.md` for the next playable slice.

Local URL: `http://127.0.0.1:8897/`

Live URL: `https://games.atou.cc/combo-card-roguelike/versions/a/`

## Result

PASS locally and live.

## Implementation Checks

- Version label updated to `v0.2.71 后摇读招`.
- `playerLeftSidestep`, `playerLeftPerfectCounter`, `playerLeftWhiff`, `playerRecoveryCancel`, `playerRecoveryDrag`, `playerHeavyWhiff`, `bossTrueConfirm`, `bossFeintFakeTell`, `bossFeintTrueTell`, `bossBackstepOpen`, `bossGroundGrabSuction`, `bossAdaptRead`, `bossPunishStart`, `uiReadCorrect`, and `uiReadWrong` are registered in `sfxTracks`.
- `battleSfxWarmKeys()` includes all player, weapon, boss, `uiBattleStart`, `uiReadCorrect`, and `uiReadWrong` SFX, so the new read sounds are warmed before combat.
- Boss actions now expose `prep`, `fake`, `confirm`, `hit`, and `recover` phases through `window.__bladeFlowDebug.readState()`.
- Action recovery now exposes `recoveryRemaining`, `recoveryLastMs`, `recoverySource`, `queuedInput`, `lastActionResult`, and `recentDirections`.

## Local Browser Probe

Command:

```js
await window.__bladeFlowDebug.runReadMatrixProbe({ reset: true })
```

Observed matrix:

```json
[
  { "move": "fast", "phase": "confirm", "direction": "left", "resultType": "perfect-left", "recoveryMs": 160, "interrupt": true },
  { "move": "feint", "phase": "fake", "direction": "left", "resultType": "left-whiff", "recoveryMs": 520, "interrupt": false },
  { "move": "feint", "phase": "confirm", "direction": "left", "resultType": "perfect-left", "recoveryMs": 160, "interrupt": true },
  { "move": "heavy", "phase": "confirm", "direction": "left", "resultType": "left-sidestep", "recoveryMs": 340, "interrupt": false },
  { "move": "heavy", "phase": "confirm", "direction": "down", "resultType": "break-confirm", "recoveryMs": 150, "interrupt": true },
  { "move": "backstep", "phase": "confirm", "direction": "right", "resultType": "early-chase", "recoveryMs": 460, "interrupt": false },
  { "move": "backstep", "phase": "recover", "direction": "right", "resultType": "backstep-chase", "recoveryMs": 150, "interrupt": true },
  { "move": "ground-grab", "phase": "confirm", "direction": "down", "resultType": "break-confirm", "recoveryMs": 150, "interrupt": true }
]
```

This proves left flick is no longer a universal interrupt. It interrupts fast and true feint confirm, whiffs on fake tell, and only sidesteps heavy.

## Continuous Left Probe

Command:

```js
await window.__bladeFlowDebug.runLeftSwipeSpamProbe({ reset: true, count: 12, interval: 110 })
```

Observed summary:

```json
{
  "interrupts": 2,
  "sidesteps": 2,
  "blocked": 1
}
```

Continuous left flick did not interrupt every Boss action. Heavy became `left-sidestep`, recovery blocked one early input, and only fast confirm became `perfect-left`.

## Audio And Resource Probe

Command:

```js
await window.__bladeFlowDebug.runReadMatrixProbe({ reset: true });
performance.clearResourceTimings();
await window.__bladeFlowDebug.runReadMatrixProbe({ skipWarm: true });
```

Observed:

```json
{
  "resourceCount": 0,
  "longTasks": [],
  "audioError": ""
}
```

All 15 new read SFX reported `decoded: true` after warmup. Replaying the read matrix after clearing resource timing produced no new audio/image resource requests and no long tasks.

## Input Buffer Probe

Manual pointer-event probe on mobile viewport:

- First left flick on heavy confirm produced `left-sidestep`, `recoveryLastMs: 340`.
- Second left flick during the final recovery window produced `queuedInput: { "index": 1, "direction": "left" }`.
- After recovery expired, the queued input executed once and cleared `queuedInput`.

This verifies the 160ms end-of-recovery buffer exists and does not create an input queue chain.

## Visual Check

Playwright mobile viewport screenshot was captured at `.playwright-cli/page-2026-05-10T02-25-14-792Z.png`.

Computed mobile state after effects cleared:

```json
{
  "coreDisplay": "none",
  "weaponDisplay": "none",
  "nodeCount": 0
}
```

The previous helper core and weapon line remain hidden on mobile viewports.

## Live Deployment Verification

Deployment command:

```bash
npm run deploy
```

Cloudflare result:

```text
Current Version ID: 4c853af7-4790-456d-8c40-87d6bef38a18
Custom domain: games.atou.cc
```

Live checks:

```json
{
  "url": "https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1",
  "version": "v0.2.71 后摇读招",
  "debugHook": true,
  "newAudioHeadStatus": 200
}
```

Live read matrix repeated the local result, and the second run after warmup reported:

```json
{
  "resourceCount": 0,
  "audioError": ""
}
```
