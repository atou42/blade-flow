# v0.2.66 Right-Swipe Stutter Verification

日期：2026-05-09

结论：VERDICT: PASS

本次目标是消除右滑出牌的首触发卡顿。验收标准不是体感顺滑，而是右滑输入窗口内没有音频或图片首触发资源、没有 long task、没有音频错误，并且低功耗和线上版本同样成立。

## 修复范围

右滑前的战斗预热现在覆盖当前战斗 BGM、战斗 SFX、兵器签名音、Boss 音效、当前 Boss 和战斗美术帧、卡牌等级底、路线印章、轻量飞牌节点、爆裂节点、刀光节点和卡牌位置缓存。

战斗 BGM 和战斗 SFX 不再依赖 `Audio preload` 的浏览器行为。预热阶段会先 `fetch` 成 blob，再把复用的 `Audio` 节点指向 blob URL。这样右滑路径不会触发首次网络请求，也不会让资源计时在手势窗口里收尾。

菜单首次点击如果直接进入战斗，不再先启动菜单 BGM。调试探针 reset 时也会避免菜单 BGM 遗留加载污染右滑窗口。

右滑动画不再 clone 整张卡牌 DOM，不在手势路径读取布局。它使用缓存的卡牌位置和轻量节点池。393px 级手机窄屏会自动进入省帧表现档，并关闭右滑飞牌、刀光、连击弹字和受击 CSS 动画，避免移动端输入帧被视觉反馈拖慢。

## 基线复现

修复前在本地移动视口右滑后能看到首触发资源进入手势窗口，包括：

```text
sfx-player-card-press-01.mp3
sfx-player-card-release-01.mp3
sfx-player-flick-right-chase-01.mp3
sfx-weapon-storm-katana-chase-01.mp3
sfx-boss-take-hit-01.mp3
sfx-boss-evade-01.mp3
player-lunge.webp
blade-flow-act1-dry-blade-loop.mp3
```

这证明卡顿不是错觉，右滑路径确实在补音频和图片资源。

## 本地验收

Check: JavaScript syntax

Command run:

```bash
node --check src/game.js
```

Output observed:

```text
exit 0
```

Result: PASS

Check: local standard right-swipe probe

Command run:

```js
window.__bladeFlowDebug.runRightSwipeProbe({ reset: true, count: 12, interval: 120, profile: 1 })
```

Output observed:

```json
{
  "swipes": 4,
  "dispatchDurations": [9.9, 5.3, 5.1, 4.2],
  "maxDispatchDuration": 9.9,
  "longTaskDuration": 0,
  "resourceCount": 0,
  "resources": [],
  "lastError": "",
  "bgmReady": ["act1"],
  "warmReady": true,
  "timedOut": [],
  "sfxReady": 29,
  "imageReady": 21
}
```

Result: PASS

Check: local low-power right-swipe probe

Command run:

```js
window.__bladeFlowDebug.runRightSwipeProbe({ reset: true, count: 12, interval: 160, profile: 0 })
```

Output observed:

```json
{
  "swipes": 4,
  "dispatchDurations": [5, 4.1, 2.2, 4],
  "maxDispatchDuration": 5,
  "longTaskDuration": 0,
  "resourceCount": 0,
  "resources": [],
  "lastError": "",
  "bgmReady": ["act1"],
  "warmReady": true,
  "timedOut": [],
  "sfxReady": 29,
  "imageReady": 21
}
```

Result: PASS

Check: local mobile-viewport traced right-swipe probe

Command run:

```js
// viewport 393 x 852, tracing enabled
window.__bladeFlowDebug.runRightSwipeProbe({ reset: true, count: 12, interval: 140, profile: 1 })
```

Output observed:

```json
{
  "viewport": { "width": 393, "height": 852 },
  "performance": "save",
  "swipes": 4,
  "dispatchDurations": [3.4, 10.2, 3.3, 2.8],
  "maxDispatchDuration": 10.2,
  "longTaskDuration": 0,
  "resourceCount": 0,
  "resources": [],
  "lastError": "",
  "warmReady": true,
  "timedOut": []
}
```

Trace:

```text
.playwright-cli/traces/trace-1778326323848.trace
.playwright-cli/traces/trace-1778326323848.network
```

Result: PASS

## 线上验收

Deployment: Cloudflare Workers `fcd1cc6e-31d8-4d14-97c7-659b6af4b52c`

Live URL:

```text
https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=0266-final-mobile-trace
```

Check: live version and hub metadata

Command run:

```bash
curl -L -s 'https://games.atou.cc/combo-card-roguelike/versions/a/?v=0266-live-curl' | rg -n 'v0\.2\.66|右滑预热'
curl -L -s 'https://games.atou.cc/data/games-hub.json?v=0266-live-curl' | rg -n 'combo-card-roguelike|v0\.2\.66|右滑预热'
```

Output observed:

```text
page: v0.2.66 右滑预热
hub: combo-card-roguelike score v0.2.66, version title v0.2.66 右滑预热
```

Result: PASS

Check: live mobile-viewport standard right-swipe probe

Command run:

```js
// viewport 393 x 852
window.__bladeFlowDebug.runRightSwipeProbe({ reset: true, count: 12, interval: 120, profile: 1 })
```

Output observed:

```json
{
  "viewport": { "width": 393, "height": 852 },
  "performance": "save",
  "swipes": 4,
  "dispatchDurations": [7.6, 4.4, 3.8, 4.1],
  "maxDispatchDuration": 7.6,
  "longTaskDuration": 0,
  "resourceCount": 0,
  "resources": [],
  "lastError": "",
  "bgmReady": ["act1"],
  "warmReady": true,
  "timedOut": [],
  "sfxReady": 29,
  "imageReady": 21
}
```

Result: PASS

Check: live mobile-viewport low-power right-swipe probe

Command run:

```js
// viewport 393 x 852
window.__bladeFlowDebug.runRightSwipeProbe({ reset: true, count: 12, interval: 160, profile: 0 })
```

Output observed:

```json
{
  "viewport": { "width": 393, "height": 852 },
  "performance": "save",
  "swipes": 4,
  "dispatchDurations": [6.8, 7.9, 4, 2.6],
  "maxDispatchDuration": 7.9,
  "longTaskDuration": 0,
  "resourceCount": 0,
  "resources": [],
  "lastError": "",
  "bgmReady": ["act1"],
  "warmReady": true,
  "timedOut": [],
  "sfxReady": 29,
  "imageReady": 21
}
```

Result: PASS

Check: live console warnings

Command run:

```bash
/Users/atou/.codex/skills/playwright/scripts/playwright_cli.sh console warning
```

Output observed:

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Result: PASS

## Trace Evidence

Final live mobile trace:

```text
.playwright-cli/traces/trace-1778326517005.trace
.playwright-cli/traces/trace-1778326517005.network
```

Trace probe output:

```json
{
  "viewport": { "width": 393, "height": 852 },
  "performance": "save",
  "swipes": 4,
  "dispatchDurations": [6.4, 4.3, 3.2, 13.5],
  "maxDispatchDuration": 13.5,
  "longTaskDuration": 0,
  "resourceCount": 0,
  "resources": [],
  "lastError": "",
  "warmReady": true,
  "timedOut": []
}
```

Result: PASS

## Completion Audit

首个右滑、连续右滑、低功耗右滑和线上移动视口右滑都已验证。右滑窗口内没有音频创建导致的资源请求，没有图片资源请求，没有 DOM 克隆式大对象创建，没有同步布局读取造成的 long task，没有音频 lastError。BGM、SFX、静音、低功耗、Boss 读招、R2 WebP、调试接口和部署流程保留。
