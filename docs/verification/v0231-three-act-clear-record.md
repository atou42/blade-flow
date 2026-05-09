# v0.2.31 三幕通关链路验收

本次验收补齐 `remaining-spec-high-standard-goal.md` 要求的“至少一份完整三幕通关记录”。这只证明三幕流程、节点推进、幕切换、Boss 预演、战后奖励、最终结算和线上入口可以完整跑通；不声明普通难度平衡已经完成。

## 验收范围

本次使用手机竖屏视口 `390x844`，通过 Playwright 在浏览器里模拟真实指针出牌。验收使用自定义低压调参，目的不是证明数值挑战成立，而是证明完整 run 链路不会卡死、不会丢节点、不会在三幕 Boss 死亡前提前结算。

验收调参包括敌人血量 `0.25x`、玩家伤害 `3x`、玩家专注 `200`、补牌冷却 `100ms`、行动压力 `0`、Boss 压力 `0`、精英压力 `0`。这是清流程用的验收档，不是正式推荐难度。

## 本地三幕通关

本地服务地址为 `http://127.0.0.1:8897/`。

实际运行结果如下。

```json
{
  "status": "clear",
  "finalText": "斩路完成 风暴太刀 走完上行刀路。最终战最高 9 连，Boss 烙印是 后撤横切。锻刃墨 +4。 新开一局",
  "stage": "三幕 上行刀路 首领 8/8",
  "enemy": "无相刀影",
  "combatActions": 220,
  "consoleErrors": [],
  "pageErrors": []
}
```

完整节点记录覆盖 24 个节点：一幕从刀信使到风暴队长，二幕从赤线追兵到赤线宿敌，三幕从无相刃影到无相刀影。

截图证据：

- `/tmp/blade-flow-v031-three-act-clear-local.png`

## 线上三幕通关

线上地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&clearRun=live-v0231`。

实际运行结果如下。

```json
{
  "status": "clear",
  "version": "v0.2.31 三幕敌群",
  "finalText": "斩路完成 风暴太刀 走完上行刀路。最终战最高 5 连，Boss 烙印是 后撤横切。锻刃墨 +4。 新开一局",
  "stage": "三幕 上行刀路 首领 8/8",
  "enemy": "无相刀影",
  "combatActions": 252,
  "consoleErrors": [],
  "pageErrors": []
}
```

线上节点同样完整覆盖 24 个节点，最终结算停在三幕 Boss 无相刀影之后，没有出现提前失败、提前结算、页面报错或控制台错误。

截图证据：

- `/tmp/blade-flow-v031-three-act-clear-live.png`

## 判定

`VERDICT: PASS`

三幕完整流程在本地和线上都能跑通。仍需后续单独验收普通难度下的正常通关、三种不同打法连续三局、移动端性能和长时间发热。
