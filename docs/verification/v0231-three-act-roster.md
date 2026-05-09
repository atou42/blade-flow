# v0.2.31 三幕敌群验收

本次交付推进 `remaining-spec-high-standard-goal.md` 中的 Alpha 4 内容池和三幕差异，不声明整个 goal 完成。

## 已落地内容

二幕和三幕不再只复用一幕敌人名字后做数值缩放。现在每一幕都有自己的普通战、侦察、锻造、精英、黑市和 Boss 节点。每个战斗节点都有路线、形态、HP、伤害、抬手速度和教学目标。

二幕主线是赤线压力，包含赤线追兵、镜廊侦者、裂盾徒、灰羽双弦、镜廊祭司、红线黑市和赤线宿敌。三幕主线是无相终局，包含无相刃影、黑月观星、墨盾钟卫、赤羽铳师、黑鼓力士、黑日契约和无相刀影。

上行刀路地图会按当前幕显示对应节点图标和名称。存档摘要、Boss 预演和战斗标题读取的也是当前幕房间，不再只显示一幕节点。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

Playwright 使用系统 Chrome 执行了以下流程：清空本地存储，以 `?debug=1` 进入 v0.2.31，选择风暴太刀，通过本地调试检查口读取三幕 roster，再跳转到二幕第 1 节点和三幕精英节点，确认战斗标题、地图节点和敌人名都变成当前幕内容。

运行结果如下。

```json
{
  "version": "V0.2.31 三幕敌群",
  "bossNames": ["风暴队长", "赤线宿敌", "无相刀影"],
  "distinctAct2": true,
  "distinctAct3": true,
  "actRoutes": [
    ["any", "burst", "counter", "speed"],
    ["any", "burst", "counter", "damage", "speed"],
    ["any", "burst", "control", "counter", "damage", "speed"]
  ],
  "act2": {
    "runStage": "二幕 上行刀路 战斗 1/8",
    "mapText": "追 镜 盾 赤 弦 影 契 宿",
    "enemy": "赤线追兵"
  },
  "act3": {
    "runStage": "三幕 上行刀路 精英 6/8",
    "mapText": "相 眼 钟 无 铳 鼓 日 终",
    "enemy": "黑鼓力士"
  },
  "errors": []
}
```

验收截图：

- `/tmp/blade-flow-v031-act3-elite.png`

## 部署验收

已通过 `npm run publish-games` 发布到 `https://games.atou.cc/combo-card-roguelike/versions/a/`。

发布结果：

```text
Current Version ID: ad7ca363-0130-4051-89e7-3712008ca38b
```

线上手机视口验证结果如下。

```json
{
  "version": "V0.2.31 三幕敌群",
  "bossNames": ["风暴队长", "赤线宿敌", "无相刀影"],
  "distinctAct2": true,
  "distinctAct3": true,
  "actRoutes": [
    ["any", "burst", "counter", "speed"],
    ["any", "burst", "counter", "damage", "speed"],
    ["any", "burst", "control", "counter", "damage", "speed"]
  ],
  "act2": {
    "runStage": "二幕 上行刀路 战斗 1/8",
    "mapText": "追 镜 盾 赤 弦 影 契 宿",
    "enemy": "赤线追兵"
  },
  "act3": {
    "runStage": "三幕 上行刀路 精英 6/8",
    "mapText": "相 眼 钟 无 铳 鼓 日 终",
    "enemy": "黑鼓力士"
  },
  "errors": []
}
```

线上入口数据也已确认更新为 `v0.2.31` 和 `v0.2.31 三幕敌群`。

线上截图：

- `/tmp/blade-flow-v031-live.png`

## 未完成项

这只补了三幕敌群和节点内容。完整 Alpha 4 仍需要真实普通敌人和精英动作资产、更多 Boss 变体行为、地图节点资产替换、完整三幕通关记录和移动端性能记录。
