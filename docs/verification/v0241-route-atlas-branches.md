# v0.2.41 上行图谱长期分支验收

本次交付推进 `remaining-spec-high-standard-goal.md` 的 Alpha 3 长期成长缺口。目标是让局外上行图谱真正改变下一局的局内刀路，而不是只在存档面板里点亮。

## 已落地内容

上行图谱新增三条长期分支：

- `branch-redline` 赤线猎场：由追身截退证据线解锁。
- `branch-mirror` 镜廊赌局：由真读招架证据线解锁。
- `branch-blackdrum` 黑鼓刑场：由碎甲处决证据线解锁。

三条分支会进入局内选路池。出现后，选路面板会标为“图谱分支”，并显示具体数值代价和收益。

分支不是文字状态。它会改变下一战的敌人类型、路线、HP、伤害、抬手速度、Boss 烙印、奖励倾向和证据收益。

profile 坏档校验会继续 fail-close。新增图谱节点和新增刀路 id 已进入已知项校验，坏 id 仍会锁对应 profile 或 run 槽。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/?debug=1&v=041-branches-local-4`。

语法检查：

```bash
node --check src/game.js
```

结果：PASS。

调试 profile 从干净状态开始，初始只有一幕基础线：

```json
{
  "version": "v0.2.41 长期分支",
  "mode": "debug",
  "initial": {
    "act1": true
  }
}
```

注入三类证据后，图谱按证据线逐步打开分支：

```json
{
  "afterBackstep": {
    "danger-backstep": true,
    "branch-redline": true
  },
  "afterTrueRead": {
    "danger-true-read": true,
    "branch-mirror": true
  },
  "afterShatter": {
    "danger-shatter": true,
    "branch-blackdrum": true
  }
}
```

二幕选路会出现图谱分支：

```json
{
  "id": "mirror-gauntlet-branch",
  "label": "镜廊赌局",
  "route": "counter",
  "risk": "danger",
  "atlasId": "branch-mirror",
  "evidence": "trueRead",
  "evidenceGain": 2,
  "bossMark": "feint"
}
```

三幕黑鼓刑场分支会真实改写下一战：

```json
{
  "choice": {
    "id": "blackdrum-execution-branch",
    "label": "黑鼓刑场",
    "atlasId": "branch-blackdrum",
    "evidence": "shatterExecute",
    "evidenceGain": 2,
    "bossMark": "ground-grab"
  },
  "room": {
    "name": "墨盾钟卫",
    "type": "fight",
    "route": "burst",
    "hp": 571,
    "damage": 34,
    "speed": 2040
  },
  "bossMark": "ground-grab",
  "rewardBias": "burst"
}
```

截图证据：

- `.playwright-cli/page-2026-05-08T13-40-22-048Z.png`

## 线上验收

线上地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=041-branches-live`。

Cloudflare 部署版本 ID：`7c92f6a7-e386-4b8f-9fe0-e58ef05d6d26`。

线上验收结果与本地一致：

```json
{
  "version": "v0.2.41 长期分支",
  "mode": "debug",
  "initial": {
    "act1": true
  },
  "afterBackstep": {
    "danger-backstep": true,
    "branch-redline": true
  },
  "afterTrueRead": {
    "danger-true-read": true,
    "branch-mirror": true
  },
  "afterShatter": {
    "danger-shatter": true,
    "branch-blackdrum": true
  },
  "act2Branch": {
    "id": "mirror-gauntlet-branch",
    "atlasId": "branch-mirror",
    "evidenceGain": 2,
    "bossMark": "feint"
  },
  "act3ForcedBranch": {
    "id": "blackdrum-execution-branch",
    "atlasId": "branch-blackdrum",
    "evidenceGain": 2,
    "bossMark": "ground-grab",
    "room": {
      "route": "burst",
      "hp": 571,
      "damage": 34,
      "speed": 2040
    }
  }
}
```

截图证据：

- `.playwright-cli/page-2026-05-08T13-44-07-483Z.png`

## 剩余风险

这次补的是长期图谱分支和局内刀路连接，不是完整长期成长终局。后续仍需要更多 Boss 多帧动作资产、真机级性能长测和最终全 goal 审计。
