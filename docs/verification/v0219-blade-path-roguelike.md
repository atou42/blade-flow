# v0.2.19 上行刀路验收

日期：2026-05-07

## 范围

本次把 Phase 1 上行刀路 spec 落到可玩原型中。实现内容包括一幕八节点竖向刀路、三件首版装备、三名普通敌人、一个精英、风暴队长最终 Boss、Boss 路线烙印、Boss 预演、遗物、契约、装备刻印、战斗证据和移动端地图 UI。

## 已实现内容

版本号更新为 `v0.2.19 上行刀路`。

装备池收敛为首版三件：风暴太刀、镜扇、处刑者。三件装备分别绑定追击、闪反、爆发路线，并会给 Boss 留下后撤横切、假抬手、地裂抓取三类烙印。

路线节点为八个：刀信使、风暴斥候、铃盾卒、锻刃炉、灰羽弓手、镜侍、黑市契约、风暴队长。地图以紧凑刀路条显示，当前节点高亮，远端节点压暗。

奖励类型扩展为遗物、强化、刻印、契约、战斗证据、休整。战斗结算会记录最高连击、读招次数、破势次数和当前路线。Boss 前会出现预演面板，展示当前 Boss 吃到的路线烙印。

Boss 出手不再只显示普通进攻文案。当前会在快刀抬手、慢刀蓄势、后撤横切、假抬手、地裂抓取之间切换。路线烙印会改变 Boss 的出手池，并通过 Boss 光效颜色、战斗日志和预演面板反馈给玩家。

## 验收命令

语法检查：

```bash
node --check src/game.js
```

结果：PASS。

完整刀路自动通关烟测：

```bash
NODE_PATH=/opt/homebrew/lib/node_modules node <playwright-smoke>
```

结果：PASS。脚本确认 `v0.2.19` 可见，刀路节点数为 8，首版装备选择数为 3，能从风暴太刀开局走完最终 Boss，并在结算页看到 `斩路完成` 和 `Boss 烙印`。

截图：

```text
output/playwright/v0219-blade-path-mobile-start.png
output/playwright/v0219-blade-path-clear.png
```

## 性能回归

60 秒移动端自动战斗回归：

```bash
NODE_PATH=/opt/homebrew/lib/node_modules node <playwright-60s-perf>
```

结果：PASS。

观测值：

```json
{"nodes":178,"slash":0,"impact":0,"combo":0,"longTasks":21,"worstLongTask":216,"version":"v0.2.19 上行刀路"}
```

新增刀路 UI 没有造成特效节点残留。60 秒后 `slash-layer`、`impact-layer`、`combo-layer` 均为 0。DOM 节点数为 178，保持在移动端预算内。

## 结论

v0.2.19 达到 Phase 1 上行刀路首版验收标准。它已经不是单纯三幕房间列表，而是一个会让路线选择影响奖励、Boss 变招和最终结算的肉鸽切片。
