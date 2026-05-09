# v0.2.37 学派扩展验收

本次交付推进 `remaining-spec-high-standard-goal.md` 的 Alpha 3 局外成长缺口。三把首发武器不再只有一个核心谱，而是各有核心谱、桥接谱和高阶谱。

## 已落地内容

工坊配方从 3 个扩到 9 个。风暴太刀新增快斩续压谱和飞刃追刀谱，镜扇新增影步回身谱和旋身残影谱，处刑者新增重劈裂盾谱和处决坠落谱。

三把首发武器的学派树从每把 3 节点扩到 5 节点。解锁新谱会写入对应学派节点，也会进入锻造节点的训练/刀谱奖励池。

新谱会参与卡牌方向点灯。符合 Boss 窗口时，卡牌显示会心窗口，出招后写入会心反馈。

## 本地验收

本地服务地址为 `http://127.0.0.1:8897/`，手机视口为 `390x844`。

配方和学派数量：

```json
{
  "version": "v0.2.37 学派扩展",
  "recipes": 9,
  "schoolNodes": {
    "storm-katana": 5,
    "mirror-fan": 5,
    "executioner": 5
  }
}
```

新增 6 个配方全部可解锁：

```json
[
  { "id": "quick-pressure", "ok": true },
  { "id": "shadow-return", "ok": true },
  { "id": "heavy-break", "ok": true },
  { "id": "flying-pursuit", "ok": true },
  { "id": "spin-afterimage", "ok": true },
  { "id": "execute-fall", "ok": true }
]
```

解锁后 profile 写入结果：

```json
{
  "recipes": {
    "quick-pressure": true,
    "shadow-return": true,
    "heavy-break": true,
    "flying-pursuit": true,
    "spin-afterimage": true,
    "execute-fall": true
  },
  "weaponSchools": {
    "storm-katana": {
      "first": true,
      "quick-pressure": true,
      "training-chase": true,
      "flying-pursuit": true
    },
    "mirror-fan": {
      "first": true,
      "shadow-return": true,
      "training-mirror": true,
      "spin-afterimage": true
    },
    "executioner": {
      "first": true,
      "heavy-break": true,
      "training-shatter": true,
      "execute-fall": true
    }
  }
}
```

锻造节点会给已解锁新谱：

```json
[
  "recipe-quick-pressure",
  "recipe-flying-pursuit",
  "recipe-shadow-return",
  "recipe-spin-afterimage",
  "recipe-heavy-break",
  "recipe-execute-fall"
]
```

新谱战斗窗口验收：

```json
{
  "affinityBefore": "会心窗口 · 快斩续压谱",
  "log": "追身快斩: 快斩续压谱，连击读招成立。",
  "mastery": {
    "result": "masterstroke",
    "recipe": {
      "id": "quick-pressure",
      "name": "快斩续压谱"
    }
  }
}
```

验收结论：新增配方、学派节点、锻造入池和战斗点灯都通过。

截图证据：

- `/tmp/blade-flow-v037-school-local.png`

## 线上验收

线上地址为 `https://games.atou.cc/combo-card-roguelike/versions/a/?debug=1&v=037-school-live-verify`。

Cloudflare 部署版本：

```text
20c85352-f3ec-4064-bef3-4c7cc665bc2a
```

线上 Games Hub 已返回 `score: v0.2.37` 和版本标题 `v0.2.37 学派扩展`。

线上 Playwright 手机视口验收结果：

```json
{
  "version": "v0.2.37 学派扩展",
  "profile": {
    "recipeCount": 9,
    "schoolNodeCounts": {
      "storm-katana": 5,
      "mirror-fan": 5,
      "executioner": 5
    },
    "trainingCount": 3,
    "atlasCount": 6
  },
  "forgeChoices": [
    "recipe-breaker-shatter",
    "recipe-chase-intercept",
    "recipe-execute-fall",
    "recipe-flying-pursuit",
    "recipe-guard-mirror",
    "recipe-heavy-break",
    "recipe-quick-pressure",
    "recipe-shadow-return",
    "recipe-spin-afterimage"
  ],
  "affinityBefore": "会心窗口 · 快斩续压谱",
  "log": "追身快斩: 快斩续压谱，连击读招成立。"
}
```

截图证据：

- `/tmp/blade-flow-v037-school-live.png`

## 剩余风险

这次扩的是三把首发武器的第一批学派深度。后续仍需要更多长期分支、每日特殊契约池、普通难度三流派连续通关、真实 Boss sprite 动作和真机级性能长测。
