# v0.2.74 Boss Readability And Action Commitment Verification

日期：2026-05-10

本记录验收 `docs/design/boss-readability-action-commitment-spec.md` 的实现切片。目标是证明 Boss 低帧动作已经有可读的 2D 场地语法，错误反馈能教玩家原因，普通动作后摇不能再像连点按钮。

## 实现范围

版本号更新为 `v0.2.74 读招成形`，JS/CSS URL 使用 `?v=0.2.74`。

新增场地读招层 `read-telegraph`。读招层不依赖新图片资源，使用 CSS 刀线、裂纹、残影、宽压区和短标签表达 Boss 状态。

五类 Boss 招式的视觉语法如下。

| 招式 | 主要信号 | 窗口标签 |
| --- | --- | --- |
| 快刀 | 朱红窄线，确认时高亮，命中时压近玩家 | 真确认 / 贴身 |
| 慢刀 | 金色宽压区和重刀线 | 破势窗 |
| 假抬手 | 紫灰残影，真确认切成红线 | 假影 / 真红线 |
| 后撤横切 | 冷色后撤残影，横切为红线，收招为绿线 | 横切 / 露空 |
| 地裂抓取 | 玩家脚下裂纹和吸附圆 | 脚下 |

普通动作后摇加重：轻招 340ms，右划 580ms，上划 540ms，普通左划 700ms，下划命中 840ms；空左划 960ms，下划空挥 1120ms，追早 780ms。只有完美左划、破势成功、后撤追身允许 80ms 到 120ms 的末尾短缓存。

## 本地浏览器验收

运行入口：

```text
http://127.0.0.1:8794/?debug=1&t=0274
```

浏览器视口：

```text
390 x 844
```

语法检查：

```bash
node --check src/game.js
```

结果：通过。

读招矩阵使用 `window.__bladeFlowDebug.runReadMatrixProbe({ reset: true, skipWarm: true })`。

关键结果：

| 场景 | 结果 | 后摇 | 反馈 | 读招层 |
| --- | --- | ---: | --- | --- |
| 快刀 confirm 左划 | `perfect-left`，打断 | 210ms | 快刀确认，闪反打断 | `fast / confirm / 真确认`，红线 0.96 |
| 快刀 hit 左划 | `late-left`，不打断 | 960ms | 晚了，快刀已经贴身 | `fast / hit / 贴身`，红线 0.86 |
| 假抬手 fake 左划 | `left-whiff`，不打断 | 960ms | 空闪，被假抬手骗了 | `feint / fake / 假影`，紫灰残影 |
| 假抬手 confirm 左划 | `perfect-left`，打断 | 210ms | 识破假抬手，真确认闪反 | `feint / confirm / 真红线` |
| 慢刀 confirm 左划 | `left-sidestep`，不打断 | 700ms | 慢刀不能被普通侧退打断 | `heavy / confirm / 破势窗` |
| 慢刀 confirm 下划 | `break-confirm`，打断 | 190ms | 破势窗口，重招截断 | 金色破势区 0.86 |
| 后撤 confirm 右划 | `early-chase`，不打断 | 780ms | 追早了，撞上横切 | `backstep / confirm / 横切` |
| 后撤 recover 右划 | `backstep-chase`，打断 | 190ms | 后撤露空，追身命中 | `backstep / recover / 露空` |
| 地裂 prep 上划 | `control-lift` | 540ms | 离地避开地裂 | `ground-grab / prep / 脚下` |
| 地裂 confirm 下划 | `break-confirm`，打断 | 190ms | 破势窗口，重招截断 | `ground-grab / confirm / 脚下` |

连续快速出牌使用 `window.__bladeFlowDebug.runActionCommitmentProbe({ reset: true, interval: 90 })`。

结果：四次连续方向输入只有第一张被接受，后续三次被后摇挡住，未进入队列。

```json
{
  "accepted": 1,
  "attempts": [
    { "direction": "right", "accepted": true, "recoveryLastMs": 580 },
    { "direction": "left", "accepted": false, "recoveryRemaining": 440 },
    { "direction": "down", "accepted": false, "recoveryRemaining": 263 },
    { "direction": "up", "accepted": false, "recoveryRemaining": 156 }
  ]
}
```

右滑性能使用 `window.__bladeFlowDebug.runRightSwipeProbe({ reset: true, count: 4, interval: 90 })`。

结果：`resourceCount=0`，`longTasks=0`，`maxDispatchDuration=1.5ms`，`lastError=""`。

手机布局检查：390 x 844 视口下 arena 为 182-632px，hand 为 674-782px，卡牌底部完整可见，未贴近底部手势区。读招层位于 arena 内，不遮挡手牌文字。

控制台检查：`Total messages: 0 (Errors: 0, Warnings: 0)`。

截图记录：`.playwright-cli/page-2026-05-10T06-54-31-936Z.png` 展示 390px 视口地裂读招层和完整手牌区域。

## 线上部署验收

部署命令：

```bash
npm run deploy
```

部署结果：

```text
Current Version ID: 530bbda0-e4d4-425f-8bd7-10888bfc7200
custom domain: games.atou.cc
```

线上验收地址：

```text
https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&t=0274-live
```

线上 390 x 844 视口复测结果：

| 验收项 | 结果 |
| --- | --- |
| 版本显示 | `v0.2.74 读招成形` |
| 读招矩阵 | 十个场景结果与本地一致 |
| 快刀 / 假抬手 / 慢刀 / 后撤 / 地裂读招层 | 均返回对应 `move / phase / label` |
| 40ms 连续四方向出牌 | `accepted=1`，后三次不排队 |
| 右滑性能 | `resourceCount=0`，`longTasks=0`，`maxDispatchDuration=3.1ms`，`lastError=""` |
| 主 UI 烟测 | 版本、音乐、调配器、存档、笔记入口均存在；5 秒短流程执行 29 次动作未报错 |
| 控制台 | `Total messages: 0 (Errors: 0, Warnings: 0)` |

## 结论

v0.2.74 本地和线上验收通过。Boss 读招层、错误学习反馈、普通动作后摇、读对短接招、手机安全距离和手势性能均达到本轮目标。
