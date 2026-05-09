# v0.2.69 Web Audio SFX Buffer Verification

日期：2026-05-09

结论：VERDICT: PASS

本次只处理音效导致的划动卡顿。战斗 SFX 在开战前 fetch 并 decode 成 `AudioBuffer`，划动时使用 Web Audio `BufferSource` 播放，不再走 `HTMLAudio.pause/currentTime/play`。

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
  "decoded": 29,
  "dispatchDurations": [2.9, 0.8, 2.3, 1.1],
  "maxDispatchDuration": 2.9,
  "longTaskDuration": 0,
  "resourceCount": 0,
  "resources": [],
  "lastError": "",
  "warmReady": true,
  "sfxReady": 29
}
```

Trace:

```text
.playwright-cli/traces/trace-1778340457288.trace
.playwright-cli/traces/trace-1778340457288.network
```

Result: PASS

Check: live unlocked-audio mobile trace

URL:

```text
https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=0269-live
```

Deploy:

```text
Cloudflare Version ID: b5662821-a9e7-4071-9cd5-58a9f1174426
```

Command run:

```js
// viewport 393 x 852, tracing enabled
document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 7, clientX: 20, clientY: 20 }));
window.__bladeFlowDebug.runRightSwipeProbe({ reset: true, count: 12, interval: 120, profile: 1 });
```

Output observed:

```json
{
  "decoded": 29,
  "dispatchDurations": [7.1, 6.3, 1.1, 1.1],
  "maxDispatchDuration": 7.1,
  "longTaskDuration": 0,
  "resourceCount": 0,
  "resources": [],
  "lastError": "",
  "warmReady": true,
  "sfxReady": 29
}
```

Trace:

```text
.playwright-cli/traces/trace-1778340717549.trace
.playwright-cli/traces/trace-1778340717549.network
```

Console warnings/errors: 0

Result: PASS
