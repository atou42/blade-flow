# v0.2.39 三流派标准难度连测

本次交付补齐 `remaining-spec-high-standard-goal.md` 里反复标注的普通难度三流派连续通关缺口。此前 v0.2.31 的三幕通关使用低压调参，只能证明流程可通；这次验收使用标准预设，不降低敌人血量、敌人伤害、补牌冷却或行动压力。

## 已落地内容

标准预设专注从 100 调整到 110，作为普通难度的默认容错。

追击流进入高速续压后，右划追击会按追击值和连击数降低抢招压力，并轻微拖住 Boss 出手。后撤横切烙印仍会惩罚没有进入追击节奏的乱右划。

破势流在 3 连以上下划时，会按爆发值和连击数压回压力，避免高危路线中爆发构筑只剩负担。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

验收条件：

```json
{
  "version": "v0.2.39 三流派连测",
  "preset": "normal",
  "normalFocus": 110,
  "customTuning": false
}
```

三局结果：

```json
[
  {
    "archetype": "speed",
    "status": "clear",
    "actions": 102,
    "maxCombo": 11,
    "pressurePeak": 41.38,
    "finalText": "斩路完成 风暴太刀 走完上行刀路。最终战最高 11 连，Boss 烙印是 后撤横切。锻刃墨 +4，追身截退 +1，新开 风暴太刀·三幕记忆。 新开一局"
  },
  {
    "archetype": "counter",
    "status": "clear",
    "actions": 75,
    "maxCombo": 6,
    "pressurePeak": 31.17,
    "finalText": "斩路完成 镜扇 走完上行刀路。最终战最高 6 连，Boss 烙印是 后撤横切。锻刃墨 +4，真读招架 +1，新开 镜扇·三幕记忆。 新开一局"
  },
  {
    "archetype": "burst",
    "status": "clear",
    "actions": 79,
    "maxCombo": 6,
    "pressurePeak": 87.84,
    "finalText": "斩路完成 处刑者 走完上行刀路。最终战最高 6 连，Boss 烙印是 后撤横切。锻刃墨 +4，新开 处刑者·三幕记忆。 新开一局"
  }
]
```

三局都覆盖这些战斗节点：

```text
一幕：刀信使、铃盾卒、灰羽弓手、镜侍、风暴队长
二幕：赤线追兵、裂盾徒、灰羽双弦、镜廊祭司、赤线宿敌
三幕：无相刃影、墨盾钟卫、赤羽铳师、黑鼓力士、无相刀影
```

路线选择和奖励选择有明确差异：

```json
{
  "speed": {
    "paths": ["steady", "speed-risk"],
    "keyRewards": ["redline-pursuit", "comet-sheath", "thin-blade-vow", "forge-chase", "right-inscription"]
  },
  "counter": {
    "paths": ["counter-risk"],
    "keyRewards": ["counter-doctrine", "mirror-oath", "borrowed-edge", "mirror-scar", "left-inscription"]
  },
  "burst": {
    "paths": ["burst-risk"],
    "keyRewards": ["black-drum", "execution-drum", "grave-palm", "forge-break", "down-inscription"]
  }
}
```

截图证据：

- `/tmp/blade-flow-v039-archetype-retake2.png`

## 线上验收

线上地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=039-archetype-live`。

Cloudflare 部署版本：

```text
33950745-3d4b-45ea-94c2-9104ff645e86
```

线上 Games Hub 已返回 `score: v0.2.39` 和版本标题 `v0.2.39 三流派连测`。

线上 Playwright 手机视口验收结果：

```json
[
  {
    "archetype": "speed",
    "status": "clear",
    "actions": 98,
    "maxCombo": 13,
    "pressurePeak": 30.38,
    "finalText": "斩路完成 风暴太刀 走完上行刀路。最终战最高 13 连，Boss 烙印是 后撤横切。锻刃墨 +5，追身截退 +1，新开 风暴太刀·三幕记忆。 新开一局"
  },
  {
    "archetype": "counter",
    "status": "clear",
    "actions": 82,
    "maxCombo": 6,
    "pressurePeak": 23.59,
    "finalText": "斩路完成 镜扇 走完上行刀路。最终战最高 6 连，Boss 烙印是 后撤横切。锻刃墨 +4，新开 镜扇·三幕记忆。 新开一局"
  },
  {
    "archetype": "burst",
    "status": "clear",
    "actions": 83,
    "maxCombo": 6,
    "pressurePeak": 87.24,
    "finalText": "斩路完成 处刑者 走完上行刀路。最终战最高 6 连，Boss 烙印是 后撤横切。锻刃墨 +4，新开 处刑者·三幕记忆。 新开一局"
  }
]
```

截图证据：

- `/tmp/blade-flow-v039-archetype-live.png`

## 剩余风险

这次证明标准预设下三流派可以连续打完三幕，但还不是完整最终 goal。剩余大项仍包括更多长期分支、真实 Boss sprite 动作、真机级性能长测，以及完整完成审计。
