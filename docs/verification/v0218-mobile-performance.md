# v0.2.18 性能降温验收

日期：2026-05-07

## 验收范围

本轮验收覆盖手机竖屏性能、静态空跑、连续游玩、控制台错误、残留特效节点、Boss 形态、击杀收刀不回退、资源替换和线上部署准备。

## 本地检查

命令：

```bash
node --check src/game.js
node --check /Users/atou/games/study/steam-gameplay-reports/pattern-atlas-site/public/combo-card-roguelike/versions/a/src/game.js
npm run check-games
```

结果：

- 源码 JS 语法通过。
- 发布目录 JS 语法通过。
- Games 数据校验通过，13 个游戏全部有效。

## 性能验收

静态武器选择 10 秒：

- rAF：0。
- 文本写入：17。
- 样式写入：30。
- 控制台错误：0。

30 秒自动战斗：

- 自动出牌：22 次。
- 文本写入：393。
- 样式写入：1212。
- 残留 slash、impact、combo、card ghost 节点：0。
- 控制台错误：0。

10 分钟自动游玩：

- 自动出牌：475 次。
- 自动处理遮罩：56 次。
- 控制台错误：0。
- 残留 slash、impact、combo、card ghost 节点：0。
- 当前没有遮罩卡死。
- 版本显示为 v0.2.18 性能降温。

无句柄内存复查：

- 120 秒自动游玩后页面实际 DOM 节点 133。
- 强制 GC 后 JSHeapUsedSize 约 1.19MB。
- 控制台错误 0。
- 残留特效节点 0。

## 视觉验收

截图：

```text
output/playwright/v0218-mobile-performance.png
output/playwright/v0218-live-mobile.png
```

检查结果：

- 国画水墨 UI 仍然保留。
- Boss 使用 WebP 形态资源，截图中切到 shield-guard.webp。
- 玩家使用 player-idle.webp。
- 手牌、路线、连击、Boss 血条、玩家专注条仍然可读。
- 画面中没有旧 Boss 残影。
- 当前手牌 4 张，交互没有被性能改动破坏。

## 资源验收

战斗资源体积：

- 原 PNG 战斗资源约 4.1MB。
- WebP 战斗资源约 920KB。
- 发布目录 art 资源约 1.5MB。
- 发布目录可玩版本不再保留旧 PNG 战斗资源。

线上资源检查：

- `https://games.atou.cc/combo-card-roguelike/versions/a/?v=0218` 返回 v0.2.18。
- `src/game.js?v=0218` 中角色、Boss、VFX 均引用 WebP。
- `vfx-down-strike.webp?v=0218` 返回 200。
- 旧 `vfx-down-strike.png?v=0218` 返回 404。
- `data/games-hub.json?v=0218` 中 Blade Flow 版本为 v0.2.18。

线上 60 秒移动端冒烟：

- 自动出牌 50 次。
- 自动处理遮罩 6 次。
- 控制台错误 0。
- 残留特效节点 0。
- DOM 节点 135。
- 截图为 `output/playwright/v0218-live-mobile.png`。

击杀收刀回归：

- 线上击杀测试自动出牌 7 次。
- 敌人血量归零到风格结算出现间隔约 740ms。
- 结算没有抢在最后一刀动画前出现。
- 控制台错误 0。

## 结论

VERDICT: PASS

v0.2.18 达成本轮性能降温目标。静态界面不再空跑，战斗 DOM 写入显著下降，10 分钟自动游玩无错误、无特效节点残留，资源已替换为轻量 WebP，既有 Boss 切换和击杀收刀修复没有回退。
