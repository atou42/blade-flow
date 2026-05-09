# v0.2.67 Unlocked-Audio Swipe Jank Verification

日期：2026-05-09

结论：VERDICT: PASS

这次复查修正了 v0.2.66 的验收漏洞：新页面探针可能处在未解锁音频状态，因此没有覆盖真实玩家手机上每次划动都会播放 SFX 的路径。

## 根因

资源预热已经生效，但解锁音频后，每次右滑仍会同步触发卡牌按下、离手、右滑方向、武器签名、Boss 受击、Boss 闪避等多段 HTMLAudio 播放。移动端窄屏和 trace 下会把 `pause/currentTime/play` 的成本暴露成输入卡顿。

## 修复

非强制 SFX 不再在手势同步路径里立即播放，而是进入队列，在下一帧之后统一 flush。393px 级手机窄屏会跳过装饰音，只保留离手确认、方向音、武器签名和关键反馈。静音切换这类 `force` 音仍保持即时。

## 本地复现与验收

Check: local unlocked-audio mobile trace

Command run:

```js
document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 7, clientX: 20, clientY: 20 }));
window.__bladeFlowDebug.runRightSwipeProbe({ reset: true, count: 12, interval: 220, profile: 1 });
```

Output observed:

```json
{
  "recentSfx": ["playerFlickRight", "weaponStormKatana", "playerCardRelease", "playerFlickRight", "weaponStormKatana"],
  "dispatchDurations": [2.1, 1.3, 2.1, 1.4],
  "maxDispatchDuration": 2.1,
  "longTaskDuration": 0,
  "resourceCount": 0,
  "resources": [],
  "lastError": ""
}
```

Trace:

```text
.playwright-cli/traces/trace-1778331261005.trace
.playwright-cli/traces/trace-1778331261005.network
```

Result: PASS

## Acceptance

Check: live unlocked-audio mobile trace

Command run:

```js
// https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=0267-unlocked-live
// viewport 393 x 852, tracing enabled
document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 7, clientX: 20, clientY: 20 }));
window.__bladeFlowDebug.runRightSwipeProbe({ reset: true, count: 12, interval: 220, profile: 1 });
```

Output observed:

```json
{
  "unlocked": true,
  "recentSfx": ["playerFlickRight", "weaponStormKatana", "playerCardRelease", "playerFlickRight", "weaponStormKatana"],
  "viewport": { "width": 393, "height": 852 },
  "performance": "save",
  "dispatchDurations": [5.7, 3.7, 1.7, 1.2],
  "maxDispatchDuration": 5.7,
  "longTaskDuration": 0,
  "resourceCount": 0,
  "resources": [],
  "lastError": ""
}
```

Trace:

```text
.playwright-cli/traces/trace-1778331524752.trace
.playwright-cli/traces/trace-1778331524752.network
```

Deployment: Cloudflare Workers `acd49234-a9a8-4e01-806e-1f1290ee93c9`

Result: PASS

真实有声音效路径已覆盖。右滑输入窗口不再同步播放多段装饰音，资源加载仍为 0，音频错误为空，手机窄屏 trace 下没有 long task。
