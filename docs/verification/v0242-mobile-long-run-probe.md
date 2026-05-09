# v0.2.42 移动端长测探针验收

本次交付推进 `remaining-spec-high-standard-goal.md` 的 Alpha 5 移动端质量缺口。目标不是用桌面浏览器替代真实手机温度，而是先把长测能力做进线上调试接口，后续每次加 sprite、纹理和特效都能复用同一套检查。

## 已落地内容

`window.__bladeFlowDebug.runPerformanceProbe()` 新增自动长测探针。它会在真实页面里自动开局、出牌、处理奖励、节点选择、选路和 Boss 预演，并记录动作数、遮罩处理数、长任务、DOM 节点、堆内存、残留特效节点和性能档位。

探针支持指定时长、出牌间隔和性能档位。默认会保活玩家专注，避免测试提前死掉导致无法覆盖奖励和选路。

探针只在本地或 `debug=1` 下存在，不进入普通玩家操作面。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/?debug=1&v=042-perf-local-3`。

语法检查：

```bash
node --check src/game.js
```

结果：PASS。

省电档 20 秒长测：

```json
{
  "duration": 20958,
  "actions": 16,
  "overlays": 4,
  "rewardsHandled": 1,
  "pathsHandled": 2,
  "longTasks": 2,
  "longTaskDuration": 149,
  "domNodes": 157,
  "heapUsed": 3417872,
  "room": "铃盾卒",
  "act": 1,
  "encounterIndex": 2,
  "ended": false,
  "profile": 0,
  "label": "save",
  "slashNodes": 0,
  "impactNodes": 0,
  "comboNodes": 0,
  "frameScheduled": false,
  "lowPowerScheduled": true
}
```

验收结论：探针能持续推进战斗并覆盖奖励和选路；省电档结束后没有 slash、impact、combo 特效节点残留。

## 线上验收

线上地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=042-perf-live`。

Cloudflare 部署版本 ID：`2364ffc7-ca1f-40d3-8d68-d50b772caebe`。

省电档 20 秒线上长测：

```json
{
  "duration": 21043,
  "actions": 15,
  "overlays": 4,
  "rewardsHandled": 1,
  "pathsHandled": 2,
  "longTasks": 4,
  "longTaskDuration": 433,
  "domNodes": 158,
  "heapUsed": 4195083,
  "room": "铃盾卒",
  "act": 1,
  "encounterIndex": 2,
  "ended": false,
  "profile": 0,
  "label": "save",
  "slashNodes": 0,
  "impactNodes": 0,
  "comboNodes": 0
}
```

线上复查时曾在 Boss 攻击瞬间看到 `impactNodes: 2`，等待 2.5 秒后自动回收为 0，说明命中特效没有长期残留。

截图证据：

- `.playwright-cli/page-2026-05-08T13-55-55-746Z.png`

## 剩余风险

这次交付的是可重复长测能力和一轮近真机浏览器记录，不是真实手机温度计记录。最终 Alpha 5 仍需要在手机竖屏上连续游玩，记录发热、掉帧、输入延迟和可读性。
