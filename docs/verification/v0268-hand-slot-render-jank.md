# v0.2.68 Hand-Slot Render Jank Verification

日期：2026-05-09

结论：VERDICT: PASS

用户反馈 v0.2.67 仍然“每次划动卡”。复查后发现音频已不是唯一问题：出牌后仍会同步重建整只手牌，并同步刷新战斗状态。这个成本在桌面探针里不明显，但真机上会变成每次划动顿一下。

## 修复

出牌后不再调用整手 `renderHand()`，只把当前槽位替换成空槽。补牌完成时仍由原有流程刷新手牌。战斗状态 `render()` 从 pointerup 同步路径移到下一帧执行。

## 验收

Check: local unlocked-audio mobile trace

Command run:

```js
// viewport 393 x 852, tracing enabled
document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 7, clientX: 20, clientY: 20 }));
window.__bladeFlowDebug.runRightSwipeProbe({ reset: true, count: 12, interval: 120, profile: 1 });
```

Output observed:

```json
{
  "dispatchDurations": [4.8, 1.1, 1.1, 0.8],
  "maxDispatchDuration": 4.8,
  "longTaskDuration": 0,
  "resourceCount": 0,
  "resources": [],
  "lastError": "",
  "recentSfx": ["playerFlickRight", "weaponStormKatana", "playerCardRelease", "playerFlickRight", "weaponStormKatana"]
}
```

Trace:

```text
.playwright-cli/traces/trace-1778338035850.trace
.playwright-cli/traces/trace-1778338035850.network
```

Result: PASS

Check: live unlocked-audio mobile trace

Command run:

```js
// https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=0268-live
// viewport 393 x 852, tracing enabled
document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 7, clientX: 20, clientY: 20 }));
window.__bladeFlowDebug.runRightSwipeProbe({ reset: true, count: 12, interval: 120, profile: 1 });
```

Output observed:

```json
{
  "dispatchDurations": [4.5, 3.2, 1, 1.2],
  "maxDispatchDuration": 4.5,
  "longTaskDuration": 0,
  "resourceCount": 0,
  "resources": [],
  "lastError": "",
  "recentSfx": ["playerFlickRight", "weaponStormKatana", "playerCardRelease", "playerFlickRight", "weaponStormKatana"]
}
```

Trace:

```text
.playwright-cli/traces/trace-1778338354960.trace
.playwright-cli/traces/trace-1778338354960.network
```

Deployment: Cloudflare Workers `0048de3d-4ae7-4e5d-bdb6-583fcd120976`

Result: PASS
