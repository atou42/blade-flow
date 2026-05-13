# v0.2.82 项目全面走查与修复记录

日期：2026-05-13

结论：PASS

本轮目标是对 Blade Flow 当前项目做全面走查，先形成真实问题清单，再修复已确认问题，并复验本地、线上、Gitea、手机视口、调试入口、四向战斗、Boss 反馈、后摇、音频缓存和基础性能。

## 交付内容

- 版本从 `v0.2.81 四向意图` 升到 `v0.2.82 走查修复`。
- 修复 `src/game.js` 的战斗热身范围：`warmBattleAssets()` 现在会预解码全部 50 个已登记 SFX，不再漏掉奖励、路线、Boss 预演和静音切换等界面音效。
- 更新 `README.md` 的当前版本说明。
- 更新 `index.html` 的版本号和缓存参数。
- 更新 `games.atou.cc` hub 数据，并部署到线上。

## 问题清单

### 已确认并修复

战斗热身只预解码战斗类、武器类、Boss 类和少量读招 UI 音效，漏掉了 6 个界面音效：

- `uiRewardSelect`
- `uiRouteStable`
- `uiRouteDanger`
- `uiRouteMapBranch`
- `uiBossPreview`
- `uiMuteToggle`

这些声音不在普通划卡路径里，但第一次进入奖励、路线、Boss 预演或静音切换时可能触发首次加载。修复后，战斗开始热身会覆盖全部 50 个 SFX。

### 可疑风险但本轮未改

部分 SFX 文件名还保留旧方向语义，例如上划追身复用了旧 `right-chase` 文件名。这不影响运行，因为代码映射和玩法语义已经统一，但后续整理资产命名时可以一起清理。

`games.atou.cc` hub 工作区存在大量与 Blade Flow 无关的既有改动。本轮没有触碰或回滚这些文件，只按发布流程更新 Blade Flow 相关的源数据和 playable 文件。

### 无需处理

Gitea 仓库未登录访问返回 403，这是内部站点门禁；带内部账号访问时仓库 `private=false`，关键文件可读。

旧的舞台和 UI WebP 运行时仍从 Cloudflare R2 读取。本项目源码和 Gitea 内部仓库保留当前正式音频、地图图和生成记录；R2 运行时图片不在本轮迁移范围。

## 验证证据

### 本地语法

Command run:

```bash
node --check src/game.js
node --check tools/validate-mobile-acceptance.mjs
```

Output observed:

```text
无输出，退出码 0
```

Result: PASS

### README 和本地引用路径

Command run:

```bash
node <inline ref checker>
```

Output observed:

```json
{
  "checkedRefs": 17,
  "missing": []
}
```

Result: PASS

### 仓库状态和资产数量

Command run:

```bash
git status --short --branch
find assets -type f | sort | wc -l
find docs/design docs/verification -type f | sort | wc -l
du -sh . assets docs src
```

Output observed:

```text
## main...gitea/main
255 assets files
117 design/verification docs
133M project
33M assets
836K docs
336K src
```

Result: PASS

### Gitea 状态

Command run:

```bash
GET https://git.talesofai.com/api/v1/repos/atou/blade-flow
GET /contents/README.md
GET /contents/assets/art/world-map-v1/world-overview.webp
GET /contents/assets/audio/bgm/blade-flow-menu-ink-blade-sketch.mp3
```

Output observed:

```text
repo private=false, empty=false, default_branch=main
README.md size=4177
world-overview.webp size=125110
blade-flow-menu-ink-blade-sketch.mp3 size=871038
```

Result: PASS

### 本地手机视口和调试入口

Command run:

```bash
python3 -m http.server 4173
playwright open http://127.0.0.1:4173/?debug=1&audit=v0282
playwright resize 430 932
```

Output observed:

```text
Page Title: Blade Flow 竖屏连击卡牌
version: v0.2.82 走查修复
```

Result: PASS

### 音频预解码修复复验

Command run:

```js
await window.__bladeFlowDebug.startRunAtAct(1, "storm-katana", { skipIntro: true })
window.__bladeFlowDebug.audioState()
window.__bladeFlowDebug.assetWarmState()
```

Output observed:

```json
{
  "version": "v0.2.82 走查修复",
  "decoded": 50,
  "total": 50,
  "notDecoded": [],
  "warmReady": true,
  "warmError": ""
}
```

Result: PASS

### 四向读招矩阵

Command run:

```js
await window.__bladeFlowDebug.runReadMatrixProbe({ reset: true })
```

Output observed:

```json
{
  "count": 11,
  "types": [
    "early-left-intercept",
    "perfect-left",
    "late-left-intercept",
    "left-whiff",
    "perfect-left",
    "left-deflect",
    "break-confirm",
    "early-chase",
    "backstep-chase",
    "retreat-return",
    "break-confirm"
  ],
  "semantics": {
    "up": "追身",
    "left": "快刀破招",
    "right": "重刀兑现",
    "down": "撤身回手"
  }
}
```

Result: PASS

### 后摇限制

Command run:

```js
await window.__bladeFlowDebug.runActionCommitmentProbe({ reset: true })
```

Output observed:

```text
4 次快速连续出牌尝试中只接受 1 次。
第一张右划重刀空挥产生 1240ms 后摇。
后续左、下、上三次尝试被后摇挡住。
```

Result: PASS

### 快刀连点对抗探测

Command run:

```js
await window.__bladeFlowDebug.runLeftSwipeSpamProbe({ reset: true, count: 6, interval: 80 })
```

Output observed:

```json
{
  "interrupts": 2,
  "deflects": 1,
  "blocked": 3
}
```

Result: PASS

### 护势和易伤

Command run:

```js
await window.__bladeFlowDebug.runPoiseProbe({ reset: true })
```

Output observed:

```json
{
  "first": "poise-hit",
  "second": "poise-break",
  "vulnerable": true,
  "fullHandAfter": 4,
  "failLog": "重招没破护势，被抓后摇。"
}
```

Result: PASS

### 地图和三幕调试直达

Command run:

```js
window.__bladeFlowDebug.showWorldMap("storm-katana")
await window.__bladeFlowDebug.startRunAtAct(2, "storm-katana", { skipIntro: true })
await window.__bladeFlowDebug.startRunAtAct(3, "storm-katana", { skipIntro: true })
```

Output observed:

```text
地图 overlay 展示风暴门、赤线猎场、无相高路。
二幕调试直达：act=2, placeName=赤线猎场, bossName=赤线宿敌。
三幕调试直达：act=3, placeName=无相高路, bossName=无相刀影。
```

Result: PASS

### 基础性能

Command run:

```js
await window.__bladeFlowDebug.runPerformanceProbe({ durationMs: 3000 })
```

Output observed:

```json
{
  "actions": 56,
  "longTasks": 0,
  "longTaskDuration": 0,
  "domNodes": 166
}
```

Result: PASS

### 控制台错误

Command run:

```bash
playwright console error
```

Output observed:

```text
Total messages: 0 (Errors: 0, Warnings: 0)
```

Result: PASS

### 线上部署

Command run:

```bash
npm run publish-games
curl -L -sS 'https://games.atou.cc/combo-card-roguelike/versions/a/?v=0282-curl'
curl -L -sS 'https://games.atou.cc/data/games-hub.json?v=0282-curl'
```

Output observed:

```text
Cloudflare Version ID: 293002c4-553e-4da9-8887-a6b7b61cdcaa
线上 index.html 命中 styles.css?v=0.2.82、v0.2.82 走查修复、src/game.js?v=0.2.82。
线上 games-hub.json 命中 score v0.2.82、title v0.2.82 走查修复、全部 50 个 SFX。
```

Result: PASS

### 线上手机视口复验

Command run:

```js
await page.goto("https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=0282-live-browser")
await page.setViewportSize({ width: 430, height: 932 })
await window.__bladeFlowDebug.startRunAtAct(1, "storm-katana", { skipIntro: true })
```

Output observed:

```json
{
  "version": "v0.2.82 走查修复",
  "decoded": 50,
  "total": 50,
  "notDecoded": [],
  "warmReady": true,
  "warmError": ""
}
```

Result: PASS

## 终审清单

- 源码语法：PASS
- README 路径：PASS
- 本地资产引用：PASS
- Gitea 仓库和关键文件：PASS
- 本地手机视口：PASS
- 线上手机视口：PASS
- 调试入口：PASS
- 四向战斗语义：PASS
- Boss 反馈矩阵：PASS
- 后摇限制：PASS
- 护势易伤：PASS
- 音频预解码：PASS
- 控制台错误：PASS
- 基础性能：PASS
- 线上部署：PASS

最终判定：VERDICT: PASS
